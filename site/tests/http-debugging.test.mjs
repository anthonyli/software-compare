import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(new URL('../../'+p,import.meta.url),'utf8'));const c=read('categories/http-debugging.json'),en=read('site/src/i18n/content-en.json');
test('HTTP debugging keeps five identities and sourced subscription boundaries',()=>{
 assert.deepEqual(c.products.map(p=>p.id),['mitmproxy','charles','proxyman','http-toolkit','fiddler-everywhere']);
 for(const p of c.products){assert.deepEqual(Object.keys(p.features),c.features.map(f=>f.key));assert.deepEqual(p.platforms,['Windows','macOS','Linux']);assert.equal(p.collected_at,p.id==='fiddler-everywhere'?'2026-11-25':'2026-11-19');assert(p.sources.length>=4);for(const k of ['github_stars','latest_release','latest_release_date','maintenance_status'])assert.equal(p[k],null);}
 const [m,ch,pr,h]=c.products;assert.equal(m.license,'MIT');assert.equal(m.open_source,true);assert.equal(ch.open_source,false);assert.equal(pr.open_source,false);assert.equal(h.open_source,true);
 assert.equal(h.features.https_inspect.value,'yes');assert.equal(h.features.manual_edit.value,'yes');for(const k of ['request_replay','response_mock'])assert.equal(h.features[k].value,'paid');
 for(const f of Object.values(ch.features))assert.equal(f.value,'paid');assert.match(ch.free_tier_limits,/30 天/);assert.match(h.free_tier_limits,/非 root Android/);assert.match(h.free_tier_limits,/iOS 需手动/);assert.match(pr.price_summary,/一年更新/);assert.match(c.notes,/修改服务器数据/);
});
test('HTTP category Chinese strings have English translations',()=>{const strings=v=>typeof v==='string'?[v]:v&&typeof v==='object'?Object.values(v).flatMap(strings):[];for(const s of strings(c).filter(s=>/[\u4e00-\u9fff]/.test(s)))assert(en[s],s);});

test('Fiddler Everywhere distinguishes trial, Classic, Lite and Pro',()=>{
 const p=c.products.find(p=>p.id==='fiddler-everywhere');
 assert.match(p.price_summary,/10 天试用，不是长期免费.*Lite 月付 USD 10.*Pro 月付 USD 19/);
 assert.match(p.free_tier_limits,/远程设备需 Pro.*Classic 仅 Windows/);
 assert.match(p.features.request_replay.note,/Lite 已含重放/);
 assert.match(p.features.manual_edit.note,/从 Pro 起，Lite 不含/);
 assert.match(p.features.response_mock.note,/从 Pro 起，Lite 不含/);
});
