import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/pdf-tools.json',import.meta.url),'utf8')).products.find(p=>p.id==='okular');
test('Okular explicitly supports PDF digital signing',()=>{
 assert.deepEqual(p.features.sign,{value:'yes'});
 assert(p.sources.includes('https://docs.kde.org/stable_kf6/en/okular/okular/signatures.html'));
 for(const key of ['ocr','merge_split','convert','encrypt']) assert.equal(p.features[key].value,'unknown');
 assert.deepEqual(p.platforms,['Linux','Windows']);
});
