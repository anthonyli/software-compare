import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

for (const name of ['CLOUDFLARE_API_TOKEN','CLOUDFLARE_ACCOUNT_ID','COOKIE_SECRET']) {
  if(!process.env[name]) throw new Error(`Missing ${name}`);
}
if(process.env.COOKIE_SECRET.length<32) throw new Error('COOKIE_SECRET must have at least 32 characters.');
const directory=await fs.mkdtemp(path.join(os.tmpdir(),'software-compare-secrets-'));
const file=path.join(directory,'secrets.json');
try {
  await fs.writeFile(file,JSON.stringify({COOKIE_SECRET:process.env.COOKIE_SECRET}),{mode:0o600});
  const config=JSON.parse(await fs.readFile('wrangler.deploy.json','utf8'));
  const sourceDirectory=process.cwd();
  config.pages_build_output_dir=path.resolve(config.pages_build_output_dir);
  for (const database of config.d1_databases) {
    database.migrations_dir=path.resolve(database.migrations_dir || 'migrations');
  }
  // Pages does not support --config. Give it an isolated production config,
  // leaving the checked-in local database configuration unchanged.
  await fs.writeFile(path.join(directory,'wrangler.json'),JSON.stringify(config));
  for(const args of [
    ['d1','migrations','apply','DB','--remote','--config',path.join(sourceDirectory,'wrangler.deploy.json')],
    ['pages','secret','bulk',file,'--project-name',config.name,'--cwd',directory],
    ['pages','deploy',config.pages_build_output_dir,'--project-name',config.name,'--branch','main','--cwd',directory],
  ]) {
    const result=spawnSync('npm',['exec','wrangler','--',...args],{stdio:'inherit'});
    if(result.status!==0) throw new Error('Cloudflare deployment failed.');
  }
} finally {await fs.rm(directory,{recursive:true,force:true});}
