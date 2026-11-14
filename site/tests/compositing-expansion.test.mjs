import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const cat=JSON.parse(fs.readFileSync(new URL('../../categories/compositing.json',import.meta.url)));const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url)));
test('professional compositors retain licensing and old evidence dates',()=>{
 for(const id of ['fusion-studio','nuke']){const p=cat.products.find(p=>p.id===id);assert(p);assert.equal(p.open_source,false);assert.equal(p.collected_at,'2026-11-14');assert(p.sources.length>=3);assert.deepEqual(Object.keys(p.features).sort(),cat.features.map(f=>f.key).sort());for(const s of [p.summary,p.price_summary,p.free_tier_limits])assert(en[s],s);}
 for(const id of ['natron','adobe-after-effects'])assert.equal(cat.products.find(p=>p.id===id).collected_at,'2026-11-13');assert(!cat.notes.includes('暂收录一款'));assert.match(cat.products.find(p=>p.id==='nuke').free_tier_limits,/1920/);
});
