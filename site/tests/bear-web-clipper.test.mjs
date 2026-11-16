import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('Bear clipping has direct official evidence without stale unknown note',()=>{
 const d=JSON.parse(readFileSync(new URL('../../categories/note-taking.json',import.meta.url)));
 const rows=d.products.filter(p=>p.id==='bear');assert.equal(rows.length,1);const p=rows[0];
 assert.deepEqual(p.features.web_clipper,{value:'yes'});
 assert(p.sources.includes('https://bear.app/faq/browser-extensions/'));
 assert.equal(p.features.sync.value,'paid');assert.equal(p.features.e2e_encrypt.value,'partial');
 assert.deepEqual(p.platforms,['macOS','iOS']);
});
