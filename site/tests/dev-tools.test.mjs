import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=slug=>JSON.parse(fs.readFileSync(new URL(`../../categories/${slug}.json`,import.meta.url),'utf8'));
const expected={'api-clients':['insomnia','postman'],'database-clients':['beekeeper-community','heidisql','pgadmin']};
test('developer tool additions retain dates, evidence and bilingual complete rows',()=>{
 const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url),'utf8'));
 for(const [slug,ids] of Object.entries(expected)){
  const c=read(slug);
  for(const p of c.products){
   if(ids.includes(p.id))assert.equal(p.collected_at,'2026-11-14');
   if(['bruno','hoppscotch','dbeaver-community','db-browser-sqlite'].includes(p.id))assert.equal(p.collected_at,'2026-11-13');
   if(!ids.includes(p.id))continue;
   assert.equal(c.products.filter(x=>x.id===p.id).length,1);assert(p.sources.length>=2);
   assert.deepEqual(Object.keys(p.features).sort(),c.features.map(f=>f.key).sort());
   for(const s of [p.summary,p.price_summary,p.free_tier_limits,...Object.values(p.features).map(f=>f.note)])if(/[\u4e00-\u9fff]/.test(s))assert(en[s],s);
  }
  assert(ids.every(id=>c.products.some(p=>p.id===id)));
 }
});
test('community tiers, proprietary clients and engine boundaries are not conflated',()=>{
 const db=read('database-clients').products,api=read('api-clients').products;
 assert.equal(api.find(p=>p.id==='postman').open_source,false);
 assert.equal(api.find(p=>p.id==='postman').github_url,null);
 assert.match(api.find(p=>p.id==='postman').free_tier_limits,/GraphQL\/gRPC/);
 assert.equal(db.find(p=>p.id==='beekeeper-community').features.import_export.value,'paid');
 assert.equal(db.find(p=>p.id==='pgadmin').features.multi_engine.value,'no');
 assert.match(db.find(p=>p.id==='heidisql').free_tier_limits,/macOS arm64/);
});
