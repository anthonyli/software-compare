import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const category = slug => JSON.parse(fs.readFileSync(new URL(`../../categories/${slug}.json`,import.meta.url),'utf8'));
test('sport expansion has six sourced, fully compared products and English text',()=>{
 const expected={'fitness-training':['feeel','liftosaur'],'cycling-tools':['fittrackee','zwift'],'outdoor-navigation':['qmapshack','alltrails']};
 const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url),'utf8'));
 for(const [slug,ids] of Object.entries(expected)) for(const id of ids){
  const c=category(slug), matches=c.products.filter(p=>p.id===id); assert.equal(matches.length,1,id);
  const p=matches[0]; assert(p.sources.length>=2); assert(p.free_tier_limits); assert(p.license);
  assert.deepEqual(Object.keys(p.features).sort(),c.features.map(f=>f.key).sort());
  for(const text of [p.summary,p.price_summary,p.free_tier_limits,...Object.values(p.features).map(f=>f.note)]) if(/[\u4e00-\u9fff]/.test(text)) assert(en[text],`${id}: ${text}`);
 }
});
test('offline maps, local software and training planners are not conflated',()=>{
 const outdoor=category('outdoor-navigation').products;
 assert.equal(outdoor.find(p=>p.id==='alltrails').features.offline_maps.value,'paid');
 assert.equal(outdoor.find(p=>p.id==='qmapshack').features.track_recording.value,'unknown');
 const cycling=category('cycling-tools').products;
 assert.equal(cycling.find(p=>p.id==='fittrackee').features.training_calendar.value,'partial');
 assert.equal(cycling.find(p=>p.id==='zwift').features.indoor_trainer.value,'yes');
 assert.deepEqual(category('fitness-training').products.find(p=>p.id==='feeel').platforms,['Android','Linux']);
});

test('adding new products does not refresh older product collection dates',()=>{
 for(const slug of ['fitness-training','cycling-tools','outdoor-navigation']) {
  const c=category(slug);
  for(const p of c.products.slice(0,2)) assert.equal(p.collected_at,p.id==='goldencheetah'?'2026-11-15':'2026-11-13');
  const baseline = new Set(['feeel','liftosaur','strong','fitbod','jefit','boostcamp','fittrackee','zwift','trainerroad','strava','trainingpeaks','mywhoosh','qmapshack','alltrails','komoot','mapy-com','gaia-gps','wikiloc']);
  for(const p of c.products.slice(2)) {
   if (p.id === 'strava') assert.equal(p.collected_at,'2026-11-15'); // documented authorization/privacy refresh
   else if (baseline.has(p.id)) assert.equal(p.collected_at,'2026-11-14');
   else {assert.match(p.collected_at,/^\d{4}-\d{2}-\d{2}$/);assert(p.collected_at>='2026-11-14');assert.equal(new Date(p.collected_at).toISOString().slice(0,10),p.collected_at);}
  }
 }
 assert.equal(category('outdoor-navigation').products.find(p=>p.id==='alltrails').features.cycling_routes.value,'partial');
});
