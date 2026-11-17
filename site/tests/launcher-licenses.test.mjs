import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const data=JSON.parse(fs.readFileSync(new URL('../../categories/launchers.json',import.meta.url),'utf8'));
for (const [id,license,source] of [
 ['ulauncher','GPL-3.0-or-later','https://github.com/Ulauncher/Ulauncher/blob/d235f0be317a1682349a14e0b22813437b0b4e93/LICENSE'],
 ['rofi','MIT','https://github.com/davatorium/rofi/blob/409eed9f8cc8583fb030f85f42e8a2f59804f996/COPYING'],
]) test(`${id} uses verified project license with immutable official evidence`,()=>{
 const product=data.products.find(p=>p.id===id);
 assert.equal(product.license,license);
 assert.equal(product.open_source,true);
 assert(product.sources.includes(source));
 assert.doesNotMatch(product.license,/[\u4e00-\u9fff]/);
});
