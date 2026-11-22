import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const cat=JSON.parse(fs.readFileSync(new URL('../../categories/animation-2d.json',import.meta.url)));const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url)));
test('hand-drawn additions preserve evidence, old dates and unverified capabilities',()=>{
 for(const id of ['pencil2d','tahoma2d']){const p=cat.products.find(p=>p.id===id);assert(p);assert.equal(p.collected_at,'2026-11-14');assert(p.sources.length>=3);assert.deepEqual(Object.keys(p.features).sort(),cat.features.map(f=>f.key).sort());for(const s of [p.summary,p.price_summary,p.free_tier_limits,...Object.values(p.features).map(f=>f.note)])if(/[\u4e00-\u9fff]/.test(s))assert(en[s],s);}
 const p=cat.products.find(p=>p.id==='pencil2d');assert.equal(p.features.bone_animation.value,'unknown');assert.equal(p.features.node_effects.value,'unknown');assert.match(cat.products.find(p=>p.id==='tahoma2d').free_tier_limits,/Intel/);
 assert.equal(cat.products.find(p=>p.id==='synfig').collected_at,'2026-11-13');assert.equal(cat.products.find(p=>p.id==='opentoonz').collected_at,'2026-11-15');assert(!cat.products.some(p=>p.id==='enve'));
});

test('Moho distinguishes Debut and Pro assets, rigging, and trial limits',()=>{
 const p=cat.products.find(p=>p.id==='moho');assert(p);
 assert.equal(p.open_source,false);assert.equal(p.license,'Proprietary');
 assert.deepEqual(p.platforms,['Windows','macOS']);
 assert.deepEqual(Object.values(p.features).map(f=>f.value),['yes','yes','yes','unknown']);
 assert.deepEqual(p.prices.map(r=>[r.plan,r.price,r.currency,r.period]),[['Moho Debut 14','59.99','USD','一次性'],['Moho Pro 14','399.99','USD','一次性']]);
 assert.match(p.free_tier_limits,/15 天，提交邮箱可再延长 15 天.*不能导入外部格式.*导出为其他格式.*Demo Mode 水印.*Apple Silicon.*14[.]5[.]1/);
 assert.match(p.features.raster_animation.note,/最多导入 10 个 PSD 图层.*不将导入素材动画视为原生位图逐帧绘画/);
 assert.match(p.features.bone_animation.note,/2 个 Smart Bones 和 1 个网格/);
 assert.match(p.features.node_effects.note,/未确认通用节点式特效图/);
 const source=fs.readFileSync(new URL('../src/lib/display.ts',import.meta.url),'utf8');
 const leak=source.slice(source.indexOf('const LEAK ='),source.indexOf('export const PRICE_CAVEAT'));
 const fn=source.slice(source.indexOf('export function cleanPublicText'),source.indexOf('export function parseCurrency')).replace('export function','function').replace('(input: string | null | undefined): string','(input)');
 const clean=new Function(leak+fn+';return cleanPublicText;')();
 for(const raw of [p.summary,p.pricing_model,p.price_summary,p.free_tier_limits,...p.prices.map(r=>r.note),...Object.values(p.features).map(f=>f.note)]){const key=clean(raw);assert(key);assert(en[key],key);assert.doesNotMatch(en[key],/[\u4e00-\u9fff]/);}
});
