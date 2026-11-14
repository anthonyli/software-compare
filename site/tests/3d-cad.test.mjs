import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=s=>JSON.parse(fs.readFileSync(new URL(`../../categories/${s}.json`,import.meta.url)));
const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url)));
test('3D and CAD additions preserve sourced bilingual feature boundaries',()=>{
 for(const [slug,ids] of Object.entries({'animation-3d':['maya','cinema-4d','wings-3d'],cad:['qcad-ce']})){
  const c=read(slug);for(const id of ids){const p=c.products.find(p=>p.id===id);assert(p);assert.equal(p.collected_at,'2026-11-14');assert(p.sources.length>=3);assert.deepEqual(Object.keys(p.features).sort(),c.features.map(f=>f.key).sort());
   for(const s of [p.summary,p.price_summary,p.free_tier_limits,p.license,...Object.values(p.features).map(f=>f.note)])if(/[\u4e00-\u9fff]/.test(s))assert(en[s],s);
  }
 }
 assert.equal(read('animation-3d').products.find(p=>p.id==='blender').collected_at,'2026-11-13');
 const p=id=>read('animation-3d').products.find(p=>p.id===id);
 assert.equal(p('wings-3d').features.animation_3d.value,'no');assert.equal(p('wings-3d').features.rigging_3d.value,'unknown');assert.equal(p('wings-3d').features.rendering_3d.value,'partial');
 assert(!p('cinema-4d').platforms.includes('Linux'));assert.match(p('maya').free_tier_limits,/不支持 Mac/);
 const q=read('cad').products.find(p=>p.id==='qcad-ce');assert.equal(q.features.dwg.value,'paid');assert.equal(q.features.vector_export.value,'partial');assert.match(q.features.dxf.note,/R15/);
});
