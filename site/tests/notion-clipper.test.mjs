import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('Notion clipper availability has direct official evidence',()=>{
 const d=JSON.parse(readFileSync(new URL('../../categories/note-taking.json',import.meta.url)));
 const rows=d.products.filter(p=>p.id==='notion');assert.equal(rows.length,1);
 assert.deepEqual(rows[0].features.web_clipper,{value:'yes'});
 assert(rows[0].sources.includes('https://www.notion.com/help/web-clipper'));
});
