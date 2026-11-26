import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => fs.readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const data = JSON.parse(read('categories/input-source-switchers.json'));
const en = {
  ...JSON.parse(read('site/src/i18n/content-en.json')),
  ...JSON.parse(read('site/src/i18n/public-content-en.json')),
};
const [pro, lock, holder] = data.products;
const keys = ['inputswitch_app','inputswitch_url','inputswitch_lock','inputswitch_indicator','inputswitch_shortcuts'];

test('context rules, restoring a previous source and continuously locking are separate', () => {
  assert.deepEqual(data.features.map(x => x.key), keys);
  assert.deepEqual(data.products.map(p => p.id), ['input-source-pro','lockime','keyboardholder']);
  assert.deepEqual(data.products.map(p => keys.map(k => p.features[k].value)), [
    ['yes','yes','unknown','yes','yes'],
    ['yes','yes','yes','yes','yes'],
    ['yes','yes','unknown','yes','unknown'],
  ]);
  for (const p of data.products) {
    assert.deepEqual(Object.keys(p.features), keys);
    assert.deepEqual(p.platforms, ['macOS']);
    assert(p.sources.length >= 3);
  }
  assert.match(data.notes, /不提供拼音词库或输入法引擎.*切换一次，不等于.*自动切回/);
  assert.match(pro.features.inputswitch_url.note, /2\.14\.0.*Helium.*Comet.*ego\(lite\).*按应用/);
  assert(pro.sources.some(source => /\/2\.14\.0\/.*\/BrowserURL\.swift$/.test(source)));
  assert.match(lock.features.inputswitch_lock.note, /输入源偏离时切回.*只切换模式保留手动调整/);
  assert.match(lock.features.inputswitch_url.note, /完整网址正则.*顺序匹配/);
  assert.match(holder.features.inputswitch_app.note, /记住每个应用上次输入法/);
  assert.match(holder.features.inputswitch_url.note, /域名匹配.*未核实全部兼容浏览器或完整网址路径/);
});

test('permissions and source claims keep the documented boundary and unknowns', () => {
  assert.deepEqual(data.products.map(p => [p.open_source,p.license,p.latest_release,p.latest_release_date]), [
    [true,'GPL-3.0','2.14.0','2026-10-24'],
    [true,'GPL-3.0','v1.7.2','2026-11-17'],
    [false,'未知','v1.14.16','2026-10-18'],
  ]);
  assert.match(pro.free_tier_limits, /macOS 12\+.*辅助功能和输入监控.*主动提交反馈.*邮箱/);
  assert.match(lock.free_tier_limits, /macOS 14\+.*核心锁定不需额外系统授权.*辅助功能授权.*24 小时.*Sparkle/);
  assert.match(holder.price_summary, /自愿赞助.*未核实应用源码许可证/);
  assert.match(holder.free_tier_limits, /未核实最低 macOS.*未找到现版权限清单或数据留存说明/);
});

test('switchers are covered and localized without dropping the preceding translation category', () => {
  const strings = v => typeof v === 'string' ? [v] : v && typeof v === 'object' ? Object.values(v).flatMap(strings) : [];
  for (const s of strings(data).filter(s => /[\u4e00-\u9fff]/.test(s))) {
    assert.equal(typeof en[s], 'string', s);
    assert.doesNotMatch(en[s], /[\u4e00-\u9fff]/, s);
  }
  const config = read('site/src/config.ts');
  assert.match(config, /"screenshot-tools", "quick-translation-ocr".*"clipboard-managers", "input-source-switchers"/);
  assert.match(read('site/src/i18n/labels.ts'), /"input-source-switchers": \{ zh: "输入源切换工具", en: "Input source switchers" \}/);
  assert.match(read('site/src/pages/c/[slug].astro'), /category.slug === "input-source-switchers".*data-input-switcher-notes.*tr\(category.notes\)/);
  assert.match(read('site/public/categories/input-source-switchers.svg'), /viewBox="0 0 480 260"/);
});
