import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const root=new URL('../../',import.meta.url);
const slugs=['word-processors','spreadsheets','presentation-tools','cad','texture-materials'];
const categories=slugs.map(s=>JSON.parse(fs.readFileSync(new URL(`categories/${s}.json`,root))));
const en=JSON.parse(fs.readFileSync(new URL('site/src/i18n/content-en.json',root)));
const config=fs.readFileSync(new URL('site/src/config.ts',root),'utf8');
const strings=v=>typeof v==='string'?[v]:v&&typeof v==='object'?Object.values(v).flatMap(strings):[];
test('Storytold second batch has five navigable categories and eleven sourced comparison rows',()=>{
 const baseline=["wordcraft", "libreoffice-writer", "gridcraft", "libreoffice-calc", "deckcraft", "libreoffice-impress", "cadcraft", "librecad", "texturecraft", "materialcraft", "material-maker"];
 assert(baseline.every(id=>categories.flatMap(c=>c.products).some(p=>p.id===id)));
 for(const c of categories){
  assert(config.includes(`"${c.category_slug}"`));assert(c.products.length>=2);
  const keys=c.features.map(f=>f.key).sort();
  for(const p of c.products){
   assert.deepEqual(Object.keys(p.features).sort(),keys);assert(p.sources.length>=2);
   if(baseline.includes(p.id))assert.equal(p.collected_at,'2026-11-14');else {assert.match(p.collected_at,/^\d{4}-\d{2}-\d{2}$/);assert(p.collected_at>='2026-11-14');}assert(p.license);assert(p.platforms.length);
   assert(p.github_stars===null||(Number.isInteger(p.github_stars)&&p.github_stars>=0));
   for(const s of strings(p).filter(s=>/[\u4e00-\u9fff]/.test(s)))assert(en[s],s);
  }
  for(const f of c.features)assert(en[f.label],f.label);
  assert(en[c.category_name_zh]);
 }
});
test('CAD data-loss, Office fidelity and experimental material workflows stay qualified',()=>{
 const rows=categories.flatMap(c=>c.products);const p=id=>rows.find(p=>p.id===id);
 assert.match(p('cadcraft').free_tier_limits,/保存时丢弃/);assert.equal(p('cadcraft').features.dxf.value,'partial');
 assert.equal(p('librecad').features.dwg.value,'partial');assert.match(p('librecad').free_tier_limits,/DWGSUPPORT/);
 for(const id of ['wordcraft','gridcraft','deckcraft'])assert.equal(p(id).features.office_files.value,'partial');
 assert.match(p('texturecraft').free_tier_limits,/首次签名发布/);
 assert.equal(p('material-maker').features.painting_3d.value,'partial');
 assert.equal(p('materialcraft').features.painting_3d.value,'unknown');
 assert.match(p('materialcraft').free_tier_limits,/完整 SBS/);
});
