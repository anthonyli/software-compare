import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const category = slug => JSON.parse(fs.readFileSync(new URL(`../../categories/${slug}.json`,import.meta.url),'utf8'));
test('Adobe references and differentiated open alternatives live in their task categories',()=>{
 const expected={ 'image-editors':['adobe-photoshop','pinta','photodemon','pixelitor'], 'vector-graphics':['adobe-illustrator'], 'photo-management':['adobe-lightroom-classic','art'], 'desktop-publishing':['adobe-indesign'], 'compositing':['adobe-after-effects'] };
 for(const [slug,ids] of Object.entries(expected)){
  const c=category(slug);
  for(const id of ids){
   const matches=c.products.filter(p=>p.id===id);assert.equal(matches.length,1,id);
   const p=matches[0];assert.equal(p.open_source,!id.startsWith('adobe-'));assert(p.free_tier_limits);assert(p.sources.length>=2);
   assert.deepEqual(Object.keys(p.features).sort(),c.features.map(f=>f.key).sort());
  }
 }
 assert.deepEqual(category('image-editors').products.find(p=>p.id==='photodemon').platforms,['Windows']);
 assert.equal(category('compositing').products.find(p=>p.id==='adobe-after-effects').features.node_compositing.value,'no');
});
