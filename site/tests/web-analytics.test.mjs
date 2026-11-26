import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (p) => JSON.parse(readFileSync(new URL(p, import.meta.url), 'utf8'));
const category = read('../../categories/web-analytics.json');
const [umami, cloudflare] = category.products;

test('analytics compares Umami self-hosting, measured cloud limits, and Cloudflare events', () => {
  assert.deepEqual(category.products.map((p) => p.id), ['umami', 'cloudflare-web-analytics']);
  assert.deepEqual(umami.prices.map((p) => p.price), ['0', '20', '0']);
  assert.match(umami.free_tier_limits, /1 个网站.*10 万事件.*6 个月/);
  assert.equal(umami.license, 'MIT');
  assert.equal(umami.features.self_host.value, 'yes');
  assert.equal(cloudflare.features.utm.value, 'no');
  assert.equal(cloudflare.features.custom_events.value, 'no');
  for (const product of category.products) {
    assert.deepEqual(Object.keys(product.features), category.features.map(({ key }) => key));
    assert.ok(product.sources.length >= 3);
  }
});
