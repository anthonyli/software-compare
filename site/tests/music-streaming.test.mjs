import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => fs.readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const data = JSON.parse(read('categories/music-streaming.json'));
const en = JSON.parse(read('site/src/i18n/content-en.json'));
const [apple, spotify, tidal] = data.products;
const keys = ['music_free_catalog','music_offline','music_lossless','music_web','music_weblossless','music_family'];

test('lossless catalog quality, browser support and offline subscription downloads stay separate', () => {
  assert.deepEqual(data.features.map(f => f.key), keys);
  assert.deepEqual(data.products.map(p => p.id), ['apple-music','spotify','tidal']);
  assert.deepEqual(data.products.map(p => keys.map(k => p.features[k].value)), [
    ['no','yes','yes','yes','unknown','yes'],
    ['yes','yes','yes','yes','no','yes'],
    ['no','yes','yes','yes','yes','yes'],
  ]);
  for (const p of data.products) {
    assert.deepEqual(Object.keys(p.features), keys);
    assert(p.sources.length >= 5);
    assert.equal(p.latest_release,null);
  }
  assert.match(data.notes, /不是本地文件播放器.*订阅下载不等于买下.*目录支持无损也不保证/);
  assert.match(apple.features.music_offline.note, /订阅到期后目录下载不能继续播放.*本地音乐/);
  assert.match(apple.features.music_lossless.note, /ALAC.*24 位\/192 kHz.*普通蓝牙不传输无损.*Vision Pro.*48 kHz 需外接数模转换器/);
  assert.match(apple.features.music_weblossless.note, /未确认网页可选无损/);
  assert.match(spotify.features.music_offline.note, /Premium.*Free 可下载播客.*每 30 天联网/);
  assert.match(spotify.features.music_weblossless.note, /Free AAC 128 kbps.*Premium AAC 256 kbps/);
  assert.match(tidal.features.music_offline.note, /兼容的移动 App.*iPhone、iPad 和 Android.*桌面端和浏览器不能/);
  assert(tidal.platforms.includes('iPadOS'));
  assert(tidal.sources.some(s => s.includes('app/tidal-music-hifi-sound') && s.endsWith('?platform=ipad')));
  assert.match(tidal.features.music_weblossless.note, /Web 可串流 HiRes FLAC.*Firefox 不支持 Max.*不代表每个浏览器.*达 24 位\/192 kHz/);
});

test('regional subscription prices, free access and trial eligibility are not interchangeable', () => {
  const rows = p => p.prices.map(x => [x.price,x.currency,x.period]);
  assert.deepEqual(rows(apple), [['12','CNY','month'],['20','CNY','month'],['7','CNY','month']]);
  assert.deepEqual(rows(spotify), [['12.99','USD','month'],['21.99','USD','month'],['6.99','USD','month']]);
  assert.deepEqual(rows(tidal), [['11.99','USD','month'],['19.99','USD','month'],['6.99','USD','month']]);
  assert.match(apple.price_summary, /中国大陆.*学生 ¥7\/月、个人 ¥12\/月、家庭 ¥20\/月/);
  assert.match(apple.free_tier_limits, /新订阅用户 1 个月试听.*3 个月需符合设备和新订阅资格/);
  assert.match(apple.features.music_family.note, /另外最多五位/);
  assert.match(spotify.price_summary, /美国官网.*不代表中国大陆/);
  assert.match(spotify.features.music_family.note, /最多六人.*同住/);
  assert.match(tidal.price_summary, /美国英语帮助页.*地点、税费.*不是中国大陆报价/);
  assert.match(tidal.features.music_family.note, /最多六人.*同一国家/);
});

test('music comparison is bilingual and grouped separately from existing RSS readers', () => {
  const strings = v => typeof v === 'string' ? [v] : v && typeof v === 'object' ? Object.values(v).flatMap(strings) : [];
  for (const s of strings(data).filter(s => /[\u4e00-\u9fff]/.test(s))) {
    assert.equal(typeof en[s], 'string', s);
    assert.doesNotMatch(en[s], /[\u4e00-\u9fff]/, s);
  }
  const config=read('site/src/config.ts');
  assert.match(config, /"quick-translation-ocr".*"chinese-input-methods".*"rss-readers"/);
  assert.match(config, /id: "media",[\s\S]*?slugs: \["screen-recorders"[^\]]*"music-streaming"/);
  assert.match(read('site/src/i18n/labels.ts'), /"music-streaming": \{ zh: "音乐串流订阅", en: "Music streaming subscriptions" \}/);
  assert.match(read('site/src/pages/c/[slug].astro'), /category.slug === "music-streaming".*data-music-streaming-notes.*tr\(category.notes\)/);
  assert.match(read('site/public/categories/music-streaming.svg'), /viewBox="0 0 480 260"/);
});
