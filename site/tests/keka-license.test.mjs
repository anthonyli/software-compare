import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('Keka application is not presented as open source in either locale',()=>{
 const d=JSON.parse(readFileSync(new URL('../../categories/archivers.json',import.meta.url)));
 const p=d.products.find(x=>x.id==='keka');
 const en=JSON.parse(readFileSync(new URL('../src/i18n/content-en.json',import.meta.url)));
 assert.equal(p.open_source,false);assert.equal(p.license,'专有软件');
 for(const text of [p.license,p.summary,p.price_summary,p.prices[0].note]){
  assert.doesNotMatch(text,/开源/);assert.equal(typeof en[text],'string');assert.doesNotMatch(en[text],/open.source/i);
 }
 assert(p.prices.some(x=>x.plan==='Mac App Store'&&x.price==='未知'));
 assert(p.sources.includes('https://github.com/aonez/Keka/discussions/1627'));
 assert.equal(p.features.rar_extract.value,'yes');
});
