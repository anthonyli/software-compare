import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const cat=JSON.parse(fs.readFileSync(new URL('../../categories/fitness-training.json',import.meta.url)));const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url)));
test('fitness loggers distinguish templates, trials and unverified capabilities',()=>{for(const id of ['strong','fitbod']){const p=cat.products.find(p=>p.id===id);assert(p);assert(p.sources.length>=4);assert.equal(p.features.self_host.value,'unknown');assert.equal(p.features.nutrition_log.value,id==='strong'?'partial':'unknown');for(const s of [p.summary,p.price_summary,p.free_tier_limits,...Object.values(p.features).map(f=>f.note||'')])if(/[\u4e00-\u9fff]/.test(s))assert(en[s]);}assert.equal(cat.products.find(p=>p.id==='strong').features.workout_routines.value,'partial');assert.equal(cat.products.find(p=>p.id==='fitbod').features.workout_routines.value,'paid');assert.equal(cat.products.find(p=>p.id==='wger').collected_at,'2026-11-13');});

test('FitNotes distinguishes the Android app, optional add-on, and backup from sync', () => {
  const product = cat.products.find(({ id }) => id === 'fitnotes');
  assert(product);
  assert.deepEqual(product.platforms, ['Android']);
  assert.equal(product.github_url, null);
  assert.equal(product.license, '未核实开源授权');
  assert.deepEqual(product.prices[1], { plan: 'FitNotes Supporter', price: 6.99, currency: 'USD', period: 'once' });
  assert.deepEqual(Object.fromEntries(Object.entries(product.features).map(([key, feature]) => [key, feature.value])), {
    workout_routines: 'yes', body_tracking: 'yes', nutrition_log: 'partial', self_host: 'na', cloud_sync: 'no',
  });
  assert.match(product.free_tier_limits, /无需注册.*默认保存在设备上.*会覆盖设备现有记录.*CSV.*不能用于恢复/);
  assert.match(product.features.nutrition_log.note, /自定义数值指标.*不是专门的食物日记/);
  assert.match(product.features.cloud_sync.note, /不是持续跨设备同步.*Google One.*Google Drive/);
  assert(product.sources.some((source) => source.endsWith('id=com.github.jamesgay.fitnotes')));
  assert(product.sources.some((source) => new URL(source).searchParams.get('id') === 'com.fitnotesapp.fitnotessupporter' && new URL(source).searchParams.get('gl') === 'US'));
  for (const copy of [product.summary, product.license, product.price_summary, product.free_tier_limits, ...Object.values(product.features).map(({ note }) => note)]) {
    assert(en[copy], `FitNotes English copy is missing for: ${copy}`);
  }
});
