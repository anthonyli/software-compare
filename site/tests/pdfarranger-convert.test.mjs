import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('PDF Arranger conversion is limited rather than absent or office-format complete',()=>{
 const d=JSON.parse(readFileSync(new URL('../../categories/pdf-tools.json',import.meta.url)));
 const matches=d.products.filter(p=>p.id==='pdfarranger');assert.equal(matches.length,1);const p=matches[0];
 assert.deepEqual(p.features.convert,{value:'partial'});
 assert(p.sources.includes('https://github.com/pdfarranger/pdfarranger/wiki/User-Manual'));
 assert.equal(p.features.encrypt.value,'unknown');assert.equal(p.features.compress.value,'unknown');assert.equal(p.features.merge_split.value,'yes');
});
