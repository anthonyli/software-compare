import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/video-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='filmora');
test('Filmora desktop chroma key does not imply export or hardware entitlements',()=>{
 assert.deepEqual(p.features.chroma_key,{value:'yes'});
 for(const source of ['https://filmora.wondershare.com/guide/green-screen.html','https://filmora.wondershare.com/guide-mac/green-screen.html']) assert(p.sources.includes(source));
 assert.deepEqual(p.features.export_4k,{value:'paid'});
 assert.equal(p.features.gpu_accel.value,'unknown');
 for(const key of ['proxy','keyframes']) assert.equal(p.features[key].value,'yes');
});
