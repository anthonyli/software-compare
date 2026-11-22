import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const cat=JSON.parse(fs.readFileSync(new URL('../../categories/outdoor-navigation.json',import.meta.url)));const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url)));
test('outdoor tools distinguish free offline maps and paid navigation',()=>{for(const id of ['gaia-gps','wikiloc']){const p=cat.products.find(p=>p.id===id);assert(p);assert.equal(p.open_source,false);for(const s of [p.summary,p.price_summary,p.free_tier_limits,p.pricing_model,...Object.values(p.features).map(f=>f.note||'')])if(/[\u4e00-\u9fff]/.test(s))assert(en[s]);}const g=cat.products.find(p=>p.id==='gaia-gps');assert.equal(g.features.offline_maps.value,'paid');assert.match(g.free_tier_limits,/新轨迹默认公开/);const w=cat.products.find(p=>p.id==='wikiloc');assert.equal(w.features.offline_maps.value,'yes');assert.equal(w.features.walking_routes.value,'paid');assert.match(w.free_tier_limits,/ORG/);});

test('Locus Map separates offline map allowance, Gold routing, and the Lite planner',()=>{
 const p=cat.products.find(p=>p.id==='locus-map');assert(p);
 assert.equal(p.open_source,false);assert.equal(p.license,'Proprietary');
 assert.deepEqual(p.platforms,['Android','iOS','Web']);
 assert.deepEqual(Object.values(p.features).map(f=>f.value),['partial','yes','yes','yes']);
 assert.match(p.free_tier_limits,/3 张离线 LoMaps.*Gold.*全部离线 LoMaps 和更新/);
 assert.match(p.free_tier_limits,/可选 Gold 云同步.*Firebase Analytics.*主动开启公开组 Live Tracking.*公开用户名和实时位置/);
 assert.match(p.features.offline_maps.note,/Android 内置 LoRouter 离线算路须用 Gold 并另下载算路数据.*另装免费的 BRouter/);
 assert.match(p.features.walking_routes.note,/iOS Lite 有基础路线规划和到点指引，但尚不支持沿路线逐向导航/);
 assert.match(p.features.cycling_routes.note,/iOS Lite 也能规划骑游和碎石路骑行路线/);
 assert.match(p.features.track_recording.note,/Web Planner.*不用于手机 GPS 记录/);
 assert.match(p.price_summary,/iOS Lite.*没有 Silver.*官网参考价.*所在地区商店/);
 const source=fs.readFileSync(new URL('../src/lib/display.ts',import.meta.url),'utf8');
 const leak=source.slice(source.indexOf('const LEAK ='),source.indexOf('export const PRICE_CAVEAT'));
 const fn=source.slice(source.indexOf('export function cleanPublicText'),source.indexOf('export function parseCurrency')).replace('export function','function').replace('(input: string | null | undefined): string','(input)');
 const clean=new Function(leak+fn+';return cleanPublicText;')();
 for(const raw of [p.summary,p.price_summary,p.free_tier_limits,...Object.values(p.features).map(f=>f.note)]){const key=clean(raw);assert(key);assert(en[key],key);assert.doesNotMatch(en[key],/[\u4e00-\u9fff]/);}
});

test('Avenza Maps separates downloaded maps, paid imports and manual guidance',()=>{
 const p=cat.products.find(p=>p.id==='avenza-maps');assert(p);
 assert.equal(p.open_source,false);assert.equal(p.license,'Proprietary');
 assert.deepEqual(p.platforms,['Android','iOS']);
 assert.deepEqual(Object.values(p.features).map(f=>f.value),['yes','partial','partial','yes']);
 assert.match(p.free_tier_limits,/部分地图另收费且不计入自带地图额度.*免费档不再支持自带地图.*Plus 最多 20 张.*Pro 订阅不限数量/);
 assert.match(p.free_tier_limits,/iOS 应用内购买的订阅不能转到 Android.*GPS 位置不在应用外明确存储或记录.*Google Analytics.*可在设置关闭/);
 assert.match(p.features.walking_routes.note,/手动画线.*未核实自动步行算路/);
 assert.match(p.features.cycling_routes.note,/已有骑行轨迹.*未核实.*自动算路/);
 assert.match(p.features.track_recording.note,/手机 GPS.*定位硬件和权限/);
 assert.match(p.price_summary,/每设备每年 34[.]99 美元.*每设备每年 169[.]99 美元起.*地区/);
 assert.deepEqual(p.prices.map(r=>[r.price,r.currency,r.period]),[['34.99','USD','年'],['169.99','USD','年']]);
 assert.match(p.prices[1].note,/专业、商业或学术使用需 Pro/);
 const source=fs.readFileSync(new URL('../src/lib/display.ts',import.meta.url),'utf8');
 const leak=source.slice(source.indexOf('const LEAK ='),source.indexOf('export const PRICE_CAVEAT'));
 const fn=source.slice(source.indexOf('export function cleanPublicText'),source.indexOf('export function parseCurrency')).replace('export function','function').replace('(input: string | null | undefined): string','(input)');
 const clean=new Function(leak+fn+';return cleanPublicText;')();
 for(const raw of [p.summary,p.price_summary,p.free_tier_limits,...p.prices.map(r=>r.note),...Object.values(p.features).map(f=>f.note)]){const key=clean(raw);assert(key);assert(en[key],key);assert.doesNotMatch(en[key],/[\u4e00-\u9fff]/);}
});
