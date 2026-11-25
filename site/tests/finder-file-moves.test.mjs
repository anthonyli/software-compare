import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => fs.readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const data = JSON.parse(read('categories/finder-file-moves.json'));
const en = JSON.parse(read('site/src/i18n/content-en.json'));
const [command, finder] = data.products;
const keys = ['findermove_selection','findermove_cutpaste','findermove_wait','findermove_no_permission'];

test('keyboard gestures differ but Finder performs both moves after a destination action', () => {
  assert.deepEqual(data.features.map(f => f.key), keys);
  assert.deepEqual(data.products.map(p => p.id), ['command-x','finder-native']);
  assert.deepEqual(data.products.map(p => keys.map(k => p.features[k].value)), [
    ['yes','yes','yes','no'],
    ['yes','no','yes','yes'],
  ]);
  for (const p of data.products) assert.deepEqual(Object.keys(p.features), keys);
  assert.match(data.notes, /Command X 改的是快捷键手势，实际移动仍由 Finder 执行/);
  assert.match(command.features.findermove_cutpaste.note, /⌘X.*进入目标文件夹后按 ⌘V/);
  assert.match(command.features.findermove_wait.note, /没有在目标处粘贴，文件仍在原位/);
  assert.match(finder.features.findermove_selection.note, /⌘C.*选中的项目.*目标文件夹后 ⌥⌘V.*从原位置移到当前位置/);
  assert.match(finder.features.findermove_wait.note, /普通 ⌘V.*粘贴副本/);
});

test('region prices, legacy builds, accessibility and crash reports are not hidden', () => {
  assert.deepEqual(command.prices.map(x => [x.price,x.currency,x.period]), [['28','CNY','once'],['4','USD','once']]);
  assert.deepEqual([command.latest_release,command.latest_release_date], ['1.7.2','2026-11-14']);
  assert.match(command.price_summary, /中国大陆.*¥28、美国.*US\$4.*一次性.*1\.6\.2.*1\.4\.7.*1\.3\.1/);
  assert.match(command.free_tier_limits, /macOS 26\+.*崩溃时会向 Sentry.*文件名编辑和搜索框中 ⌘X 不能剪切文本/);
  assert.match(command.features.findermove_no_permission.note, /辅助功能.*Device Control and Data Access.*未验证/);
  assert.equal(finder.pricing_model,'系统内置');
  assert.equal(finder.latest_release,null);
  assert.deepEqual(finder.prices,[]);
  assert(finder.sources.includes('https://support.apple.com/en-us/102650'));
});

test('new file-tools route is bilingual and leaves the calendar category as a separate route', () => {
  const strings = v => typeof v === 'string' ? [v] : v && typeof v === 'object' ? Object.values(v).flatMap(strings) : [];
  for (const s of strings(data).filter(s => /[\u4e00-\u9fff]/.test(s))) {
    assert.equal(typeof en[s], 'string', s);
    assert.doesNotMatch(en[s], /[\u4e00-\u9fff]/, s);
  }
  const config=read('site/src/config.ts');
  assert.match(config, /"rss-readers", "menu-bar-calendars"/);
  assert.match(config, /id: "files",[\s\S]*?slugs: \["archivers"[^\]]*"finder-file-moves"/);
  assert.match(read('site/src/i18n/labels.ts'), /"finder-file-moves": \{ zh: "Finder 文件移动快捷键", en: "Finder file move shortcuts" \}/);
  assert.match(read('site/src/pages/c/[slug].astro'), /category.slug === "finder-file-moves".*data-finder-file-moves-notes.*tr\(category.notes\)/);
  assert.match(read('site/public/categories/finder-file-moves.svg'), /viewBox="0 0 480 260"/);
});
