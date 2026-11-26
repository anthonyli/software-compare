import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => fs.readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const data = JSON.parse(read('categories/rss-readers.json'));
const en = JSON.parse(read('site/src/i18n/content-en.json'));
const [nnw, fluent, fresh, guard, miniflux, newsflash, capy, newsboat] = data.products;
const keys = ['rss_direct','rss_opml','rss_offline','rss_sync','rss_fulltext','rss_selfhost'];

test('client subscriptions, downloaded content, web extraction and self-hosted aggregation are separate', () => {
  assert.deepEqual(data.features.map(f => f.key), keys);
  assert.deepEqual(data.products.map(p => p.id), ['netnewswire','fluent-reader','freshrss','rss-guard','miniflux','newsflash','capy-reader','newsboat']);
  assert.deepEqual(data.products.map(p => keys.map(k => p.features[k].value)), [
    ['yes','yes','partial','yes','yes','no'],
    ['yes','yes','partial','yes','yes','no'],
    ['no','yes','no','yes','yes','yes'],
    ['yes','yes','partial','yes','yes','no'],
    ['no','yes','no','yes','yes','yes'],
    ['yes','yes','partial','yes','yes','no'],
    ['yes','yes','partial','yes','yes','no'],
    ['yes','yes','partial','yes','no','no'],
  ]);
  for (const p of data.products) assert.deepEqual(Object.keys(p.features), keys);
  assert.match(data.notes, /无需同步账号不等于无需联网.*不比较音乐串流/);
  assert.match(nnw.features.rss_offline.note, /本机账号.*未下载.*刷新订阅源仍需网络/);
  assert.match(nnw.features.rss_fulltext.note, /Feedbin 托管的服务器.*与选择 Feedbin 同步账号是两件事/);
  assert.match(nnw.features.rss_direct.note, /不收集应用使用统计.*可选择提交崩溃日志.*第三方.*分析/);
  assert.match(fluent.features.rss_fulltext.note, /Mercury Parser.*不能保证/);
  assert.match(fresh.features.rss_fulltext.note, /CSS 选择器.*自己的服务器/);
  assert.match(fresh.features.rss_offline.note, /需要连接自己的 FreshRSS 实例.*第三方客户端/);
});

test('NetNewsWire tagged builds supersede stale Reddit and OS guidance; costs and platforms are scoped', () => {
  assert.deepEqual(data.products.map(p => [p.license,p.latest_release,p.latest_release_date,p.platforms]), [
    ['MIT','7.3.1',null,['macOS','iOS','iPadOS']],
    ['BSD-3-Clause','v1.3.2','2026-10-30',['macOS','Windows','Linux']],
    ['AGPL-3.0','1.31.0','2026-11-23',['Web','Linux']],
    ['GPL-3.0','5.3.0',null,['macOS','Windows','Linux']],
    ['Apache-2.0','2.3.5',null,['Web','Linux']],
    ['GPL-3.0-or-later','6.0.2','2026-11-04',['Linux']],
    ['GPL-3.0-only','2026.11.1217',null,['Android']],
    ['MIT','2.45.1','2026-11-05',['Linux','macOS']],
  ]);
  assert.match(nnw.free_tier_limits, /Mac 7\.3\.1 需 macOS 15\+.*iOS 7\.3\.1（7244）.*iOS\/iPadOS 18\+.*官网却写 iOS 26\+.*两个发布说明.*停止刷新 Reddit/);
  assert(nnw.sources.some(s => s.endsWith('/mac-7.3.1')));
  assert(nnw.sources.some(s => s.endsWith('/iOS-7.3.1-7244')));
  assert(nnw.sources.some(s => s.endsWith('/NetNewsWire_project.xcconfig')));
  assert.match(nnw.price_summary, /应用免费.*所需账号、托管或订阅费用各自计算/);
  assert.match(fluent.free_tier_limits, /不包含另有发布渠道的移动项目/);
  assert.match(fresh.price_summary, /机器、存储与托管费用自理/);
});

