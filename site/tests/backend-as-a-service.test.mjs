import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(new URL('../../'+p,import.meta.url),'utf8'));
const c=read('categories/backend-as-a-service.json'),en=read('site/src/i18n/content-en.json'),p=c.products[0];
test('BaaS has two sourced bilingual Cloud entries',()=>{assert.equal(c.products.length,2);assert.equal(p.id,'supabase-cloud');assert.equal(p.open_source,false);assert.deepEqual(Object.keys(p.features).sort(),c.features.map(f=>f.key).sort());assert.equal(c.features.length,6);assert.equal(p.collected_at,'2026-11-16');assert.equal(p.sources.length,8);const strings=v=>typeof v==='string'?[v]:v&&typeof v==='object'?Object.values(v).flatMap(strings):[];for(const s of strings(c).filter(s=>/[\u4e00-\u9fff]/.test(s)))assert(en[s],s);assert.doesNotMatch(p.summary,/首批仅收录/);});
test('Supabase distinguishes project capacity, shared quotas and paid compute',()=>{assert.match(p.features.free_quota.note,/Owner或Admin.*暂停项目不计.*每项目500MB.*组织共享.*每月5GB.*5GB.*仅适用Storage/);assert.match(p.free_tier_limits,/不是每月新增容量.*500,000.*200万.*200/);assert.match(p.features.overage.note,/402.*不是自动.*Compute Hours不受Spend Cap/);assert.equal(p.prices[1].price,'25');assert.match(p.prices[1].note,/不是所有项目打包USD25/);});
test('Supabase availability backups and unknown eligibility remain explicit',()=>{assert.equal(p.features.always_on.value,'no');assert.match(p.features.always_on.note,/一周/);assert.equal(p.features.managed_backups.value,'no');assert.match(p.features.managed_backups.note,/不包含Storage/);assert.equal(p.features.commercial.value,'unknown');assert.equal(p.features.no_card.value,'unknown');assert.match(p.free_tier_limits,/未开户、绑卡、创建项目、调用服务或实测/);});

test('all rendered BaaS feature notes retain English after public-text normalization',()=>{
 const source=fs.readFileSync(new URL('../src/lib/display.ts',import.meta.url),'utf8');
 const leak=source.slice(source.indexOf('const LEAK ='),source.indexOf('export const PRICE_CAVEAT'));
 const fn=source.slice(source.indexOf('export function cleanPublicText'),source.indexOf('export function parseCurrency')).replace('export function','function').replace('(input: string | null | undefined): string','(input)');
 const clean=new Function(leak+fn+';return cleanPublicText;')();
 for(const feature of c.products.flatMap(product=>Object.values(product.features))){const normalized=clean(feature.note);assert(en[normalized],normalized);assert.doesNotMatch(en[normalized],/[\u4e00-\u9fff]/);}
 for(const product of c.products){for(const raw of [product.summary,product.price_summary,product.free_tier_limits,...product.prices.flatMap(r=>[r.plan,r.note])]){const normalized=clean(raw);assert(en[normalized],normalized);assert.doesNotMatch(en[normalized],/[\u4e00-\u9fff]/);}}
 assert.equal(clean(p.features.commercial.note),'按具体使用方式与现行合同确认，不推断禁止或全面允许。');
 assert.equal(clean(p.features.no_card.note),'公开账单文档仅明确付费方案要求信用卡在档；未注册验证。');
});

test('Neon scopes free quotas and avoids unsupported recovery or eligibility promises',()=>{
 const n=c.products.find(p=>p.id==='neon-cloud');assert(n);assert.deepEqual(Object.keys(n.features),c.features.map(f=>f.key));
 assert.match(n.features.free_quota.note,/100 CU-hours.*60,000 MAU.*5GB.*1GB.*20GB/);
 assert.match(n.features.overage.note,/53000.*查询与导出仍可用.*不会删除数据.*未确认/);
 assert.equal(n.features.always_on.value,'no');assert.match(n.features.always_on.note,/5分钟.*新查询自动唤醒/);
 assert.equal(n.features.managed_backups.value,'partial');assert.match(n.features.managed_backups.note,/根分支.*6小时.*1GB.*无定时备份/);
 assert.equal(n.features.commercial.value,'unknown');assert.equal(n.features.no_card.value,'partial');assert.match(n.features.no_card.note,/AI Gateway.*预付/);
});
