import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(new URL('../../'+p,import.meta.url),'utf8'));
const c=read('categories/web-hosting.json'),en=read('site/src/i18n/content-en.json'),[v,f]=c.products;
test('website deployment has seven sourced complete bilingual products',()=>{assert.deepEqual(c.products.map(p=>p.id),['vercel','cloudflare-pages','render','netlify','cloudflare-workers','firebase-hosting','railway']);for(const p of c.products){assert.deepEqual(Object.keys(p.features).sort(),c.features.map(f=>f.key).sort());assert.equal(p.collected_at,({'cloudflare-workers':'2026-11-17','firebase-hosting':'2026-11-22','railway':'2026-11-22'})[p.id]||'2026-11-16');assert(p.sources.length>=4);assert.match(p.free_tier_limits,/未开户、绑卡、部署或实测/);}const strings=v=>typeof v==='string'?[v]:v&&typeof v==='object'?Object.values(v).flatMap(strings):[];for(const s of strings(c).filter(s=>/[\u4e00-\u9fff]/.test(s)))assert(en[s],s);});
test('Hobby scope, quota periods and overage are distinct from paid Pro',()=>{assert.equal(v.features.card_required.value,'unknown');assert.equal(v.features.commercial.value,'partial');assert.match(v.features.commercial.note,/个人或非商业.*personal or non-commercial/);assert.match(v.features.overage.note,/30天.*7天.*自动按量计费/);assert.match(v.features.functions.note,/每月.*4小时.*360GB/);assert.equal(v.prices[1].price,'20');assert.match(v.prices[1].note,/额外部署席位.*超抵扣/);});
test('Pages free static requests do not imply unlimited builds or Functions',()=>{assert.equal(f.features.card_required.value,'no');assert.equal(f.features.commercial.value,'unknown');assert.match(f.features.build_limits.note,/每月500.*1个并发.*20分钟/);assert.match(f.features.functions.note,/共享每天10万.*UTC零点/);assert.match(f.features.static_hosting.note,/不调用Functions/);assert.match(f.features.overage.note,/fail open.*fail closed/);assert.match(f.free_tier_limits,/2万文件.*25MiB/);});

test('Render distinguishes workspace quotas, static CDN and dynamic instance limits',()=>{const r=c.products[2];assert.equal(r.id,'render');assert.match(r.features.static_hosting.note,/5GB.*2个.*0.25/);assert.match(r.features.build_limits.note,/500 Starter.*不是500次.*120分钟/);assert.match(r.features.functions.note,/750.*自然月.*15分钟.*1分钟.*不套用静态站/);assert.match(r.features.overage.note,/0.15.*1000.*既有部署继续运行/);assert.equal(r.features.commercial.value,'unknown');assert.equal(r.features.card_required.value,'no');});
test('all Render public fields translate after actual cleanPublicText normalization',()=>{
 const source=fs.readFileSync(new URL('../src/lib/display.ts',import.meta.url),'utf8');
 const leak=source.slice(source.indexOf('const LEAK ='),source.indexOf('export const PRICE_CAVEAT'));
 const fn=source.slice(source.indexOf('export function cleanPublicText'),source.indexOf('export function parseCurrency')).replace('export function','function').replace('(input: string | null | undefined): string','(input)');
 const clean=new Function(leak+fn+';return cleanPublicText;')();const r=c.products[2];
 for(const raw of [r.summary,r.price_summary,r.free_tier_limits,...r.prices.flatMap(x=>[x.plan,x.note]),...Object.values(r.features).map(x=>x.note)]){const key=clean(raw);assert(en[key],key);assert.doesNotMatch(en[key],/[\u4e00-\u9fff]/);}
});

test('Netlify shares credits across team and resources without implying free previews or calendar-month resets',()=>{const n=c.products[3];assert.equal(n.id,'netlify');assert.match(n.features.static_hosting.note,/300 credits.*20 credits\/GB.*2 credits\/1万/);assert.match(n.features.build_limits.note,/15 credits.*但其请求及计算.*1个并发/);assert.match(n.features.functions.note,/10 credits\/GB-hour.*Edge Functions不计入计算/);assert.equal(n.features.commercial.value,'yes');assert.equal(n.features.card_required.value,'unknown');assert.match(n.features.overage.note,/整个团队.*不能购买.*不结转.*而非自然月/);assert.match(n.free_tier_limits,/2025-09-04.*Legacy/);});

test('all Netlify public fields translate after actual cleanPublicText normalization',()=>{
 const source=fs.readFileSync(new URL('../src/lib/display.ts',import.meta.url),'utf8');
 const leak=source.slice(source.indexOf('const LEAK ='),source.indexOf('export const PRICE_CAVEAT'));
 const fn=source.slice(source.indexOf('export function cleanPublicText'),source.indexOf('export function parseCurrency')).replace('export function','function').replace('(input: string | null | undefined): string','(input)');
 const clean=new Function(leak+fn+';return cleanPublicText;')();const r=c.products[3];
 for(const raw of [r.summary,r.price_summary,r.free_tier_limits,...r.prices.flatMap(x=>[x.plan,x.note]),...Object.values(r.features).map(x=>x.note)]){const key=clean(raw);assert(en[key],key);assert.doesNotMatch(en[key],/[\u4e00-\u9fff]/);}
});

