import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => fs.readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const data = JSON.parse(read('categories/telegram-desktop-clients.json'));
const en = JSON.parse(read('site/src/i18n/content-en.json'));
const [ayu, telegram] = data.products;
const keys = ['tgdesk_cloud','tgdesk_official','tgdesk_retention','tgdesk_export','tgdesk_cloud_e2ee'];

test('desktop local text history is not media retention, export, or end-to-end encryption', () => {
  assert.deepEqual(data.features.map(f => f.key), keys);
  assert.deepEqual(data.products.map(p => p.id), ['ayugram-desktop','telegram-desktop']);
  assert.deepEqual(data.products.map(p => keys.map(k => p.features[k].value)), [
    ['yes','no','yes','unknown','no'],
    ['yes','yes','unknown','yes','no'],
  ]);
  for (const p of data.products) {
    assert.deepEqual(Object.keys(p.features), keys);
    assert.deepEqual(p.platforms, ['macOS','Windows','Linux']);
  }
  assert.match(data.notes, /不包含原生 Telegram for macOS、移动端分支或网页版.*API 条款第 1\.4 节.*不推荐留存或规避/);
  assert.match(ayu.features.tgdesk_retention.note, /已收取的部分文本.*内存和本地数据库.*编辑历史；不含媒体.*不能保证完整历史或从未接收/);
  assert.match(ayu.features.tgdesk_export.note, /不是完整导出.*未核实/);
  assert.match(telegram.features.tgdesk_export.note, /JSON 或 HTML 可包含媒体.*不等同于客户端持续留存/);
  assert.match(telegram.features.tgdesk_cloud_e2ee.note, /客户端与服务器加密，不是端到端加密.*原生 Telegram for macOS.*不是同一桌面应用/);
});

test('tagged binary assets, disabled cask, and baseline distribution stay distinct', () => {
  assert.deepEqual(data.products.map(p => [p.latest_release,p.latest_release_date,p.license]), [
    ['v7.2.9','2026-10-05','GPL-3.0'],
    ['v7.4.6','2026-11-23','GPL-3.0'],
  ]);
  assert.match(ayu.free_tier_limits, /macOS 和 Windows Portable；Linux 按打包方另有渠道.*7\.0\.9 cask.*Gatekeeper.*2026-09-01 停用.*SHA-256 摘要不能证明 Mac 包获公证.*签名、架构、最低系统和运行未验证/);
  assert.match(ayu.price_summary, /上游针对部分代码的 OpenSSL 例外.*本地 Premium 不等于 Telegram 付费订阅.*不能据此保证服务器权益/);
  assert(ayu.sources.includes('https://github.com/AyuGram/AyuGramDesktop/releases/expanded_assets/v7.2.9'));
  assert(ayu.sources.includes('https://formulae.brew.sh/api/cask/ayugram.json'));
  assert(ayu.sources.includes('https://docs.ayugram.one/desktop/saving/'));
  assert.match(telegram.price_summary, /GPLv3 并附 OpenSSL 例外/);
  assert.match(telegram.free_tier_limits, /原生 macOS 版.*不能套用.*Qt 客户端/);
});

test('translation and cover integrate into network tools without changing the AI task catalog', () => {
  const strings = v => typeof v === 'string' ? [v] : v && typeof v === 'object' ? Object.values(v).flatMap(strings) : [];
  for (const s of strings(data).filter(s => /[\u4e00-\u9fff]/.test(s))) {
    assert.equal(typeof en[s], 'string', s);
    assert.doesNotMatch(en[s], /[\u4e00-\u9fff]/, s);
  }
  const config=read('site/src/config.ts');
  assert.match(config, /id: "network".*"http-debugging", "telegram-desktop-clients"/);
  assert.match(config, /id: "ai".*"ai-memory", "personal-ai-assistants"/);
  assert.match(read('site/src/i18n/labels.ts'), /"telegram-desktop-clients": \{ zh: "Telegram 桌面客户端", en: "Telegram desktop clients" \}/);
  assert.match(read('site/src/pages/c/[slug].astro'), /category.slug === "telegram-desktop-clients".*data-telegram-desktop-notes.*tr\(category.notes\)/);
  assert.match(read('site/public/categories/telegram-desktop-clients.svg'), /viewBox="0 0 480 260"/);
});
