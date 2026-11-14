import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const cat=JSON.parse(fs.readFileSync(new URL('../../categories/texture-materials.json',import.meta.url)));const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url)));
test('material additions distinguish subscription, source and workflow boundaries',()=>{
 for(const id of ['substance-3d-painter','substance-3d-designer','armorpaint']){const p=cat.products.find(p=>p.id===id);assert(p);assert.equal(p.collected_at,'2026-11-14');assert(p.sources.length>=3);assert.deepEqual(Object.keys(p.features).sort(),cat.features.map(f=>f.key).sort());for(const s of [p.summary,p.price_summary,p.free_tier_limits,...Object.values(p.features).map(f=>f.note)])if(/[\u4e00-\u9fff]/.test(s))assert(en[s],s);}
 assert.equal(cat.products.find(p=>p.id==='substance-3d-painter').features.node_graph.value,'unknown');assert.equal(cat.products.find(p=>p.id==='substance-3d-designer').features.painting_3d.value,'unknown');assert.match(cat.products.find(p=>p.id==='armorpaint').price_summary,/US\$19/);
});
