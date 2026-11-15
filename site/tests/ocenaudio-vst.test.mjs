import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('ocenaudio VST support does not imply spectral editing or multitrack',()=>{
 const d=JSON.parse(readFileSync(new URL('../../categories/audio-editors.json',import.meta.url)));
 const rows=d.products.filter(p=>p.id==='ocenaudio');assert.equal(rows.length,1);const p=rows[0];
 assert.deepEqual(p.features.plugins,{value:'yes'});assert(p.sources.includes('https://www.ocenaudio.com/features'));
 for(const k of ['spectral','multitrack','batch','noise_reduce'])assert.equal(p.features[k].value,'unknown');
});
