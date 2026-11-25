import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => fs.readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const data = JSON.parse(read('categories/menu-bar-calendars.json'));
const en = JSON.parse(read('site/src/i18n/content-en.json'));
const [top, itsycal, dato, calendar366] = data.products;
const keys = ['mbcal_clock','mbcal_agenda','mbcal_create','mbcal_meeting','mbcal_world','mbcal_reminders'];

test('calendar integration, clock, meetings and Reminders are separate features', () => {
  assert.deepEqual(data.features.map(f => f.key), keys);
  assert.deepEqual(data.products.map(p => p.id), ['top-calendar','itsycal','dato','calendar-366']);
  assert.deepEqual(data.products.map(p => keys.map(k => p.features[k].value)), [
    ['yes','yes','yes','yes','unknown','unknown'],
    ['yes','yes','yes','yes','unknown','yes'],
    ['yes','yes','yes','yes','yes','yes'],
    ['partial','yes','yes','yes','unknown','yes'],
  ]);
  for (const p of data.products) {
    assert.deepEqual(Object.keys(p.features), keys);
    assert.deepEqual(p.platforms, p === calendar366 ? ['macOS','iOS','iPadOS','watchOS'] : ['macOS']);
    assert(p.sources.length >= 3);
  }
  assert.match(data.notes, /不是自己提供同步账号.*权限或联网边界.*不包含 Finder/);
  assert.match(top.features.mbcal_agenda.note, /macOS 日历.*同步仍在系统日历侧/);
  assert.match(top.features.mbcal_create.note, /可写入范围由日历权限和账号决定/);
  assert.match(top.features.mbcal_meeting.note, /未验证服务列表/);
  assert.match(itsycal.features.mbcal_reminders.note, /查看与完成系统提醒事项/);
  assert.match(dato.features.mbcal_meeting.note, /所选日历.*全屏会议提醒/);
  assert.match(dato.features.mbcal_world.note, /城市搜索可离线.*不代表会议也离线/);
});

test('current and legacy macOS downloads and publisher privacy claims stay scoped', () => {
  assert.deepEqual(data.products.map(p => [p.license,p.latest_release,p.latest_release_date]), [
    ['专有许可','4.5','2026-11-06'],
    ['MIT','0.29.0',null],
    ['专有许可','5.8.4','2026-11-05'],
    ['专有许可',null,null],
  ]);
  const prices = p => p.prices.map(x => [x.price,x.currency,x.period]);
  assert.deepEqual(prices(top), [['18','CNY','once'],['2.99','USD','once']]);
  assert.deepEqual(prices(dato), [['18','USD','once']]);
  assert.match(top.price_summary, /中国大陆.*¥18、美国.*US\$2\.99.*一次性.*旧版/);
  assert.match(top.free_tier_limits, /macOS 26\.6\+.*适配 macOS 27.*开发者披露.*EventKit.*未实测/);
  assert.match(itsycal.free_tier_limits, /0\.29\.0.*macOS 27\+.*0\.15\.15 给 macOS 11\+.*Sparkle/);
  assert.match(dato.price_summary, /US\$18 一次性.*每 12 小时提醒购买.*Setapp/);
  assert.match(dato.free_tier_limits, /macOS 26\+.*不收集个人信息.*崩溃会向 Sentry 发送技术报告/);
});

test('office calendar category and its cover are localized without changing adjacent catalog entries', () => {
  const strings = v => typeof v === 'string' ? [v] : v && typeof v === 'object' ? Object.values(v).flatMap(strings) : [];
  for (const s of strings(data).filter(s => /[\u4e00-\u9fff]/.test(s))) {
    assert.equal(typeof en[s], 'string', s);
    assert.doesNotMatch(en[s], /[\u4e00-\u9fff]/, s);
  }
  const config=read('site/src/config.ts');
  assert.match(config, /"quick-translation-ocr".*"chinese-input-methods".*"rss-readers", "menu-bar-calendars"/);
  assert.match(config, /id: "media",[\s\S]*?slugs: \["screen-recorders"[^\]]*"music-streaming"/);
  assert.match(read('site/src/i18n/labels.ts'), /"menu-bar-calendars": \{ zh: "菜单栏日历", en: "Menu-bar calendars" \}/);
  assert.match(read('site/src/pages/c/[slug].astro'), /category.slug === "menu-bar-calendars".*data-menu-bar-calendar-notes.*tr\(category.notes\)/);
  assert.match(read('site/public/categories/menu-bar-calendars.svg'), /viewBox="0 0 480 260"/);
});

test('Calendar 366 keeps current pricing, legacy downloads and event time zones distinct', () => {
  assert.match(calendar366.free_tier_limits, /macOS 14\.6.*旧版 Calendar 366 II/);
  assert.match(calendar366.price_summary, /免费.*7 天.*美国 Mac App Store/);
  assert.deepEqual(calendar366.prices.map(p => [p.price, p.currency, p.period]), [['19.99','USD','year'],['49.99','USD','once']]);
  assert.match(calendar366.features.mbcal_clock.note, /部分图标样式需 Pro.*未确认能替代系统时钟/);
  assert.match(calendar366.features.mbcal_world.note, /日程时区.*未确认同时/);
  assert.match(calendar366.features.mbcal_reminders.note, /需授予 macOS/);
});
