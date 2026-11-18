import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/audio-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='ocenaudio');
test('ocenaudio documented noise reduction and multi-format export preserve unknown boundaries',()=>{
 for(const key of ['noise_reduce','export_formats']) assert.deepEqual(p.features[key],{value:'yes'});
 assert(p.sources.includes('https://www.ocenaudio.com/changelog'));
 for(const key of ['spectral','multitrack','batch']) assert.equal(p.features[key].value,'unknown');
 assert.equal(p.latest_release,'3.22.2');
});
