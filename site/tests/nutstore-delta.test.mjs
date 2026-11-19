import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
test('Nutstore incremental sync excludes unsupported files and mobile apps',()=>{
 const c=JSON.parse(fs.readFileSync(new URL('../../categories/file-sync.json',import.meta.url),'utf8'));const p=c.products.find(p=>p.id==='nutstore');const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url),'utf8'));
 assert.equal(p.features.block_level.value,'partial');assert.match(p.features.block_level.note,/移动端 App 不支持/);assert.match(p.features.block_level.note,/加密 Office/);assert.match(en[p.features.block_level.note],/mobile apps do not support/);assert.equal(p.features.versions.value,'yes');assert(p.sources.includes('https://help.jianguoyun.com/?p=775'));assert(p.sources.includes('https://help.jianguoyun.com/?page_id=843'));
});
