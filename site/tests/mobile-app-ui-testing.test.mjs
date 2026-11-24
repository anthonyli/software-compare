import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(new URL('../../'+p,import.meta.url),'utf8'));
const category=read('categories/mobile-app-ui-testing.json');
const en=read('site/src/i18n/content-en.json');
const [appium,maestro]=category.products;

test('Mobile UI testing covers local Android and iOS targets without conflating drivers',()=>{
  assert.deepEqual(category.products.map(p=>p.id),['appium','maestro-cli','detox']);
  for(const p of category.products){
    assert.equal(p.open_source,true);
    assert.equal(p.license,p.id==='detox'?'MIT':'Apache-2.0');
    assert.deepEqual(p.prices,[]);
    assert.deepEqual(Object.keys(p.features),category.features.map(f=>f.key));
    for(const key of ['android_emulator','android_device','ios_simulator']) assert.equal(p.features[key].value,'yes');
  }
  assert.match(appium.features.local_workflow.note,/UiAutomator2 和 XCUITest/);
  assert.equal(appium.features.ios_device.value,'yes');
  assert.match(en[appium.features.ios_device.note],/signed WebDriverAgent.*Windows\/Linux.*iOS 18 or later.*RemoteXPC tunnel.*explicit device and OS version.*preinstalled or externally managed/);
  assert.match(appium.features.ios_device.note,/Windows\/Linux 路径仅支持 iOS 18 及以上真机.*RemoteXPC 隧道/);
  assert.equal(maestro.features.ios_device.value,'no');
  assert.match(en[maestro.features.ios_device.note],/does not support physical iOS devices/);
  assert(maestro.sources.some(url=>url.includes('/cli-2.12.1/')&&url.endsWith('MaestroSessionManager.kt')));
});

test('Mobile UI testing translates all data and keeps WebView limits explicit',()=>{
  const strings=v=>typeof v==='string'?[v]:v&&typeof v==='object'?Object.values(v).flatMap(strings):[];
  for(const s of strings(category).filter(s=>/[\u4e00-\u9fff]/.test(s))) assert(en[s],s);
  assert.equal(appium.features.hybrid_webview.value,'yes');
  assert.match(en[appium.features.hybrid_webview.note],/ChromeDriver.*debuggable WebViews/);
  assert.equal(maestro.features.hybrid_webview.value,'partial');
  assert.match(en[maestro.features.hybrid_webview.note],/Android CLI.*DevTools.*does not imply.*iOS/);
  assert.match(en[category.notes],/Platforms are test hosts.*out of scope/);
});

test('Detox uses a pinned MIT reference and distinguishes gray-box sync and platform support', () => {
  const p = category.products.find(({ id }) => id === 'detox');
  assert(p);
  assert.deepEqual(Object.values(p.features).map(({ value }) => value), ['yes','yes','yes','yes','no','partial','yes']);
  assert.match(en[category.notes], /black-box and gray-box.*Platforms are test hosts/);
  assert.match(p.free_tier_limits, /20\.51\.3.*不代表最新版本.*0\.77\.x.*0\.84\.x.*非 React Native.*Expo 集成由社区维护/);
  assert.match(p.features.local_workflow.note, /JavaScript.*Jest.*构建测试用应用.*等待应用异步工作/);
  assert.match(p.features.android_device.note, /android\.attached.*Android 调试/);
  assert.match(p.features.ios_simulator.note, /ios\.simulator.*macOS 和 Xcode/);
  assert.match(p.features.ios_device.note, /不支持 iOS 真机/);
  assert.match(p.features.hybrid_webview.note, /应用内 WebView.*部分选择器只支持 iOS/);
  assert(p.sources.some((url) => url.endsWith('/blob/20.51.3/LICENSE')));
});
