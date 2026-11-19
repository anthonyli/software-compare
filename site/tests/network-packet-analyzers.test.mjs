import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(new URL('../../'+p,import.meta.url),'utf8'));
const c=read('categories/network-packet-analyzers.json'),en=read('site/src/i18n/content-en.json');
test('packet analyzers are a distinct two-product category with sourced capability boundaries',()=>{
 assert.equal(c.category_slug,'network-packet-analyzers');assert.deepEqual(c.products.map(p=>p.id),['wireshark','tcpdump']);
 for(const p of c.products){assert(p.open_source);assert.equal(p.collected_at,'2026-11-19');assert.deepEqual(Object.keys(p.features),c.features.map(f=>f.key));assert(p.sources.length>=4);for(const k of ['github_stars','latest_release','latest_release_date','maintenance_status'])assert.equal(p[k],null);for(const k of ['live_capture','offline','capture_filter','protocols','cli'])assert.equal(p.features[k].value,'yes');}
 assert.equal(c.products[0].license,'GPL-2.0');assert.equal(c.products[1].license,'BSD-3-Clause');assert.equal(c.products[0].features.gui.value,'yes');assert.equal(c.products[1].features.gui.value,'no');assert.match(c.products[0].free_tier_limits,/会话秘密/);assert.match(c.products[1].free_tier_limits,/Windows 官方源码构建/);assert.match(c.notes,/获授权/);
});
test('packet analysis new category strings are fully translated',()=>{const strings=v=>typeof v==='string'?[v]:v&&typeof v==='object'?Object.values(v).flatMap(strings):[];for(const s of strings(c).filter(s=>/[\u4e00-\u9fff]/.test(s)))assert(en[s],s);});
