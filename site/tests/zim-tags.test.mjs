import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('Zim native tags have direct official evidence',()=>{
 const d=JSON.parse(readFileSync(new URL('../../categories/note-taking.json',import.meta.url)));
 const rows=d.products.filter(p=>p.id==='zim');assert.equal(rows.length,1);const p=rows[0];
 assert.deepEqual(p.features.tags,{value:'yes'});
 for(const url of ['https://www.zim-wiki.org/manual/Help/Tags.html','https://zim-wiki.org/manual/Plugins/Tags.html'])assert(p.sources.includes(url));
 for(const k of ['web_clipper','mobile'])assert.equal(p.features[k].value,'unknown');
});
