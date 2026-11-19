import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/audio-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='ocenaudio');
test('ocenaudio documents multi-file processing and batch export',()=>{
 assert.deepEqual(p.features.batch,{value:'yes'});
 assert(p.sources.includes('https://www.ocenaudio.com/changelog'));
 for(const key of ['spectral','multitrack']) assert.equal(p.features[key].value,'unknown');
 assert.equal(p.latest_release,'3.22.2');
});
