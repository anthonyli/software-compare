import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const read=s=>JSON.parse(fs.readFileSync(new URL(`../../categories/${s}.json`,import.meta.url)));
const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url)));
test('office expansion contains six sourced modules with qualified free and cloud boundaries',()=>{
 const sets={'word-processors':['pages','onlyoffice-document'],spreadsheets:['numbers','onlyoffice-spreadsheet'],'presentation-tools':['keynote','onlyoffice-presentation']};
 for(const [slug,ids] of Object.entries(sets)){
  const c=read(slug);for(const id of ids){const p=c.products.find(x=>x.id===id);assert(p);assert.equal(c.products.filter(x=>x.id===id).length,1);assert.equal(p.collected_at,'2026-11-14');assert(p.sources.length>=3);assert.deepEqual(Object.keys(p.features).sort(),c.features.map(f=>f.key).sort());
   for(const s of [p.summary,p.price_summary,p.free_tier_limits,...Object.values(p.features).map(f=>f.note)])if(/[\u4e00-\u9fff]/.test(s))assert(en[s],s);
   if(id.startsWith('onlyoffice-')){assert.equal(p.license,'AGPL-3.0');assert.match(p.free_tier_limits,/可选模块/);assert(!p.platforms.includes('Web'));}
   else {assert.equal(p.open_source,false);assert.equal(p.features.office_files.value,'partial');assert.match(p.free_tier_limits,/水印/);assert.match(p.price_summary,/付费增值/);}
  }
 }
});
