import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('OneNote tags attachments and clipper have official evidence',()=>{
 const d=JSON.parse(readFileSync(new URL('../../categories/note-taking.json',import.meta.url)));
 const rows=d.products.filter(x=>x.id==='onenote');assert.equal(rows.length,1);const p=rows[0];
 for(const key of ['tags','attachments','web_clipper'])assert.deepEqual(p.features[key],{value:'yes'});
 for(const url of ['take-and-format-notes','onenote-help-and-learning/insert-or-attach-files-to-notes','getting-started-with-the-onenote-web-clipper'])assert(p.sources.includes('https://support.microsoft.com/en-us/onenote/'+url));
 for(const key of ['offline','e2e_encrypt','plugins'])assert.equal(p.features[key].value,'unknown');
});
