import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
test('Geany LSP requires plugin and separately configured servers',()=>{
 const c=JSON.parse(fs.readFileSync(new URL('../../categories/code-editors.json',import.meta.url),'utf8'));const p=c.products.find(p=>p.id==='geany');const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url),'utf8'));
 assert.equal(p.features.lsp.value,'partial');assert.match(p.features.lsp.note,/另行安装和配置/);assert.match(en[p.features.lsp.note],/per-project activation required by default/);assert.equal(p.features.debugger.value,'unknown');assert.equal(p.features.git_integration.value,'partial');assert(p.sources.includes('https://github.com/geany/geany-plugins/blob/2.1.0/lsp/README'));
});
