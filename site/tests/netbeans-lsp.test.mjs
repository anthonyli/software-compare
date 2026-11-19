import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
test('NetBeans LSP client is distinct from Java LSP server',()=>{
 const c=JSON.parse(fs.readFileSync(new URL('../../categories/code-editors.json',import.meta.url),'utf8'));const p=c.products.find(p=>p.id==='netbeans');const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url),'utf8'));
 assert.equal(p.features.lsp.value,'partial');assert.match(p.features.lsp.note,/LSP 客户端/);assert.match(en[p.features.lsp.note],/not out-of-the-box support for every language/);for(const k of ['integrated_terminal','remote_dev'])assert.equal(p.features[k].value,'unknown');assert(p.sources.includes('https://github.com/apache/netbeans/blob/32/ide/lsp.client/src/org/netbeans/modules/lsp/client/spi/LanguageServerProvider.java'));
});
