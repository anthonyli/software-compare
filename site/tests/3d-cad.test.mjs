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

test('Spline distinguishes skeletal playback, glTF export and full self-hosting',()=>{
 const c=read('animation-3d');
 const p=c.products.find(p=>p.id==='spline');
 assert.deepEqual(p.platforms,['Web','macOS','Windows']);
 assert.deepEqual(Object.keys(p.features),c.features.map(f=>f.key));
 assert.equal(p.features.rigging_3d.value,'partial');
 assert.match(p.features.rigging_3d.note,/导入并播放带骨骼动画.*未确认在 Spline 内创建骨骼/);
 assert.match(p.price_summary,/带水印.*Hobby.*Pro.*完整自托管包需 Enterprise/);
 assert.match(p.free_tier_limits,/glTF 导出不会保留 Spline 的状态、事件或交互/);
 for(const s of [p.summary,p.price_summary,p.free_tier_limits,...Object.values(p.features).map(f=>f.note)]) assert(en[s],s);
});

test('Needle separates web publishing from authoring and offline delivery', () => {
 const product = read('animation-3d').products.find(p => p.id === 'needle-engine');
 assert(product);
 assert.equal(product.open_source, false);
 assert.deepEqual(Object.values(product.features).map(f => f.value), ['no', 'no', 'yes', 'partial']);
 assert.match(product.features.animation_3d.note, /自定义 glTF 扩展/);
 assert.match(product.free_tier_limits, /多文件 dist\/.*singleHtml.*makeFilesLocal.*不保证/);
 assert.match(product.price_summary, /非商用.*588.*自托管/);
 assert.deepEqual(product.prices[1].period, 'year');
 const en = JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json', import.meta.url)));
 for (const key of [product.summary, product.price_summary, product.free_tier_limits,
   product.prices[1].note, ...Object.values(product.features).map(f => f.note)]) {
   assert(typeof en[key] === 'string', key);
 }
});
