import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(new URL('../../'+p,import.meta.url),'utf8'));
const c=read('categories/cloud-sql-databases.json'),en=read('site/src/i18n/content-en.json');const [t,d]=c.products;
test('cloud SQL compares three hosted services using six complete free-tier dimensions',()=>{assert.deepEqual(c.products.map(p=>p.id),['turso','cloudflare-d1','aurora-dsql']);assert.equal(c.features.length,6);for(const p of c.products){assert.deepEqual(Object.keys(p.features),c.features.map(f=>f.key));assert.equal(p.pricing_model,'免费增值');assert.equal(p.prices[0].price,'0');assert(p.sources.length>=2);}for(const p of [t,d]){assert.equal(p.collected_at,'2026-11-16');assert.match(p.free_tier_limits,/商用.*未知|商用.*歧义/);assert.match(p.free_tier_limits,/闲置暂停.*未知/);}});
test('Turso monthly quotas are not per-database grants or unlimited traffic',()=>{assert.match(t.features.capacity.note,/100.*共享 5 GB.*不是每库/);assert.match(t.features.reads.note,/每月 5 亿.*扫描行/);assert.match(t.features.writes.note,/每月 1000 万/);assert.match(t.features.transfer.note,/每月 3 GB.*不等于/);assert.match(t.free_tier_limits,/任一指标超额.*阻断.*不自动扣费/);assert.match(t.features.recovery.note,/1 天/);assert.equal(t.features.card_required.value,'no');});
test('D1 daily quotas, recovery and storage limits stay separate from Workers',()=>{assert.match(d.features.capacity.note,/10 库.*500 MB.*5 GB/);assert.match(d.features.reads.note,/每天 500 万.*UTC 00:00.*查询失败/);assert.match(d.features.writes.note,/每天 10 万.*UTC 00:00/);assert.match(d.free_tier_limits,/新增数据.*索引和触发器受阻/);assert.match(d.features.transfer.note,/不免除 Workers/);assert.match(d.features.recovery.note,/7 天/);assert.equal(d.features.card_required.value,'unknown');});
test('all Chinese cloud SQL content has English translations',()=>{const strings=v=>typeof v==='string'?[v]:v&&typeof v==='object'?Object.values(v).flatMap(strings):[];for(const s of strings(c).filter(s=>/[\u4e00-\u9fff]/.test(s)))assert(en[s],s);});

test('Aurora DSQL separates shared DPU, regional overage, transfer, recovery and payment',()=>{
 const p=c.products.find(p=>p.id==='aurora-dsql');assert(p);
 assert.equal(p.collected_at,'2026-11-22');assert.equal(p.open_source,false);
 assert.deepEqual(Object.values(p.features).map(f=>f.value),['partial','partial','partial','partial','no','partial']);
 assert.match(p.summary,/兼容 PostgreSQL 协议与部分功能，不等同于普通 Aurora PostgreSQL/);
 assert.match(p.price_summary,/100,000 DPU 和 1 GiB.*俄亥俄.*8 美元.*0[.]33 美元.*不是全球报价/);
 assert.match(p.free_tier_limits,/Free plan 最长 6 个月.*抵扣金用完时提前结束.*Paid plan.*按地区用量计费/);
 for(const key of ['reads','writes'])assert.match(p.features[key].note,/共用每月 100,000 DPU.*没有独立/);
 assert.match(p.features.transfer.note,/复制加计写入 DPU、各区存储另计.*公网出站每月 100 GB.*共享额度.*中国区与 GovCloud 不适用.*新注册流程的账户不支持跨区/);
 assert.match(p.features.recovery.note,/付费整集群快照.*创建新集群.*不支持 AWS Backup 连续备份或时间点恢复/);
 assert.match(p.features.card_required.note,/大多数新客户无需.*额外验证.*高级注册.*不保证免绑卡/);
 const source=fs.readFileSync(new URL('../src/lib/display.ts',import.meta.url),'utf8');
 const leak=source.slice(source.indexOf('const LEAK ='),source.indexOf('export const PRICE_CAVEAT'));
 const fn=source.slice(source.indexOf('export function cleanPublicText'),source.indexOf('export function parseCurrency')).replace('export function','function').replace('(input: string | null | undefined): string','(input)');
 const clean=new Function(leak+fn+';return cleanPublicText;')();
 for(const raw of [p.summary,p.price_summary,p.free_tier_limits,...p.prices.flatMap(r=>[r.plan,r.note]),...Object.values(p.features).map(f=>f.note)]){const key=clean(raw);assert(key);assert(en[key],key);assert.doesNotMatch(en[key],/[\u4e00-\u9fff]/);}
});
