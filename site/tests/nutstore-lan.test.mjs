import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
test('Nutstore LAN acceleration retains prior cloud upload requirement',()=>{
 const c=JSON.parse(fs.readFileSync(new URL('../../categories/file-sync.json',import.meta.url),'utf8'));const p=c.products.find(p=>p.id==='nutstore');const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url),'utf8'));
 assert.equal(p.features.p2p_lan.value,'partial');assert.match(p.features.p2p_lan.note,/先上传云服务器/);assert.match(en[p.features.p2p_lan.note],/not fully offline/);assert.equal(p.features.block_level.value,'partial');assert.equal(p.features.versions.value,'yes');assert(p.sources.includes('https://help.jianguoyun.com/?p=777'));
});
