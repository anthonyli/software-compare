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

test('GIMP frame animation has qualified official evidence rather than unknown/full support',()=>{
 const gimp=category('image-editors').products.find(p=>p.id==='gimp');
 assert.equal(gimp.features.animation.value,'partial');
 assert.match(gimp.features.animation.note,/图层组/);
 assert.match(gimp.features.animation.note,/不等同于完整动画时间轴/);
 assert(gimp.sources.includes('https://docs.gimp.org/3.0/en/export-file-formats.html'));
 const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url),'utf8'));
 assert.match(en[gimp.features.animation.note],/not a full animation timeline/);
});
