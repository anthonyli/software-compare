import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => fs.readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const data = JSON.parse(read('categories/quick-translation-ocr.json'));
const en = JSON.parse(read('site/src/i18n/content-en.json'));
const keys = ['quicktranslate_selection', 'quicktranslate_screen', 'quicktranslate_offline_ocr', 'quicktranslate_offline', 'quicktranslate_engines', 'quicktranslate_provider_keys'];
const [bob, easydict, deepl] = data.products;

test('screenshot OCR, translation and provider credentials are separate capabilities', () => {
  assert.deepEqual(data.features.map(({ key }) => key), keys);
  assert.deepEqual(data.products.map(({ id }) => id), ['bob', 'easydict', 'deepl-desktop']);
  assert.deepEqual(data.products.map(p => keys.map(k => p.features[k].value)), [
    ['yes','yes','yes','partial','yes','yes'],
    ['yes','yes','yes','partial','yes','yes'],
    ['yes','yes','unknown','no','no','no'],
  ]);
  for (const product of data.products) {
    assert.deepEqual(Object.keys(product.features), keys);
    assert(product.sources.length >= 6);
  }
  assert.match(data.notes, /本地 OCR 不代表下一步翻译也离线/);
  assert.match(bob.features.quicktranslate_screen.note, /图片发给识别服务商.*文字发给相应翻译服务商.*插件不在该政策范围/);
  assert.match(bob.features.quicktranslate_provider_keys.note, /密钥保存在本机.*另行计费/);
  assert.match(easydict.features.quicktranslate_screen.note, /识别后的文字.*多个已启用的联网查询服务.*有道云 OCR 回退.*原图/);
  assert.match(easydict.features.quicktranslate_offline.note, /macOS 15\+.*先下载/);
  assert.match(deepl.features.quicktranslate_selection.note, /普通复制不会/);
  assert.match(deepl.free_tier_limits, /免费条款不允许提交机密或个人数据/);
});

test('app releases, OS limits and prices stay tied to channel and region', () => {
  assert.deepEqual(data.products.map(p => [p.platforms,p.open_source,p.license,p.latest_release,p.latest_release_date]), [
    [['macOS'],false,'专有许可','1.22.0',null],
    [['macOS'],true,'GPL-3.0','2.26.0','2026-10-27'],
    [['macOS','Windows'],false,'专有许可',null,null],
  ]);
  assert.deepEqual(bob.prices.map(p => [p.price,p.currency,p.period]), [['58','CNY','once'],['8.99','USD','once']]);
  assert.match(bob.free_tier_limits, /macOS 12\+.*14 天/);
  assert.match(easydict.free_tier_limits, /macOS 13\+.*11\/12.*2\.7\.2/);
  assert.match(easydict.price_summary, /GPL-3\.0.*学习交流/);
  assert.match(deepl.free_tier_limits, /Windows 10 64 位或 macOS 15/);
  assert.match(deepl.price_summary, /德国.*年付.*月均 €7\.49.*DeepL API 单独订阅/);
  assert.deepEqual(deepl.prices.map(p => [p.price,p.currency,p.period]), [['7.49','EUR','month']]);
});

test('translation comparison is covered and localized in the office group', () => {
  const strings = v => typeof v === 'string' ? [v] : v && typeof v === 'object' ? Object.values(v).flatMap(strings) : [];
  for (const s of strings(data).filter(s => /[\u4e00-\u9fff]/.test(s))) {
    assert.equal(typeof en[s], 'string', s);
    assert.doesNotMatch(en[s], /[\u4e00-\u9fff]/, s);
  }
  assert.match(read('site/src/config.ts'), /"screenshot-tools", "quick-translation-ocr", "pdf-tools"/);
  assert.match(read('site/src/i18n/labels.ts'), /"quick-translation-ocr": \{ zh: "快捷翻译与 OCR", en: "Quick translation and OCR" \}/);
  assert.match(read('site/src/pages/c/[slug].astro'), /category.slug === "quick-translation-ocr".*data-quick-translation-notes.*tr\(category.notes\)/);
  assert.match(read('site/public/categories/quick-translation-ocr.svg'), /viewBox="0 0 480 260"/);
});
