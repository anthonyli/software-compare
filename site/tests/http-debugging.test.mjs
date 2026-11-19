import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(new URL('../../'+p,import.meta.url),'utf8'));const c=read('categories/http-debugging.json'),en=read('site/src/i18n/content-en.json');
test('HTTP debugging keeps four identities and sourced subscription boundaries',()=>{
 assert.deepEqual(c.products.map(p=>p.id),['mitmproxy','charles','proxyman','http-toolkit']);
 for(const p of c.products){assert.deepEqual(Object.keys(p.features),c.features.map(f=>f.key));assert.deepEqual(p.platforms,['Windows','macOS','Linux']);assert.equal(p.collected_at,'2026-11-19');assert(p.sources.length>=4);for(const k of ['github_stars','latest_release','latest_release_date','maintenance_status'])assert.equal(p[k],null);}
 const [m,ch,pr,h]=c.products;assert.equal(m.license,'MIT');assert.equal(m.open_source,true);assert.equal(ch.open_source,false);assert.equal(pr.open_source,false);assert.equal(h.open_source,true);
 assert.equal(h.features.https_inspect.value,'yes');assert.equal(h.features.manual_edit.value,'yes');for(const k of ['request_replay','response_mock'])assert.equal(h.features[k].value,'paid');
 for(const f of Object.values(ch.features))assert.equal(f.value,'paid');assert.match(ch.free_tier_limits,/30 天/);assert.match(h.free_tier_limits,/非 root Android/);assert.match(h.free_tier_limits,/iOS 需手动/);assert.match(pr.price_summary,/一年更新/);assert.match(c.notes,/修改服务器数据/);
});
test('HTTP category Chinese strings have English translations',()=>{const strings=v=>typeof v==='string'?[v]:v&&typeof v==='object'?Object.values(v).flatMap(strings):[];for(const s of strings(c).filter(s=>/[\u4e00-\u9fff]/.test(s)))assert(en[s],s);});
