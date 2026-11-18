import {test} from 'node:test';
import assert from 'node:assert/strict';
import {EventEmitter} from 'node:events';
import {observeBrowserClose,cleanupBrowserProfile} from './helpers/native-browser-cleanup.mjs';
function child(onKill=()=>{}) {
 const p=new EventEmitter();p.exitCode=null;p.signalCode=null;p.signals=[];
 p.kill=signal=>{p.signals.push(signal);onKill(p,signal);return true;};return p;
}
test('cleanup waits for close after exit and removes with bounded filesystem retries',async()=>{
 const p=child(p=>{p.exitCode=0;p.emit('exit',0);setTimeout(()=>p.emit('close',0),10);});
 const stop=observeBrowserClose(p);let closed=false;p.on('close',()=>closed=true);
 await cleanupBrowserProfile(()=>stop({graceMs:100}),'/tmp/test-profile',async(path,options)=>{
  assert.equal(closed,true);assert.equal(path,'/tmp/test-profile');assert.deepEqual(options,{recursive:true,force:true,maxRetries:5,retryDelay:100});
 });assert.deepEqual(p.signals,['SIGTERM']);
});
test('SIGKILL does not release profile cleanup until close',async()=>{
 const p=child((p,signal)=>{if(signal==='SIGKILL')setTimeout(()=>{p.signalCode=signal;p.emit('close',null,signal);},10);});
 const stop=observeBrowserClose(p);let closed=false;p.on('close',()=>closed=true);
 await cleanupBrowserProfile(()=>stop({graceMs:5,killMs:100}),'profile',async()=>assert(closed));
 assert.deepEqual(p.signals,['SIGTERM','SIGKILL']);
});
test('already closed child needs no signal and a synchronous close is not missed',async()=>{
 const p=child(p=>p.emit('close',0));const stop=observeBrowserClose(p);await stop();await stop();assert.deepEqual(p.signals,['SIGTERM']);
});
test('a child that never closes fails and retains its profile',async()=>{
 const p=child();const stop=observeBrowserClose(p);let removed=false;
 await assert.rejects(cleanupBrowserProfile(()=>stop({graceMs:1,killMs:1}),'profile',async()=>{removed=true;}),/did not close/);
 assert.equal(removed,false);
});
test('persistent directory cleanup failure remains a test failure',async()=>{
 const error=Object.assign(new Error('still busy'),{code:'ENOTEMPTY'});
 await assert.rejects(cleanupBrowserProfile(async()=>{},'profile',async()=>{throw error;}),e=>e===error);
});
