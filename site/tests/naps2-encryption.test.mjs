import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('NAPS2 PDF encryption cites official output options',()=>{
 const d=JSON.parse(readFileSync(new URL('../../categories/pdf-tools.json',import.meta.url)));
 const rows=d.products.filter(p=>p.id==='naps2');assert.equal(rows.length,1);const p=rows[0];
 assert.deepEqual(p.features.encrypt,{value:'yes'});
 assert(p.sources.includes('https://www.naps2.com/doc/command-line'));
 assert.equal(p.features.annotate.value,'unknown');
});
