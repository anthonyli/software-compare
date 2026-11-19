import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
test('Lapce DAP debugging requires debugger type',()=>{
 const c=JSON.parse(fs.readFileSync(new URL('../../categories/code-editors.json',import.meta.url),'utf8'));const p=c.products.find(p=>p.id==='lapce');const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url),'utf8'));
 assert.equal(p.features.debugger.value,'yes');assert.match(p.features.debugger.note,/指定调试器类型/);assert.match(en[p.features.debugger.note],/must specify a debugger type/);assert.equal(p.features.ai_assistant.value,'unknown');assert.equal(p.features.multi_cursor.value,'yes');assert(p.sources.includes('https://github.com/lapce/lapce/blob/v0.4.2/defaults/run.toml'));
});
