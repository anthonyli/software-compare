import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('Pinta plugin capability uses release evidence without guessing animation',()=>{
 const d=JSON.parse(readFileSync(new URL('../../categories/image-editors.json',import.meta.url)));
 const matches=d.products.filter(x=>x.id==='pinta'); assert.equal(matches.length,1);
 const p=matches[0]; assert.equal(p.features.plugins.value,'yes'); assert.equal(p.features.animation.value,'unknown');
 assert(p.sources.includes('https://github.com/PintaProject/Pinta/releases/tag/3.1'));
 assert(p.sources.includes('https://github.com/PintaProject/Pinta-Community-Addins'));
});
