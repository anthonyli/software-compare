import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('SiYuan tags use version-matched official evidence',()=>{
 const d=JSON.parse(readFileSync(new URL('../../categories/note-taking.json',import.meta.url)));
 const rows=d.products.filter(p=>p.id==='siyuan');assert.equal(rows.length,1);const p=rows[0];
 assert.deepEqual(p.features.tags,{value:'yes'});
 assert(p.sources.includes('https://github.com/siyuan-note/siyuan/blob/v3.8.10/README.md'));
 assert.equal(p.latest_release,'3.8.10');
});
