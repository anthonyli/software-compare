import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
test('Nutstore conflict copies do not imply automatic content merging',()=>{
 const c=JSON.parse(fs.readFileSync(new URL('../../categories/file-sync.json',import.meta.url),'utf8'));const p=c.products.find(p=>p.id==='nutstore');const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url),'utf8'));
 assert.equal(p.features.conflict.value,'yes');assert.match(p.features.conflict.note,/人工比对、合并/);assert.match(en[p.features.conflict.note],/not automatic content merging/);assert.equal(p.features.p2p_lan.value,'partial');assert.equal(p.features.e2e_encrypt.value,'unknown');assert(p.sources.includes('https://help.jianguoyun.com/?p=1129'));assert(p.sources.includes('https://help.jianguoyun.com/?p=4031'));
});
