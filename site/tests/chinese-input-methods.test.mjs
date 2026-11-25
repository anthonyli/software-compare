import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => fs.readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const data = JSON.parse(read('categories/chinese-input-methods.json'));
const en = JSON.parse(read('site/src/i18n/content-en.json'));
const [wechat, rime, sogou] = data.products;
const keys = ['zhime_basic','zhime_local','zhime_schemes','zhime_voice','zhime_cloud','zhime_sync'];

test('Chinese typing, local processing, speech and AI stay separate across products and platforms', () => {
  assert.deepEqual(data.features.map(f => f.key), keys);
  assert.deepEqual(data.products.map(p => p.id), ['wechat-keyboard','rime','sogou-input-method']);
  assert.deepEqual(data.products.map(p => keys.map(k => p.features[k].value)), [
    ['yes','yes','partial','yes','yes','yes'],
    ['yes','yes','yes','no','no','partial'],
    ['yes','partial','partial','yes','yes','yes'],
  ]);
  for (const p of data.products) {
    assert.deepEqual(Object.keys(p.features), keys);
    assert(p.sources.length >= 5);
  }
  assert.match(data.notes, /不是切换已有键盘.*基础文字输入、本机离线语音、联网联想与生成式 AI/);
  assert.match(wechat.features.zhime_local.note, /基础输入内容留在本机.*故障反馈有例外/);
  assert.match(wechat.features.zhime_voice.note, /中国大陆 iOS App Store.*3\.4\.1.*离线语音.*联网转写会上传语音.*不代表其他平台、所有语言或 AI 录音笔也支持离线/);
  assert.match(wechat.features.zhime_cloud.note, /部分输入与城市归属地会上传/);
  assert.match(wechat.features.zhime_sync.note, /本机剪贴板.*跨设备.*数据上传/);
  assert.match(rime.features.zhime_sync.note, /不是内置 Rime 托管同步.*外部同步工具处理/);
  assert.match(rime.features.zhime_voice.note, /librime 核心和官方桌面.*不评估手机版或第三方/);
  assert.match(sogou.features.zhime_voice.note, /Android FAQ.*限普通话转文字.*不含别的语种或翻译.*iOS/);
  assert.match(sogou.features.zhime_cloud.note, /iOS 部分扩展要求完全访问.*2026-11-25 生效.*不要外推/);
});

test('frontends, store releases and prices retain their independent scope', () => {
  assert.deepEqual(data.products.map(p => [p.open_source,p.license,p.latest_release,p.latest_release_date]), [
    [false,'专有许可',null,null],
    [true,'BSD-3-Clause','librime 1.17.0','2026-06-06'],
    [false,'专有许可',null,null],
  ]);
  assert.match(wechat.free_tier_limits, /2026-11-10.*Android 为 2026-11-11.*3\.0\.2.*3\.0\.3\.8.*不是移动版/);
  assert.match(rime.free_tier_limits, /引擎发布版本.*0\.17\.4.*1\.1\.2.*各自维护的社区前端/);
  assert.match(rime.price_summary, /BSD-3-Clause 指 librime 核心.*许可需分别核对/);
  assert.match(sogou.free_tier_limits, /20\.20\.0.*16\.10.*6\.25\.3.*Linux 有独立官方入口/);
  assert.deepEqual(sogou.prices.map(p=>[p.price,p.currency,p.period]), [['31','CNY','month']]);
  assert.match(sogou.price_summary, /中国大陆 iOS.*连续包月.*不代表 Android、桌面端或其他地区/);
});

test('localized office page keeps OCR and input source switching available as distinct categories', () => {
  const strings = v => typeof v === 'string' ? [v] : v && typeof v === 'object' ? Object.values(v).flatMap(strings) : [];
  for (const s of strings(data).filter(s => /[\u4e00-\u9fff]/.test(s))) {
    assert.equal(typeof en[s], 'string', s);
    assert.doesNotMatch(en[s], /[\u4e00-\u9fff]/, s);
  }
  assert.match(read('site/src/config.ts'), /"quick-translation-ocr".*"input-source-switchers".*"chinese-input-methods"/);
  assert.match(read('site/src/i18n/labels.ts'), /"chinese-input-methods": \{ zh: "中文输入法", en: "Chinese input methods" \}/);
  assert.match(read('site/src/pages/c/[slug].astro'), /category.slug === "chinese-input-methods".*data-chinese-ime-notes.*tr\(category.notes\)/);
  assert.match(read('site/public/categories/chinese-input-methods.svg'), /viewBox="0 0 480 260"/);
});
