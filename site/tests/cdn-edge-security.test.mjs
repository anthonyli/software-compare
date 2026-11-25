import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => fs.readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const data = JSON.parse(read('categories/cdn-edge-security.json'));
const en = JSON.parse(read('site/src/i18n/content-en.json'));
const [cloudflare, cloudfront, fastly] = data.products;

test('CDN free allowances, account payment methods and excess use stay separate', () => {
  assert.deepEqual(data.products.map(p => p.id), ['cloudflare-free', 'cloudfront-flat-rate-free', 'fastly-full-site-delivery']);
  const keys = data.features.map(f => f.key);
  for (const p of data.products) {
    assert.deepEqual(Object.keys(p.features), keys);
    assert(p.sources.length >= 3);
  }
  assert.match(data.notes, /不等于网站托管.*未开户、部署或实测流量/);
  assert.match(cloudflare.free_tier_limits, /512 MB.*默认不缓存.*大文件和视频另受/);
  assert.equal(cloudflare.features.cdn_payment.value, 'unknown');
  assert.equal(cloudflare.features.cdn_waf.value, 'partial');
  assert.match(cloudfront.free_tier_limits, /账号级 Free Tier 不适用.*有效付款方式/);
  assert.match(cloudfront.features.cdn_free_allowance.note, /每个分发每月 100 万请求、100 GB/);
  assert.match(cloudfront.features.cdn_overage.note, /不收超额费.*可能调整/);
  assert.match(fastly.features.cdn_free_allowance.note, /100 GB 和 100 万.*区域和月/);
  assert.match(fastly.features.cdn_overage.note, /自动计费.*US\$0\.12\/GB.*US\$0\.01/);
  assert.match(fastly.features.cdn_payment.note, /要求信用卡/);
  assert.equal(fastly.features.cdn_waf.value, 'paid');
});

test('CDN and edge security has complete bilingual catalog data and cloud registration', () => {
  const strings = v => typeof v === 'string' ? [v] : v && typeof v === 'object' ? Object.values(v).flatMap(strings) : [];
  for (const s of strings(data).filter(s => /[\u4e00-\u9fff]/.test(s))) {
    assert.equal(typeof en[s], 'string', s);
    assert.doesNotMatch(en[s], /[\u4e00-\u9fff]/, s);
  }
  assert.match(read('site/src/config.ts'), /id: "cloud"[^\n]*"web-hosting", "cdn-edge-security", "cloud-sql-databases"/);
  assert.match(read('site/src/i18n/labels.ts'), /"cdn-edge-security": \{ zh: "CDN 与边缘安全", en: "CDN and edge security" \}/);
  assert.match(read('site/src/pages/c/[slug].astro'), /category.slug === "cdn-edge-security".*data-cdn-edge-notes.*tr\(category.notes\)/);
});
