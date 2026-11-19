import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
test('Lite XL gitstatus is optional limited Git integration',()=>{
 const c=JSON.parse(fs.readFileSync(new URL('../../categories/code-editors.json',import.meta.url),'utf8'));const p=c.products.find(p=>p.id==='lite-xl');const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url),'utf8'));
 assert.equal(p.features.git_integration.value,'partial');assert.match(p.features.git_integration.note,/gitstatus 插件/);assert.match(en[p.features.git_integration.note],/not a complete commit or branch-management GUI/);assert.equal(p.features.debugger.value,'unknown');assert.equal(p.features.lsp.value,'partial');assert(p.sources.includes('https://github.com/lite-xl/lite-xl-plugins/blob/6e4aa640d679decd67d2c0b677ede52ef70a7bf9/plugins/gitstatus.lua'));
});
