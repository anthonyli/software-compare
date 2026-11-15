import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('Keka archive capabilities use official format evidence without guessing other cells',()=>{
 const d=JSON.parse(readFileSync(new URL('../../categories/archivers.json',import.meta.url)));
 const matches=d.products.filter(x=>x.id==='keka');assert.equal(matches.length,1);const p=matches[0];
 for(const key of ['zip','rar_extract','seven_zip','tar_gz','iso','split']) assert.deepEqual(p.features[key],{value:'yes'});
 for(const key of ['rar_create','repair','preview','encryption']) assert.equal(p.features[key].value,'unknown');
 assert(p.sources.includes('https://www.keka.io/en/'));
});
