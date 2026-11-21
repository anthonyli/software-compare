import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(new URL('../../'+p,import.meta.url),'utf8'));const c=read('categories/mobile-frameworks.json'),en=read('site/src/i18n/content-en.json');
test('Mobile frameworks preserve core vs ecosystem and local toolchain boundaries',()=>{
 const [f,r]=c.products;assert.deepEqual(c.products.map(p=>p.id),['flutter','react-native','compose-multiplatform']);assert.equal(f.license,'BSD-3-Clause');assert.equal(r.license,'MIT');assert.equal(r.github_url,'https://github.com/react/react-native');
 assert.equal(f.features.web_target.value,'yes');assert.equal(r.features.web_target.value,'partial');assert.equal(r.features.desktop_target.value,'partial');assert.match(r.free_tier_limits,/树外项目/);assert.match(r.free_tier_limits,/Xcode\/macOS/);assert.match(f.free_tier_limits,/不是向已发布应用/);assert.match(c.notes,/开发宿主/);
 for(const p of c.products){assert.equal(p.open_source,true);assert.deepEqual(Object.keys(p.features),c.features.map(f=>f.key));assert(p.sources.length>=4);assert(!p.platforms.includes('iOS'));for(const k of ['github_stars','latest_release','latest_release_date','maintenance_status'])assert.equal(p[k],null);}
});
test('Mobile framework Chinese strings have English translations',()=>{const strings=v=>typeof v==='string'?[v]:v&&typeof v==='object'?Object.values(v).flatMap(strings):[];for(const s of strings(c).filter(s=>/[\u4e00-\u9fff]/.test(s)))assert(en[s],s);});
test('Compose Multiplatform separates stable UI targets, web beta and desktop-only hot reload',()=>{
 const p=c.products.find(p=>p.id==='compose-multiplatform');
 assert.equal(p.license,'Apache-2.0');
 assert.equal(p.github_url,'https://github.com/JetBrains/compose-multiplatform');
 assert.equal(p.features.mobile_targets.value,'yes');
 assert.equal(p.features.desktop_target.value,'yes');
 assert.equal(p.features.native_api.value,'yes');
 assert.match(p.features.native_api.note,/平台专属/);
 assert.equal(p.features.web_target.value,'partial');
 assert.match(p.features.web_target.note,/Kotlin\/Wasm.*Beta/);
 assert.equal(p.features.live_refresh.value,'partial');
 assert.match(p.features.live_refresh.note,/桌面 JVM/);
 assert.match(p.free_tier_limits,/macOS 与 Xcode/);
});
