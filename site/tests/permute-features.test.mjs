import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/converters.json',import.meta.url),'utf8')).products.find(p=>p.id==='permute');
for(const key of ['image','presets'])test(`Permute ${key} support has explicit current hardware/version scope`,()=>{
 assert.equal(p.features[key].value,'yes');assert.equal(p.features[key].note,'Permute 4 · macOS 26+ · Apple Silicon');
 assert(p.sources.includes('https://software.charliemonroe.net/trial/permute/v4/rnotes.html'));
 assert.equal(p.pricing_model,'付费');assert.equal(p.features.batch.value,'unknown');assert.equal(p.features.hw_accel.value,'unknown');
});
