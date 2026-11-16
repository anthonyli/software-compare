import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('Lapce remote development cites official editor sources',()=>{
 const d=JSON.parse(readFileSync(new URL('../../categories/code-editors.json',import.meta.url)));
 const rows=d.products.filter(p=>p.id==='lapce');assert.equal(rows.length,1);const p=rows[0];
 assert.deepEqual(p.features.remote_dev,{value:'yes'});
 assert(p.sources.includes('https://lap.dev/lapce/'));assert(p.sources.includes('https://github.com/lapce/lapce'));
 for(const k of ['debugger','ai_assistant'])assert.equal(p.features[k].value,'unknown');
});
