import fs from 'node:fs/promises';
import {spawn,spawnSync} from 'node:child_process';
const state='.wrangler/test-state';
await fs.rm(state,{recursive:true,force:true});
const result=spawnSync('npm',['exec','wrangler','--','d1','migrations','apply','DB','--local','--persist-to',state],{stdio:'inherit'});
if(result.status!==0) process.exit(result.status || 1);
const child=spawn('npm',['exec','wrangler','--','pages','dev','dist','--port','8788','--persist-to',state,'--binding','COOKIE_SECRET=only-for-local-tests-never-use-this-secret-in-production'],{stdio:'inherit'});
for(const signal of ['SIGTERM','SIGINT']) process.on(signal,()=>child.kill(signal));
child.on('exit',code=>{process.exitCode=code || 0;});
