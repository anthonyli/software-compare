import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const c=JSON.parse(fs.readFileSync(new URL('../../categories/remote-desktop.json',import.meta.url),'utf8'));
const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url),'utf8'));
const p=c.products.find(p=>p.id==='uu-remote');
test('UU Remote is a sourced and translated complete comparison row',()=>{
 assert.equal(c.products.filter(p=>p.id==='uu-remote').length,1);
 assert.deepEqual(Object.keys(p.features).sort(),c.features.map(f=>f.key).sort());
 assert.equal(p.collected_at,'2026-11-14'); assert.equal(c.collected_at,'2026-11-12');
 assert.equal(p.open_source,false);assert.equal(p.github_url,null);
 assert(p.sources.includes('https://yc.uu.163.com/contact/20240402/40294_1146067.html'));
 const strings=v=>typeof v==='string'?[v]:v&&typeof v==='object'?Object.values(v).flatMap(strings):[];
 for(const s of strings(p).filter(s=>/[\u4e00-\u9fff]/.test(s)))assert(en[s],s);
});
test('UU Remote distinguishes free marketing, WOL conditions and unverified server capabilities',()=>{
 assert.equal(p.features.free_for_commercial.value,'unknown');
 assert.equal(p.features.self_host.value,'unknown');
 assert.equal(p.features.session_recording.value,'unknown');
 assert.equal(p.features.wake_on_lan.value,'partial');
 assert.match(p.features.e2e_encryption.note,/未审计/);
});
