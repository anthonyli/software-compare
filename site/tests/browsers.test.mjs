import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(new URL(p,import.meta.url)));
const c=read('../../categories/browsers.json');
const en=read('../src/i18n/content-en.json');
const by=id=>c.products.find(p=>p.id===id);
test('browsers keep human browsers separate from agent tools and retired products',()=>{
 assert.deepEqual(c.products.map(p=>p.id),['chrome','firefox','safari','edge','brave','comet','dia']);
 assert.equal(c.products.length,7);
 for(const p of c.products){assert(p.sources.length>=2);assert.equal(p.collected_at,'2026-11-17');assert.deepEqual(Object.keys(p.features),c.features.map(f=>f.key));}
});
test('browser pricing and data boundaries remain explicit',()=>{
 assert.match(by('dia').price_summary,/免费但无 AI/);assert.match(by('dia').free_tier_limits,/14 天/);assert.match(by('dia').free_tier_limits,/可选自动充值/);assert.match(by('dia').notes,/30 天/);assert.deepEqual(by('dia').platforms,['macOS','Windows']);
 assert.match(by('chrome').free_tier_limits,/无痕/);assert.equal(by('brave').features.local_model.value,'partial');
 assert.equal(by('firefox').features.actions.value,'unknown');assert.equal(by('safari').open_source,false);
 assert.match(by('comet').notes,/消费者与企业/);
});
test('all browser category Chinese strings have English translations',()=>{
 const strings=x=>typeof x==='string'?[x]:x&&typeof x==='object'?Object.values(x).flatMap(strings):[];
 for(const s of strings(c).filter(s=>/[\u4e00-\u9fff]/.test(s)))assert(en[s],s);
});
