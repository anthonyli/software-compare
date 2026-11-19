import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
test('Micro LSP preserves optional experimental server boundaries',()=>{
 const c=JSON.parse(fs.readFileSync(new URL('../../categories/code-editors.json',import.meta.url),'utf8'));const p=c.products.find(p=>p.id==='micro');const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url),'utf8'));
 assert.equal(p.features.lsp.value,'partial');assert.match(p.features.lsp.note,/概念验证/);assert.match(en[p.features.lsp.note],/re-synchronizes on save/);for(const k of ['debugger','ai_assistant','live_share'])assert.equal(p.features[k].value,'unknown');assert(p.sources.includes('https://github.com/AndCake/micro-plugin-lsp/blob/a3ed3a73b2f7576b1e2dc1ac3c98dfe695e6d05d/README.md'));
});
