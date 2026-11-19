import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/audio-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='waveform-free');
test('Waveform Free exports audio without implying Pro Advanced or restoration features',()=>{
 assert.deepEqual(p.features.export_formats,{value:'yes'});
 for(const source of ['https://www.tracktion.com/products/waveform-free','https://www.tracktion.com/products/waveform-free-features','https://tracktion.github.io/waveform_manual/latest/quick-start/']) assert(p.sources.includes(source));
 for(const key of ['spectral','noise_reduce','batch']) assert.equal(p.features[key].value,'unknown');
 assert.equal(p.open_source,false);
});
