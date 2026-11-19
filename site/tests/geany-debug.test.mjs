import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
test('Geany Debugger plugin retains GDB and POSIX requirements',()=>{
 const c=JSON.parse(fs.readFileSync(new URL('../../categories/code-editors.json',import.meta.url),'utf8'));const p=c.products.find(p=>p.id==='geany');const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url),'utf8'));
 assert.equal(p.features.debugger.value,'partial');assert.match(p.features.debugger.note,/仅支持 GDB/);assert.match(en[p.features.debugger.note],/requires libvte, GTK 3 and POSIX/);assert.equal(p.features.lsp.value,'partial');assert.equal(p.features.git_integration.value,'partial');assert(p.sources.includes('https://github.com/geany/geany-plugins/blob/2.1.0/debugger/README'));
});