test('office group and localized landing preserve the prior three categories', () => {
  const strings = v => typeof v === 'string' ? [v] : v && typeof v === 'object' ? Object.values(v).flatMap(strings) : [];
  for (const s of strings(data).filter(s => /[\u4e00-\u9fff]/.test(s))) {
    assert.equal(typeof en[s], 'string', s);
    assert.doesNotMatch(en[s], /[\u4e00-\u9fff]/, s);
  }
  assert.match(read('site/src/config.ts'), /"quick-translation-ocr".*"input-source-switchers".*"chinese-input-methods".*"rss-readers"/);
  assert.match(read('site/src/i18n/labels.ts'), /"rss-readers": \{ zh: "RSS 阅读器", en: "RSS readers" \}/);
  assert.match(read('site/src/pages/c/[slug].astro'), /category.slug === "rss-readers".*data-rss-reader-notes.*tr\(category.notes\)/);
  assert.match(read('site/public/categories/rss-readers.svg'), /viewBox="0 0 480 260"/);
});

test('RSS Guard distinguishes local reading from service-backed sync and hosting', () => {
  assert.match(guard.features.rss_offline.note, /保存已获取.*仍需联网/);
  assert.match(guard.features.rss_sync.note, /本机账号状态不自动跨设备.*Google Reader API/);
  assert.match(guard.features.rss_selfhost.note, /本身不是聚合服务器/);
  assert(guard.sources.some(s => s.endsWith('/5.3.0/LICENSE.md')));
});

test('Miniflux is a PostgreSQL server with a partial client API and no web article cache', () => {
  assert.match(miniflux.free_tier_limits, /自托管版.*PostgreSQL 11/);
  assert.match(miniflux.features.rss_opml.note, /完整实例备份.*PostgreSQL/);
  assert.match(miniflux.features.rss_sync.note, /NetNewsWire.*RSS Guard.*部分 Google Reader API/);
  assert.match(miniflux.features.rss_offline.note, /只缓存离线提示页，不缓存文章/);
  assert(miniflux.sources.some(s => s.endsWith('/2.3.5/internal/ui/static/js/service_worker.js')));
});

test('Newsflash is a Linux client with local feeds, backend-specific syncing and no GitHub upstream', () => {
  assert.equal(newsflash.github_url, null);
  assert.match(newsflash.source_url, /^https:\/\/gitlab\.com\//);
  assert.match(newsflash.features.rss_opml.note, /导入要求当前账号支持管理订阅/);
  assert.match(newsflash.features.rss_offline.note, /已存到本机.*未缓存.*仍需要联网/);
  assert.match(newsflash.features.rss_sync.note, /Miniflux.*FreshRSS.*本机模式不自动跨设备同步/);
  assert.match(newsflash.features.rss_selfhost.note, /不是聚合服务器/);
});

test('Capy Reader distinguishes local feeds, cached reading and native Miniflux authorization', () => {
  assert.match(capy.free_tier_limits, /Android 11.*崩溃报告由用户选择开启/);
  assert.match(capy.features.rss_direct.note, /不需要同步账号/);
  assert.match(capy.features.rss_offline.note, /已缓存.*未缓存.*仍需要网络/);
  assert.match(capy.features.rss_sync.note, /原生 API.*API 令牌.*Google Reader 兼容连接是两种方式/);
  assert.match(capy.features.rss_selfhost.note, /本身不是聚合服务器/);
  assert(capy.sources.some(s => s.endsWith('/discussions/1749')));
});

test('Newsboat distinguishes a terminal HTML renderer from original-page extraction', () => {
  assert.match(newsboat.features.rss_fulltext.note, /订阅源提供的内容.*外部浏览器.*不会自动提取/);
  assert.match(newsboat.features.rss_sync.note, /Miniflux.*API 令牌.*不会自动跨设备/);
  assert.match(newsboat.features.rss_offline.note, /本机缓存.*未缓存.*需网络/);
  assert(newsboat.sources.some(s => s.endsWith('/r2.45.1/LICENSE')));
});
