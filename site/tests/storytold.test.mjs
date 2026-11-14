import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const root=new URL('../../categories/',import.meta.url);
const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url)));
const ids=['photocraft','lightcraft','vectorcraft','figcraft','filmcraft','soundcraft','pdfcraft','designcraft','anicraft','effectcraft','artcraft','craft-anything'];
const cats=fs.readdirSync(root).filter(f=>f.endsWith('.json')).map(f=>JSON.parse(fs.readFileSync(new URL(f,root))));
const rows=cats.flatMap(c=>c.products.filter(p=>ids.includes(p.id)).map(p=>({c,p})));
const strings=v=>typeof v==='string'?[v]:v&&typeof v==='object'?Object.values(v).flatMap(strings):[];
test('storytold apps are uniquely categorized, sourced and translated without invented GitHub metrics',()=>{
 assert.equal(rows.length,12);assert.equal(new Set(rows.map(({p})=>p.id)).size,12);
 for(const {c,p} of rows){
  assert.deepEqual(Object.keys(p.features).sort(),c.features.map(f=>f.key).sort());
  assert.equal(p.github_url,`https://github.com/storytold/${p.id}`);
  assert(p.sources.includes(`${p.github_url}/blob/main/README.md`));
  assert.equal(p.license,'MIT OR Apache-2.0');assert.equal(p.collected_at,'2026-11-14');
  assert(p.github_stars === null || (Number.isInteger(p.github_stars) && p.github_stars >= 0));
  assert(p.latest_release === null || typeof p.latest_release === 'string');
  for(const s of strings(p).filter(s=>/[\u4e00-\u9fff]/.test(s))) assert(en[s],s);
 }
});
test('early-stage applications and cloud workflows keep explicit limitations',()=>{
 const get=id=>rows.find(({p})=>p.id===id).p;
 assert.match(get('photocraft').summary,/early alpha/);
 assert.match(get('anicraft').summary,/不适合生产/);
 assert.match(get('figcraft').free_tier_limits,/不是端到端加密/);
 assert.equal(get('pdfcraft').features.ocr.value,'partial');
 assert.equal(get('lightcraft').features.raw.value,'partial');
 assert.equal(get('artcraft').features.local_generation.value,'unknown');
 assert.equal(get('craft-anything').features.local_models.value,'partial');
});
