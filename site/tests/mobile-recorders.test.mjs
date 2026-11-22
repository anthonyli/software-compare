import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const c=JSON.parse(fs.readFileSync(new URL('../../categories/audio-recorders.json',import.meta.url)));const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url)));
test('mobile recorders distinguish capture, cloud and license scope',()=>{for(const id of ['just-press-record','dolby-on']){const p=c.products.find(x=>x.id===id);assert(p);assert.equal(p.open_source,false);for(const k of ['license','pricing_model','summary','price_summary','free_tier_limits'])assert(en[p[k]]);}const j=c.products.find(x=>x.id==='just-press-record'),d=c.products.find(x=>x.id==='dolby-on');assert.equal(j.features.app_audio.value,'no');assert.equal(d.features.app_audio.value,'unknown');assert.equal(d.features.broadcast.value,'yes');assert.match(d.free_tier_limits,/个人使用/);});

test('Riverside separates cloud recording, disputed free offers and scoped screen-share audio',()=>{
 const p=c.products.find(p=>p.id==='riverside');assert(p);assert.equal(p.open_source,false);
 assert.deepEqual(p.platforms,['Web','macOS','iOS','Android']);assert.deepEqual(p.prices,[]);
 assert.deepEqual(Object.values(p.features).map(f=>f.value),['yes','partial','partial','paid']);
 assert.match(p.summary,/各自设备.*逐步上传.*不是纯离线/);
 assert.match(p.price_summary,/官方套餐资料互相矛盾.*信用卡.*14 天试用.*取消.*付费订阅/);
 assert.match(p.free_tier_limits,/不限时单轨.*一次性 2 小时分轨.*水印.*长期免费档已取消.*尚未确认.*按场次.*不按人数.*不是普通录制/);
 assert.match(p.features.microphone.note,/Chrome、Edge.*Safari.*18[.]2.*macOS 15.*Apple Silicon.*iOS 或 Android/);
 assert.match(p.features.app_audio.note,/标签页声音.*不是独立录制任意应用.*Mac 桌面应用不支持/);
 assert.match(p.features.system_audio.note,/Windows 浏览器.*整个屏幕.*Mac 网页端限指定标签页/);
 assert.match(p.features.broadcast.note,/Grow、Webinar 和 Business.*主持人与内部制作人.*移动端由主持人/);
 const source=fs.readFileSync(new URL('../src/lib/display.ts',import.meta.url),'utf8');
 const leak=source.slice(source.indexOf('const LEAK ='),source.indexOf('export const PRICE_CAVEAT'));
 const fn=source.slice(source.indexOf('export function cleanPublicText'),source.indexOf('export function parseCurrency')).replace('export function','function').replace('(input: string | null | undefined): string','(input)');
 const clean=new Function(leak+fn+';return cleanPublicText;')();
 for(const raw of [p.summary,p.pricing_model,p.price_summary,p.free_tier_limits,...Object.values(p.features).map(f=>f.note)]){const key=clean(raw);assert(key);assert(en[key],key);assert.doesNotMatch(en[key],/[\u4e00-\u9fff]/);}
});

test('SonoBus distinguishes received tracks, unencrypted P2P and public broadcast routing',()=>{
 const p=c.products.find(p=>p.id==='sonobus');assert(p);assert.equal(p.open_source,true);
 assert.deepEqual(p.platforms,['Windows','macOS','Linux','iOS','Android']);
 assert.equal(p.pricing_model,'免费开源');assert.match(p.license,/GPL-3[.]0.*应用商店分发例外/);assert.deepEqual(p.prices,[]);
 assert.deepEqual(Object.values(p.features).map(f=>f.value),['yes','partial','unknown','partial']);
 assert.match(p.summary,/接收端.*参与者的音频流.*不同于每人本地保留并上传/);
 assert.match(p.free_tier_limits,/连接服务器.*直传且不加密.*组密码不等于加密.*1[.]7[.]2.*2023-12-11.*不代表 Linux 或手机商店版本相同/);
 assert.match(p.features.microphone.note,/完整混音、自身和每位已连接用户.*接收的音频流/);
 assert.match(p.features.app_audio.note,/DAW 或 OBS.*不等于直接选择并录制任意应用/);
 assert.match(p.features.system_audio.note,/未核实内置全部系统声音录制/);
 assert.match(p.features.broadcast.note,/不是直接推送到公开直播平台.*OBS 插件/);
 const source=fs.readFileSync(new URL('../src/lib/display.ts',import.meta.url),'utf8');
 const leak=source.slice(source.indexOf('const LEAK ='),source.indexOf('export const PRICE_CAVEAT'));
 const fn=source.slice(source.indexOf('export function cleanPublicText'),source.indexOf('export function parseCurrency')).replace('export function','function').replace('(input: string | null | undefined): string','(input)');
 const clean=new Function(leak+fn+';return cleanPublicText;')();
 for(const raw of [p.summary,p.license,p.pricing_model,p.price_summary,p.free_tier_limits,...Object.values(p.features).map(f=>f.note)]){const key=clean(raw);assert(key);assert(en[key],key);assert.doesNotMatch(en[key],/[\u4e00-\u9fff]/);}
});
