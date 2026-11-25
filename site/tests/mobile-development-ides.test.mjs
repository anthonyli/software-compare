import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(new URL('../../'+p,import.meta.url),'utf8'));const c=read('categories/mobile-development-ides.json'),en=read('site/src/i18n/content-en.json');
test('Mobile IDEs distinguish hosts, targets, simulation and service entitlements',()=>{
 const [a,x]=c.products;assert.deepEqual(c.products.map(p=>p.id),['android-studio','xcode','jetbrains-rider','visual-studio-2026']);assert.deepEqual(a.platforms,['Windows','macOS','Linux','ChromeOS']);assert.deepEqual(x.platforms,['macOS']);
 assert.equal(a.features.virtual_device.value,'partial');assert.equal(x.features.virtual_device.value,'yes');assert.equal(a.open_source,true);assert.equal(x.open_source,false);assert.match(a.free_tier_limits,/ChromeOS/);assert.match(a.free_tier_limits,/SDK/);assert.match(x.price_summary,/付费开发者计划/);assert.match(c.notes,/电脑系统/);
 for(const p of c.products){assert.deepEqual(Object.keys(p.features),c.features.map(f=>f.key));assert(p.sources.length>=5);for(const k of ['github_stars','latest_release','latest_release_date','maintenance_status'])assert.equal(p[k],null);}
});
test('Mobile IDE Chinese strings have English translations',()=>{const strings=v=>typeof v==='string'?[v]:v&&typeof v==='object'?Object.values(v).flatMap(strings):[];for(const s of strings(c).filter(s=>/[\u4e00-\u9fff]/.test(s)))assert(en[s],s);});

test('Rider keeps MAUI targets, XAML preview and non-commercial licensing separate',()=>{
 const rider=c.products.find(p=>p.id==='jetbrains-rider');
 assert.deepEqual(rider.platforms,['Windows','macOS','Linux']);
 assert.equal(rider.open_source,false);
 assert.match(rider.free_tier_limits,/iOS 本地运行需要 Mac 和 Xcode/);
 assert.match(rider.price_summary,/个人非商业用途免费，商用需购买订阅/);
 assert.equal(rider.features.ui_preview.value,'no');
 assert.match(rider.features.ui_preview.note,/Hot Reload.*运行中/);
 assert.equal(rider.features.profiling.value,'partial');
 assert.match(rider.features.profiling.note,/桌面 Mac Catalyst.*未核实等价的移动端/);
});

test('Visual Studio MAUI keeps ARM emulator and Mac host requirements visible', () => {
 const p=c.products.find(row=>row.id==='visual-studio-2026');
 assert.deepEqual(p.platforms,['Windows']);
 assert.match(p.free_tier_limits,/最多 5 人.*需要 Mac.*Xcode/);
 assert.match(p.features.virtual_device.note,/Windows on Arm 不支持 Android 模拟器/);
 assert.equal(p.features.ui_preview.value,'partial');
 assert.match(p.features.profiling.note,/dotnet-trace.*不把外部命令行/);
});
