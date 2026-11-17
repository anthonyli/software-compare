import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
for (const [category,id,license,source] of [
 ['password-managers','keeweb','MIT','https://github.com/keeweb/keeweb/blob/50c43c4408ae46e688d8de324183ddfe85a430ef/LICENSE'],
 ['downloaders','motrix','MIT (project code; third-party components separately licensed)','https://github.com/agalwood/Motrix/blob/6a5d6efd2dc72a00f3cc2adfa76056c16336ce0c/LICENSE'],
]) test(`${id} has a verified, scoped project license`,()=>{
 const data=JSON.parse(fs.readFileSync(new URL(`../../categories/${category}.json`,import.meta.url),'utf8'));
 const product=data.products.find(p=>p.id===id);
 assert.equal(product.license,license);
 assert.equal(product.open_source,true);
 assert(product.sources.includes(source));
 if(id==='motrix') assert(product.sources.includes(source.replace('LICENSE','THIRD_PARTY_NOTICES.md')));
});
