import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=(p)=>JSON.parse(fs.readFileSync(new URL(p,import.meta.url)));
const en=read('../src/i18n/content-en.json');
const ds=['note-taking','browsers','launchers'].map((slug)=>read('../../categories/'+slug+'.json'));
const rows=ds.map((c,i)=>c.products.find((p)=>p.id===['miaoyan','helium','tinycast'][i]));
const all=(v)=>typeof v==='string'?[v]:v&&typeof v==='object'?Object.values(v).flatMap(all):[];
test('MiaoYan separates the free Mac source, paid mobile store delivery, and cloud folder sync',()=>{
 const [p]=rows;
 assert(p);
 assert.deepEqual(p.platforms,['macOS','iOS','iPadOS']);
 assert.equal(p.features.mobile.value,'paid');assert.equal(p.features.sync.value,'partial');
 assert.equal(p.features.rich_text.value,'no');assert.equal(p.features.plugins.value,'no');
 assert.match(p.license,/Mac 版公开源码：MIT；iPhone 和 iPad 版未开源/);
 assert.deepEqual(p.prices[1],{plan:'美区 App Store（通用购买）',price:12.99,currency:'USD',period:'once'});
 assert.match(p.free_tier_limits,/iPhone 和 iPad 版未开源.*商店分发条款未单独核实/);
 assert.match(en[p.features.sync.note],/Mac, iPhone, and iPad.*same folder via iCloud Drive.*Nutstore.*only on Mac.*does not sign into/);
});
test('Helium is a browser and does not infer built-in AI from extensions',()=>{
 const [,p]=rows;
 assert(p);assert.equal(p.license,'GPL-3.0');
 assert.deepEqual(p.platforms,['macOS','Windows','Linux']);
 assert(Object.values(p.features).every((f)=>f.value==='unknown'));
 assert.match(en[p.summary],/uBlock Origin fork.*Chromium extensions/);
 assert.match(en[p.free_tier_limits],/no mobile edition, built-in sync, password manager, or Widevine/);
 assert.match(en[p.free_tier_limits],/up to 24 hours.*source tags and platform binaries separately/);
 const agents=read('../../categories/agent-browser-tools.json');assert(!agents.products.some((p)=>p.id==='helium'));
});
test('Tinycast distinguishes optional extensions and AI from clipboard and file permissions',()=>{
 const [,,p]=rows;
 assert(p);assert.equal(p.license,'AGPL-3.0-or-later');
 assert.equal(p.features.plugins.value,'partial');assert.equal(p.features.ai_features.value,'yes');
 assert.match(en[p.free_tier_limits],/macOS 26 or later.*Intel Macs.*opt-in/);
 assert.match(en[p.features.file_search.note],/file and folder names in chosen folders.*Full Disk Access/);
 assert.match(en[p.features.clipboard_history.note],/Enabled by default.*three months.*pinned items/);
 assert.match(en[p.features.ai_features.note],/off by default.*local models.*usage costs/);
});
test('all three rows preserve category feature keys and have public English translations',()=>{
 for(const [i,p] of rows.entries()){
  assert.deepEqual(Object.keys(p.features),ds[i].features.map((f)=>f.key));
  assert(p.sources.length>=5);
  for(const v of all(p).filter((s)=>/[\u4e00-\u9fff]/.test(s)))assert(en[v],v);
 }
});
