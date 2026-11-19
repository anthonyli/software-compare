import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
test('Geany Git integration requires GeanyVC and Git toolchain',()=>{
 const c=JSON.parse(fs.readFileSync(new URL('../../categories/code-editors.json',import.meta.url),'utf8'));const p=c.products.find(p=>p.id==='geany');const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url),'utf8'));
 assert.equal(p.features.git_integration.value,'partial');assert.match(p.features.git_integration.note,/GeanyVC 插件/);assert.match(en[p.features.git_integration.note],/invokes the Git toolchain/);assert.equal(p.features.debugger.value,'unknown');assert.equal(p.features.lsp.value,'unknown');assert(p.sources.includes('https://github.com/geany/geany-plugins/blob/2.1.0/geanyvc/README'));
});
