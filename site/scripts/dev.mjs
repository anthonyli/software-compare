import fs from 'node:fs/promises';
import {randomBytes} from 'node:crypto';
import {spawn,spawnSync} from 'node:child_process';
import {watch} from 'node:fs';

try {await fs.access('.dev.vars');} catch {
  await fs.writeFile('.dev.vars',`COOKIE_SECRET=${randomBytes(32).toString('hex')}\n`,{mode:0o600});
  console.log('Created a local-only anonymous cookie secret in .dev.vars.');
}
for(const args of [['run','build'],['exec','wrangler','--','d1','migrations','apply','DB','--local']]) {
  const result=spawnSync('npm',args,{stdio:'inherit'});
  if(result.status!==0) process.exit(result.status || 1);
}
const server=spawn('npm',['exec','wrangler','--','dev','--local','--port','8787','--live-reload'],{stdio:'inherit'});
let stopping=false, building=null, queued=false, timer;
function rebuild() {
  if(stopping) return;
  if(building) {queued=true;return;}
  building=spawn('npm',['run','build'],{stdio:'inherit'});
  building.on('exit',()=>{building=null;if(queued){queued=false;rebuild();}});
}
function changed(){clearTimeout(timer);timer=setTimeout(rebuild,200);}
const watchers=[
  watch('src',{recursive:true},changed),
  watch('public',{recursive:true},changed),
  watch('../categories',{recursive:true},changed),
  watch('..',(_,name)=>{if(['data.json','github-data.json'].includes(String(name)))changed();}),
  watch('.',(_,name)=>{if(['astro.config.mjs'].includes(String(name)))changed();}),
];
function stop(code=0) {
  if(stopping)return;stopping=true;clearTimeout(timer);
  watchers.forEach(w=>w.close());building?.kill('SIGTERM');server.kill('SIGTERM');process.exitCode=code;
}
for(const signal of ['SIGINT','SIGTERM']) process.on(signal,()=>stop());
server.on('exit',code=>stop(code || 0));
