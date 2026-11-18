import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('PhotoDemon layer-based animation stays partial with dated official sources',()=>{
 const d=JSON.parse(readFileSync(new URL('../../categories/image-editors.json',import.meta.url)));
 const rows=d.products.filter(p=>p.id==='photodemon');assert.equal(rows.length,1);const p=rows[0];
 assert.deepEqual(p.features.animation,{value:'partial'});assert.deepEqual(p.features.plugins,{value:'partial',note:'Photoshop 8bf / 32-bit'});
 for(const s of ['https://photodemon.org/2020/09/09/photodemon-8-2.html','https://photodemon.org/2024/07/11/photodemon-2024-7.html','https://photodemon.org/2025/12/12/photodemon-2025-12.html'])assert(p.sources.includes(s));
});
