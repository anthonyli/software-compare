import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
test('Helix debugger retains experimental status',()=>{
 const c=JSON.parse(fs.readFileSync(new URL('../../categories/code-editors.json',import.meta.url),'utf8'));const p=c.products.find(p=>p.id==='helix');const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url),'utf8'));
 assert.equal(p.features.debugger.value,'partial');assert.match(p.features.debugger.note,/实验性/);assert.match(en[p.features.debugger.note],/experimental debugging/);assert.equal(p.features.integrated_terminal.value,'no');assert.equal(p.features.multi_cursor.value,'yes');for(const page of ['keymap','commands'])assert(p.sources.includes('https://docs.helix-editor.com/'+page+'.html'));
});
