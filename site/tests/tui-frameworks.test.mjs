import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => JSON.parse(fs.readFileSync(new URL('../../' + path, import.meta.url), 'utf8'));
const category = read('categories/tui-frameworks.json');
const translations = read('site/src/i18n/content-en.json');

test('TUI list separates core support from companion packages and backends', () => {
  assert.equal(category.category_slug, 'tui-frameworks');
  assert.match(category.notes, /不是终端模拟器.*命令行参数解析库/);
  const cells = category.features.map(feature => feature.key);
  assert.deepEqual(cells, ['tui_layout', 'tui_widgets', 'tui_input', 'tui_testing', 'tui_web']);
  const expected = [
    ['bubble-tea', ['partial', 'partial', 'yes', 'unknown', 'unknown'], /Go 1\.26/, /v2\.1\.2/],
    ['ratatui', ['yes', 'yes', 'partial', 'yes', 'unknown'], /Rust 1\.88/, /ratatui-v0\.30\.2/],
    ['textual', ['yes', 'yes', 'yes', 'yes', 'partial'], /Python \^3\.9/, /v8\.2\.8/],
    ['terminal-gui', ['yes', 'yes', 'yes', 'yes', 'unknown'], /\.NET 10/, /v2\.6\.0/],
    ['spectre-console', ['yes', 'yes', 'partial', 'yes', 'unknown'], /\.NET 8\.0.*\.NET Standard 2\.0/, /\/0\.57\.2\//],
  ];
  assert.equal(category.products.length, expected.length);
  for (const [i, [id, statuses, runtime, version]] of expected.entries()) {
    const product = category.products[i];
    assert.equal(product.id, id);
    assert.equal(product.open_source, true);
    assert.equal(product.license, 'MIT');
    assert.equal(product.github_stars, null);
    assert.equal(product.latest_release, null);
    assert.match(product.free_tier_limits, runtime);
    assert(product.sources.some(source => version.test(source) && /\/LICENSE(?:\.md)?$/.test(source)));
    assert.deepEqual(Object.keys(product.features), cells);
    assert.deepEqual(cells.map(key => product.features[key].value), statuses);
  }
  const [bubbleTea, ratatui, textual, terminalGui, spectre] = category.products;
  assert.match(bubbleTea.features.tui_widgets.note, /独立 Bubbles/);
  assert.match(ratatui.features.tui_input.note, /后端读取/);
  assert.match(textual.features.tui_web.note, /另启服务/);
  assert.match(terminalGui.features.tui_testing.note, /键鼠输入和捕获绘制缓冲区/);
  assert.match(terminalGui.features.tui_web.note, /未确认浏览器运行/);
  assert.match(spectre.summary, /独立的 Spectre\.Console\.Cli/);
  assert.match(spectre.features.tui_input.note, /方向键.*未确认通用鼠标事件/);
  assert.match(spectre.features.tui_testing.note, /独立 Spectre\.Console\.Testing.*TestConsole/);
});

test('TUI feature labels, notes and product descriptions have English translations', () => {
  const localized = [category.notes, ...category.features.map(feature => feature.label)];
  for (const product of category.products) {
    localized.push(product.summary, product.price_summary, product.free_tier_limits);
    for (const cell of Object.values(product.features)) if (cell.note) localized.push(cell.note);
  }
  for (const key of localized) {
    assert.equal(typeof translations[key], 'string', key);
    assert.doesNotMatch(translations[key], /[\u4e00-\u9fff]/, key);
  }
});
