import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
test('Nutstore history has bounded free and paid personal retention',()=>{
 const c=JSON.parse(fs.readFileSync(new URL('../../categories/file-sync.json',import.meta.url),'utf8'));const p=c.products.find(p=>p.id==='nutstore');const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url),'utf8'));
 assert.equal(p.features.versions.value,'yes');assert.match(p.features.versions.note,/免费档保留一个月/);assert.match(p.features.versions.note,/付费档保留三个月/);assert.match(p.features.versions.note,/不是永久/);assert.match(en[p.features.versions.note],/retention is not permanent/);
 for(const k of ['selective','e2e_encrypt','conflict','ignore_rules'])assert.equal(p.features[k].value,'unknown');assert.equal(p.features.block_level.value,'partial');for(const n of [190,773])assert(p.sources.includes('https://help.jianguoyun.com/?p='+n));
});
