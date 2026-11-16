import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read = path => JSON.parse(readFileSync(new URL(path, import.meta.url)));
test('Notesnook distinguishes reference currency, standard trials and bounded free tags in both languages', () => {
 const p = read('../../categories/note-taking.json').products.find(p => p.id === 'notesnook');
 const en = read('../src/i18n/content-en.json');
 assert.deepEqual(p.prices.map(x => [x.price,x.currency,x.period]), [['0',null,null],['19.99','USD','year'],['69.99','USD','year'],['89.99','USD','year']]);
 assert.match(p.price_summary, /地区币种.*结算页/);
 assert.match(p.price_summary, /月付\/年付.*14天.*支付方式.*5年.*无试用/);
 assert.match(p.free_tier_limits, /无需绑卡.*50MB\/月.*10MB.*标签各50.*每月1日.*正文不计入/);
 assert.equal(p.features.tags.value, 'yes');
 assert.match(p.features.tags.note, /Free.*50.*Essential.*500.*Pro.*Believer.*不限/);
 for (const s of [p.summary,p.price_summary,p.free_tier_limits,p.features.tags.note,...p.prices.map(x=>x.note)]) {
  assert(en[s]); assert.doesNotMatch(en[s], /[\u4e00-\u9fff]/); assert.doesNotMatch(s, /SGD|以新元标价|以新加坡元结算/);
 }
 assert.match(en[p.price_summary], /5-year plans are prepaid with no trial/);
 assert.match(en[p.free_tier_limits], /excludes note text/);
 assert(p.sources.includes('https://notesnook.com/help/plans-and-limits'));
 assert(p.sources.includes('https://notesnook.com/blog/introducing-new-pricing-plans'));
 for (const k of ['rich_text','web_clipper','plugins','collaboration']) assert.equal(p.features[k].value, 'unknown');
});
