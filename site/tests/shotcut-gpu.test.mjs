import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/video-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='shotcut');
test('Shotcut GPU acceleration remains partial rather than an all-GPU pipeline claim',()=>{
 assert.deepEqual(p.features.gpu_accel,{value:'partial'});
 for(const source of ['https://www.shotcut.org/FAQ/','https://www.shotcut.org/blog/new-release-26.01.30/']) assert(p.sources.includes(source));
 assert.equal(p.features.proxy.value,'yes');assert.equal(p.features.export_4k.value,'yes');
});
