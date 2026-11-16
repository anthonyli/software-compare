import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('Lapce multi-cursor has official documentation and released history',()=>{
 const d=JSON.parse(readFileSync(new URL('../../categories/code-editors.json',import.meta.url)));
 const rows=d.products.filter(p=>p.id==='lapce');assert.equal(rows.length,1);const p=rows[0];
 assert.deepEqual(p.features.multi_cursor,{value:'yes'});
 assert(p.sources.includes('https://docs.lapce.dev/features/multiple-cursor'));
 assert(p.sources.includes('https://github.com/lapce/lapce/blob/v0.4.2/CHANGELOG.md'));
 assert.equal(p.features.debugger.value,'unknown');assert.equal(p.features.ai_assistant.value,'unknown');
});
