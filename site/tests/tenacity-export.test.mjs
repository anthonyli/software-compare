import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('Tenacity multi-format export has direct official manual evidence',()=>{
 const d=JSON.parse(readFileSync(new URL('../../categories/audio-editors.json',import.meta.url)));
 const rows=d.products.filter(p=>p.id==='tenacity');assert.equal(rows.length,1);const p=rows[0];
 assert.deepEqual(p.features.export_formats,{value:'yes'});
 assert(p.sources.includes('https://tenacityaudio.org/docs/_content/Importing_and_Exporting.html'));
 for(const k of ['noise_reduce','spectral','batch'])assert.equal(p.features[k].value,'unknown');
});
