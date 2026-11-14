import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const root=new URL('../../',import.meta.url);
const read=p=>JSON.parse(fs.readFileSync(new URL(p,root),'utf8'));
const c=read('categories/proxy-clients.json'), tr=read('site/src/i18n/content-en.json');
test('proxy clients remain separate from VPN services with sourced boundaries',()=>{
 assert.deepEqual(c.products.map(p=>p.id),['clash-verge-rev','clash-party','v2rayn']);
 assert.match(c.notes,/ClashX.*404/);
 for(const p of c.products){assert.equal(p.license,'GPL-3.0');assert(p.sources.length>=3);assert.deepEqual(Object.keys(p.features).sort(),c.features.map(f=>f.key).sort());assert.match(p.price_summary,/不包含网络接入/);}
 const strings=v=>typeof v==='string'?[v]:v&&typeof v==='object'?Object.values(v).flatMap(strings):[];
 for(const s of strings(c).filter(s=>/[\u4e00-\u9fff]/.test(s)))assert(tr[s],s);
});
