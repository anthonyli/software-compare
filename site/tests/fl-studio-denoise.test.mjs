import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/audio-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='fl-studio');
test('FL Studio Edison denoise has paid edition evidence and bounded capabilities',()=>{
 assert.deepEqual(p.features.noise_reduce,{value:'paid'});
 assert(p.sources.includes('https://www.image-line.com/fl-studio-learning/fl-studio-online-manual/html/plugins/editortool_clean.htm'));
 assert(p.sources.includes('https://www.image-line.com/fl-studio/editions/producer-edition'));
 for(const key of ['spectral','batch']) assert.equal(p.features[key].value,'unknown');
});
