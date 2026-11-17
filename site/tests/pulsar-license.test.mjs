import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
test('Pulsar records its verified project license and pinned source',()=>{
 const data=JSON.parse(fs.readFileSync(new URL('../../categories/code-editors.json',import.meta.url),'utf8'));
 const product=data.products.find(p=>p.id==='pulsar');
 assert.equal(product.license,'MIT');
 assert.equal(product.open_source,true);
 assert(product.sources.includes('https://github.com/pulsar-edit/pulsar/blob/7573f2b73406082491b8083bc2746cbfd1a9732f/LICENSE.md'));
});
