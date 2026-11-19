import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
test('Nutstore ignore rules retain verified Windows scope',()=>{
 const c=JSON.parse(fs.readFileSync(new URL('../../categories/file-sync.json',import.meta.url),'utf8'));const p=c.products.find(p=>p.id==='nutstore');const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url),'utf8'));
 assert.equal(p.features.ignore_rules.value,'yes');assert.match(p.features.ignore_rules.note,/Windows/);assert.match(en[p.features.ignore_rules.note],/rule syntax and equivalent configuration on other platforms are unverified/i);assert.equal(p.features.selective.value,'unknown');assert.equal(p.features.e2e_encrypt.value,'unknown');assert(p.sources.includes('https://help.jianguoyun.com/?p=4159'));
});
