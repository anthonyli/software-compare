import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => fs.readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const data = JSON.parse(read('categories/terminal-emulators.json'));
const en = JSON.parse(read('site/src/i18n/content-en.json'));
const features = ['terminal_tabs_splits', 'terminal_fonts_themes', 'terminal_gpu', 'terminal_lua'];

test('terminal emulators compare desktop apps, not libraries, AI agents, or frameworks', () => {
  assert.equal(data.category_slug, 'terminal-emulators');
  assert.match(data.notes, /不是终端界面开发框架或 AI 编程工具/);
  assert.match(data.notes, /不代表跨工具的速度或内存排名/);
  assert.deepEqual(data.features.map(({ key }) => key), features);
  const expected = [
    ['kaku', ['macOS'], 'V0.30.0', '2026-11-16', 'yes'],
    ['ghostty', ['macOS', 'Linux', 'FreeBSD'], '1.4.0', '2026-10-27', 'no'],
    ['wezterm', ['macOS', 'Linux', 'Windows', 'FreeBSD', 'NetBSD'], '20240203-110809-5046fc22', '2024-02-04', 'yes'],
  ];
  assert.deepEqual(data.products.map(p => [p.id, p.platforms, p.latest_release, p.latest_release_date, p.features.terminal_lua.value]), expected);
  for (const p of data.products) {
    assert.equal(p.license, 'MIT');
    assert.equal(p.open_source, true);
    assert.equal(p.pricing_model, '免费开源');
    assert(p.sources.some(source => /\/LICENSE(?:\.md)?$/.test(source)));
    assert.deepEqual(Object.keys(p.features), features);
    assert(features.slice(0, 3).every(key => p.features[key].value === 'yes'));
  }
  const [kaku, ghostty, wezterm] = data.products;
  assert.match(kaku.free_tier_limits, /通用包.*服务费用另计.*依赖运行 Kaku 的 Mac/);
  assert.match(ghostty.free_tier_limits, /FreeBSD 支持 GTK 图形端但不提供项目预编译包.*libghostty 库，不是官方 Ghostty 图形终端/);
  assert.match(wezterm.free_tier_limits, /最新正式版.*另提供 nightly/);
});

test('terminal emulator copy and category wiring are bilingual and distinct from TUI', () => {
  const strings = (v) => typeof v === 'string' ? [v] : v && typeof v === 'object' ? Object.values(v).flatMap(strings) : [];
  for (const s of strings(data).filter(s => /[\u4e00-\u9fff]/.test(s))) {
    assert.equal(typeof en[s], 'string', s);
    assert.doesNotMatch(en[s], /[\u4e00-\u9fff]/, s);
  }
  assert.match(read('site/src/config.ts'), /"cli-frameworks", "tui-frameworks", "terminal-emulators"/);
  assert.match(read('site/src/i18n/labels.ts'), /"terminal-emulators": \{ zh: "终端模拟器", en: "Terminal emulators" \}/);
  assert.match(read('site/public/categories/terminal-emulators.svg'), /viewBox="0 0 480 260"/);
});
