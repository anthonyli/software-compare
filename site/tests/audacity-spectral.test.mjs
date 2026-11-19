import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/audio-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='audacity');
test('Audacity documents spectral editing beyond spectrogram display',()=>{
 assert.deepEqual(p.features.spectral,{value:'yes'});
 assert(p.sources.includes('https://www.audacityteam.org/manual/effects/spectral-tools/'));
 assert.equal(p.features.batch.value,'unknown');
 assert.deepEqual(p.features.noise_reduce,{value:'yes'});
 assert.equal(p.license,'GPL-3.0');
});
