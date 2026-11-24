import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => fs.readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const data = JSON.parse(read('categories/website-to-desktop.json'));
const en = JSON.parse(read('site/src/i18n/content-en.json'));
const keys = ['webwrap_visual_creation', 'webwrap_cli_creation', 'webwrap_custom_url', 'webwrap_appearance', 'webwrap_standalone_installer', 'webwrap_transfer'];

test('website wrappers distinguish local app windows from distributable installers and signing', () => {
  assert.equal(data.category_slug, 'website-to-desktop');
  assert.match(data.notes, /独立窗口、可分享的配置与可分发安装包是三件事.*不等于网页离线存档/);
  assert.deepEqual(data.features.map(({ key }) => key), keys);
  assert.deepEqual(data.products.map(({ id }) => id), ['pake-cli', 'pake-app', 'webcatalog-desktop', 'unite-pro']);
  assert.deepEqual(data.products.map(p => keys.map(k => p.features[k].value)), [
    ['no','yes','yes','yes','yes','yes'],
    ['yes','no','yes','yes','unknown','yes'],
    ['yes','unknown','paid','partial','unknown','partial'],
    ['yes','unknown','yes','yes','no','paid'],
  ]);
  for (const p of data.products) {
    assert.deepEqual(Object.keys(p.features), keys);
    assert(p.sources.length >= 4);
  }
  const [cli, app, webcatalog, unite] = data.products;
  assert.match(cli.features.webwrap_standalone_installer.note, /DMG.*MSI.*GPL 例外.*签名和公证需要另核/);
  assert.match(app.features.webwrap_standalone_installer.note, /独立于 Pake.*导出是设置，不是独立安装包/);
  assert.match(app.features.webwrap_transfer.note, /不含 Cookie、登录、许可或本机路径.*消耗应用额度/);
  assert.match(webcatalog.features.webwrap_standalone_installer.note, /已装应用可独立于管理器.*未确认.*交给他人安装的包/);
  assert.match(unite.features.webwrap_standalone_installer.note, /独立应用.*不允许分享给未授权用户/);
  assert.match(unite.features.webwrap_transfer.note, /\.uniteconfig.*有效 Unite Pro 许可/);
});

test('Pake distribution channels retain separate release, licensing, and pricing facts', () => {
  const [cli, app, webcatalog, unite] = data.products;
  assert.deepEqual(data.products.map(p => [p.open_source,p.license,p.latest_release,p.latest_release_date]), [
    [true,'GPL-3.0-or-later','V3.21.0','2026-11-23'],
    [false,'专有许可','1.11.0','2026-11-23'],
    [false,'专有许可',null,null],
    [false,'专有许可','1.8.2','2026-11-17'],
  ]);
  assert.match(cli.free_tier_limits, /Node\.js 22\.12\+.*不等于已签名或公证/);
  assert(cli.sources.some(s => s.endsWith('/LICENSE-EXCEPTION')));
  assert.match(app.price_summary, /免费制作 2 个应用.*US\$19.*合计 3 台/);
  assert.match(app.free_tier_limits, /7 天是购买退款窗口，不是免费的时间上限/);
  assert.deepEqual(app.prices.map(p => [p.price,p.period]), [['19','once']]);
  assert.match(webcatalog.free_tier_limits, /2 个桌面应用、2 个账号配置和 1 个空间.*Pro.*7 天试用.*未核实绑卡或续订/);
  assert.match(unite.free_tier_limits, /macOS 15.*“为 macOS 26 构建”不等于最低要求/);
  assert.deepEqual(unite.prices.map(p => [p.price,p.period]), [['39.99','once']]);
});

test('wrapper route, comparative dimensions and cover are localized in the developer group', () => {
  const strings = v => typeof v === 'string' ? [v] : v && typeof v === 'object' ? Object.values(v).flatMap(strings) : [];
  for (const s of strings(data).filter(s => /[\u4e00-\u9fff]/.test(s))) {
    assert.equal(typeof en[s], 'string', s);
    assert.doesNotMatch(en[s], /[\u4e00-\u9fff]/, s);
  }
  assert.match(read('site/src/config.ts'), /"desktop-virtual-machines", "website-to-desktop"/);
  assert.match(read('site/src/i18n/labels.ts'), /"website-to-desktop": \{ zh: "网页封装桌面应用", en: "Website-to-desktop apps" \}/);
  assert.match(read('site/public/categories/website-to-desktop.svg'), /viewBox="0 0 480 260"/);
});
