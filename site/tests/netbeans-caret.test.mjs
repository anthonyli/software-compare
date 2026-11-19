import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
test('NetBeans built-in multi-caret actions are verified independently of refactoring',()=>{
 const c=JSON.parse(fs.readFileSync(new URL('../../categories/code-editors.json',import.meta.url),'utf8'));const p=c.products.find(p=>p.id==='netbeans');const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url),'utf8'));
 assert.equal(p.features.multi_cursor.value,'yes');assert.equal(p.features.lsp.value,'partial');assert.match(p.features.multi_cursor.note,/添加光标/);assert.match(en[p.features.multi_cursor.note],/remove the last caret/);assert.equal(p.features.integrated_terminal.value,'partial');for(const k of ['remote_dev'])assert.equal(p.features[k].value,'unknown');assert(p.sources.includes('https://github.com/apache/netbeans/blob/32/ide/editor.actions/src/org/netbeans/modules/editor/actions/AddCaretAction.java'));
});
