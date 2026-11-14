import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const cat=JSON.parse(fs.readFileSync(new URL('../../categories/animation-2d.json',import.meta.url)));const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url)));
test('hand-drawn additions preserve evidence, old dates and unverified capabilities',()=>{
 for(const id of ['pencil2d','tahoma2d']){const p=cat.products.find(p=>p.id===id);assert(p);assert.equal(p.collected_at,'2026-11-14');assert(p.sources.length>=3);assert.deepEqual(Object.keys(p.features).sort(),cat.features.map(f=>f.key).sort());for(const s of [p.summary,p.price_summary,p.free_tier_limits,...Object.values(p.features).map(f=>f.note)])if(/[\u4e00-\u9fff]/.test(s))assert(en[s],s);}
 const p=cat.products.find(p=>p.id==='pencil2d');assert.equal(p.features.bone_animation.value,'unknown');assert.equal(p.features.node_effects.value,'unknown');assert.match(cat.products.find(p=>p.id==='tahoma2d').free_tier_limits,/Intel/);
 for(const id of ['synfig','opentoonz'])assert.equal(cat.products.find(p=>p.id===id).collected_at,'2026-11-13');assert(!cat.products.some(p=>p.id==='enve'));
});
