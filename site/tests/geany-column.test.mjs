import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
test('Geany column editing does not imply arbitrary discontiguous cursors',()=>{
 const c=JSON.parse(fs.readFileSync(new URL('../../categories/code-editors.json',import.meta.url),'utf8'));const p=c.products.find(p=>p.id==='geany');const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url),'utf8'));
 assert.equal(p.features.multi_cursor.value,'partial');assert.match(p.features.multi_cursor.note,/零宽列选区/);assert.match(en[p.features.multi_cursor.note],/not arbitrary discontiguous cursors/);for(const k of ['remote_dev','ai_assistant','live_share'])assert.equal(p.features[k].value,'unknown');assert(p.sources.includes('https://github.com/geany/geany/blob/2.1.0/doc/geany.txt'));
});
