import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(new URL('../../'+p,import.meta.url),'utf8'));
const c=read('categories/international-payments.json'),p=c.products.find(p=>p.id==='paypal-china'),en=read('site/src/i18n/content-en.json');
test('PayPal China is conditional business onboarding, not a consumer account or MoR',()=>{
 assert(p);assert.equal(p.features.mor.value,'no');assert.equal(p.features.recurring.value,'unknown');
 for(const k of ['cn_individual','cn_business','payouts'])assert.equal(p.features[k].value,'partial');
 assert.match(p.features.cn_individual.note,/个人类别企业用户.*非消费者/);assert.match(p.features.cn_individual.note,/18岁.*中国税收居民/);
 assert.match(p.features.cn_business.note,/主体及控制人.*美国税法/);assert.match(p.features.review.note,/无需独立站.*另行申请人民币结算.*店铺URL/);
 assert(p.sources.some(s=>s.endsWith('/paypal-unified-account-ua')));assert(p.sources.some(s=>s.endsWith('/rmb-withdrawal-terms-and-conditions')));
});
test('PayPal example fee and withdrawal routes cannot be conflated',()=>{
 assert.equal(p.prices[0].price,'4.4% + USD 0.30');assert.equal(p.prices[0].currency,null);assert.equal(p.prices[0].period,'成功交易');
 assert.match(p.prices[0].note,/仅限.*美元国际商业收款/);assert.match(p.free_tier_limits,/标准费率1%.*服务费金额.*6%.*非本金6%/);
 assert.match(p.free_tier_limits,/USD 35仅.*电汇.*不是人民币结算/);assert.match(p.features.payouts.note,/服务额度不等于余额/);
 assert.match(p.features.payouts.note,/13:00.*不保证时效/);assert.match(p.free_tier_limits,/未开户.*实测/);
});
test('PayPal has all feature keys and fully translated public Chinese fields',()=>{
 assert.deepEqual(Object.keys(p.features).sort(),c.features.map(f=>f.key).sort());
 const strings=v=>typeof v==='string'?[v]:v&&typeof v==='object'?Object.values(v).flatMap(strings):[];
 for(const s of strings(p).filter(s=>/[\u4e00-\u9fff]/.test(s)))assert(en[s],s);
 assert.equal(en[p.name],'PayPal (mainland China sellers)');
});