test('Workers separates assets, daily compute, monthly build minutes and failure modes',()=>{
 const w=c.products.find(p=>p.id==='cloudflare-workers');assert(w);
 assert.match(w.features.static_hosting.note,/2万文件.*25MiB.*SSR/);
 assert.match(w.features.build_limits.note,/3000构建分钟.*1个并发.*20分钟.*不是Pages/);
 assert.match(w.features.functions.note,/每天10万.*10ms.*Pages Functions共用/);
 assert.match(w.features.overage.note,/1027.*fail open.*fail closed.*run_worker_first.*429.*不回退/);
 assert.equal(w.features.commercial.value,'unknown');assert.equal(w.features.card_required.value,'no');
 assert.match(w.free_tier_limits,/UTC零点.*共享/);
});
test('Workers translations survive the actual public-text cleaning chain',()=>{
 const source=fs.readFileSync(new URL('../src/lib/display.ts',import.meta.url),'utf8');
 const leak=source.slice(source.indexOf('const LEAK ='),source.indexOf('export const PRICE_CAVEAT'));
 const fn=source.slice(source.indexOf('export function cleanPublicText'),source.indexOf('export function parseCurrency')).replace('export function','function').replace('(input: string | null | undefined): string','(input)');
 const clean=new Function(leak+fn+';return cleanPublicText;')();const w=c.products.find(p=>p.id==='cloudflare-workers');
 for(const raw of [w.summary,w.price_summary,w.free_tier_limits,...w.prices.flatMap(x=>[x.plan,x.note]),...Object.values(w.features).map(x=>x.note)]){const key=clean(raw);assert(key,key);assert(en[key],key);assert.doesNotMatch(en[key],/[\u4e00-\u9fff]/);}
});

test('Firebase Hosting distinguishes conflicting transfer periods, external builds, and paid dynamic backends', () => {
  const p = c.products.find(({ id }) => id === 'firebase-hosting');
  assert(p);
  assert.deepEqual(Object.fromEntries(Object.entries(p.features).map(([key, feature]) => [key, feature.value])), {
    static_hosting: 'yes', build_limits: 'partial', functions: 'paid', commercial: 'unknown', overage: 'partial', card_required: 'no',
  });
  assert.equal(p.prices.length, 1);
  assert.match(p.free_tier_limits, /每项目 10 GB.*每天 360 MB.*每月 10 GB.*周期不一致/);
  assert.match(p.features.build_limits.note, /GitHub Actions.*不等于 Hosting 赠送构建分钟.*App Hosting.*Cloud Build/);
  assert.match(p.features.functions.note, /Cloud Functions for Firebase 或 Cloud Run.*需 Blaze.*独立计量/);
  assert.match(p.features.overage.note, /无法部署新内容.*USD 0\.026\/GB.*宽限.*暂停至下月.*冲突/);
  assert.match(p.features.overage.note, /两处均列 USD 0\.15\/GB/);
  assert.match(p.features.card_required.note, /Spark 不需要支付方式.*Blaze.*结算账号/);

  const source = fs.readFileSync(new URL('../src/lib/display.ts', import.meta.url), 'utf8');
  const leak = source.slice(source.indexOf('const LEAK ='), source.indexOf('export const PRICE_CAVEAT'));
  const fn = source.slice(source.indexOf('export function cleanPublicText'), source.indexOf('export function parseCurrency')).replace('export function','function').replace('(input: string | null | undefined): string','(input)');
  const clean = new Function(leak + fn + ';return cleanPublicText;')();
  for (const raw of [p.summary, p.price_summary, p.free_tier_limits, ...p.prices.flatMap((row) => [row.plan, row.note]), ...Object.values(p.features).map((row) => row.note)]) {
    const key = clean(raw);
    assert(en[key], key);
    assert.doesNotMatch(en[key], /[\u4e00-\u9fff]/);
  }
});

test('Railway distinguishes ongoing Free, the trial, and service-backed compute', () => {
  const p = c.products.find(({ id }) => id === 'railway');
  assert(p);
  assert.deepEqual(Object.fromEntries(Object.entries(p.features).map(([key, f]) => [key, f.value])), {
    static_hosting: 'yes', build_limits: 'partial', functions: 'partial', commercial: 'unknown', overage: 'partial', card_required: 'no',
  });
  assert.match(p.price_summary, /每账期有 USD 1.*无需信用卡.*Hobby USD 5\/月、Pro USD 20\/月.*等额/);
  assert.match(p.free_tier_limits, /1 个项目、最多 3 个服务.*1 vCPU.*0\.5 GB RAM.*无出站流量.*最多 30 天，提供一次性 USD 5 额度.*重新部署/);
  assert.match(p.features.static_hosting.note, /不含自定义域名.*默认关闭的 Beta.*不等于边缘计算/);
  assert.match(p.features.build_limits.note, /镜像上限 4 GB.*PR 预览环境.*仍计入资源用量/);
  assert.match(p.features.functions.note, /96 KB.*单文件 TypeScript.*Bun.*作为普通 Railway 服务/);
  assert.match(p.features.overage.note, /卷存储共用，不结转.*暂停至下个账期或升级.*20\/vCPU\/月.*10\/GB\/月.*0\.05\/GB.*0\.15\/GB\/月/);
});
