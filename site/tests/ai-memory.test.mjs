import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const root=new URL('../../',import.meta.url);
const c=JSON.parse(fs.readFileSync(new URL('categories/ai-memory.json',root)));
const en=JSON.parse(fs.readFileSync(new URL('site/src/i18n/content-en.json',root)));
const strings=v=>typeof v==='string'?[v]:v&&typeof v==='object'?Object.values(v).flatMap(strings):[];
test('AI memory tools have complete sourced feature rows and translations',()=>{
 assert.deepEqual(c.products.map(p=>p.id),['taosheng','omi','screenpipe','auday']);
 for(const p of c.products){assert.deepEqual(Object.keys(p.features),c.features.map(f=>f.key));assert(p.sources.length>=3);assert.equal(p.collected_at,'2026-11-14');}
 for(const s of strings(c).filter(s=>/[\u4e00-\u9fff]/.test(s)))assert(en[s],s);
 const config=fs.readFileSync(new URL('site/src/config.ts',root),'utf8');assert(config.includes('"ai-memory"'));
 const labels=fs.readFileSync(new URL('site/src/i18n/labels.ts',root),'utf8');assert(labels.includes('"ai-memory": { zh: "AI 记忆助手", en: "AI memory assistants" }'));
});
test('capture privacy and current Screenpipe license are not overstated',()=>{
 const [tao,omi,screen]=c.products;
 assert.equal(screen.open_source,false);assert.equal(screen.license,'Screenpipe Commercial License');assert.match(screen.price_summary,/7 天/);assert.match(screen.free_tier_limits,/遥测默认开启/);
 assert.match(tao.free_tier_limits,/云转写\/LLM/);assert.match(tao.free_tier_limits,/不是原生 Mac/);assert.match(omi.free_tier_limits,/连接云后端/);
 for(const p of c.products)assert.equal(p.features.local_pipeline.value,'partial');
 assert.equal(tao.features.screen_history.value,'no');
 assert.match(c.notes,/不用于隐蔽监控/);
});
