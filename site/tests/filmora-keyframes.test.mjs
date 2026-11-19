import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/video-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='filmora');
test('Filmora desktop keyframes support parameter animation without inferring other capabilities',()=>{
 assert.deepEqual(p.features.keyframes,{value:'yes'});
 for(const source of ['https://filmora.wondershare.com/guide/add-animation-keyframing.html','https://filmora.wondershare.com/guide-mac/keyframing.html']) assert(p.sources.includes(source));
 assert.deepEqual(p.features.export_4k,{value:'paid'});
 assert.equal(p.features.gpu_accel.value,'unknown');
 assert.equal(p.features.proxy.value,'yes');
});
