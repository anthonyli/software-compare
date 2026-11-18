import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const c=JSON.parse(fs.readFileSync(new URL('../../categories/archivers.json',import.meta.url),'utf8'));
for(const [id,url] of [['7zip','https://github.com/ip7z/7zip/blob/d3296e39e1f1f92c7b41c0c3848e65640428d42d/CPP/7zip/UI/GUI/CompressDialog.cpp'],['peazip','https://github.com/peazip/peazip.github.io/blob/2dca7d01bee679ef0826ea246bff5eef6bb8ac1a/file-split.html']])test(id+' split capability has immutable official evidence',()=>{
 const p=c.products.find(p=>p.id===id);assert.deepEqual(p.features.split,{value:'yes'});assert(p.sources.includes(url));assert.equal(p.features.repair.value,'unknown');
});
