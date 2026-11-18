import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('Pixelitor basic brushes are limited painting evidence',()=>{
 const d=JSON.parse(readFileSync(new URL('../../categories/image-editors.json',import.meta.url)));
 const rows=d.products.filter(p=>p.id==='pixelitor');assert.equal(rows.length,1);const p=rows[0];
 assert.deepEqual(p.features.painting,{value:'partial'});assert(p.sources.includes('https://pixelitor.sourceforge.io/user_guide.html'));
 assert.deepEqual(p.features.animation,{value:'partial',note:'GIF'});assert.equal(p.features.plugins.value,'unknown');
});
