import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read = (path) => fs.readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const c = JSON.parse(read('categories/webpage-archiving.json'));
const en = JSON.parse(read('site/src/i18n/content-en.json'));

test('webpage archiving separates raw page packaging from rendered capture and file formats', () => {
  assert.deepEqual(c.products.map(({ id }) => id), ['monolith', 'singlefile']);
  const [m, s] = c.products;
  assert.equal(m.license, 'CC0-1.0');
  assert.equal(m.latest_release, 'v2.12.0');
  assert.equal(m.latest_release_date, '2026-11-02');
  assert.deepEqual(m.platforms, ['Windows', 'macOS', 'Linux']);
  assert.equal(m.features.rendered_capture.value, 'partial');
  assert.match(m.features.rendered_capture.note, /自身不执行 JavaScript.*外部浏览器/);
  assert.match(m.features.mhtml.note, /读取.*MHTML.*输出 MHTML/);
  assert.match(m.features.single_html.note, /存档时不执行网页脚本.*打开时仍可能按浏览器策略运行/);
  assert.match(m.free_tier_limits, /桌面 GUI 与 CLI.*Homebrew.*命令行.*不等于已装 GUI/);
  assert.equal(s.license, 'AGPL-3.0');
  assert.equal(s.latest_release, 'v1.40.0');
  assert.equal(s.latest_release_date, '2026-11-21');
  assert.equal(s.features.rendered_capture.value, 'yes');
  assert.equal(s.features.mhtml.value, 'unknown');
  assert.match(s.features.cli.note, /独立 SingleFile CLI/);
  assert.match(s.features.local_save.note, /本地.*未缓存资源/);
});

test('webpage archiving has bilingual copy, directory grouping, and a cover', () => {
  const strings = (v) => typeof v === 'string' ? [v] : v && typeof v === 'object' ? Object.values(v).flatMap(strings) : [];
  for (const item of strings(c).filter((s) => /[\u4e00-\u9fff]/.test(s))) assert(en[item], item);
  assert.match(read('site/src/config.ts'), /"archivers", "downloaders", "file-sync", "webpage-archiving"/);
  assert.match(read('site/src/i18n/labels.ts'), /"webpage-archiving": \{ zh: "网页离线存档", en: "Offline webpage archiving" \}/);
  assert.match(read('site/public/categories/webpage-archiving.svg'), /viewBox="0 0 480 260"/);
});
