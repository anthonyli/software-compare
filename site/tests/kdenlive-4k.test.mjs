import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/video-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='kdenlive');
test('Kdenlive explicitly documents UHD/4K export without inferring GPU acceleration',()=>{
 assert.deepEqual(p.features.export_4k,{value:'yes'});
 assert(p.sources.includes('https://docs.kdenlive.org/en/getting_started/introduction.html'));
 assert.equal(p.features.gpu_accel.value,'unknown');
 assert.deepEqual(p.platforms,['Windows','macOS','Linux']);
});
