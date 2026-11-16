import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(new URL('../../'+p,import.meta.url),'utf8'));
const c=read('categories/transactional-email.json'),en=read('site/src/i18n/content-en.json');
const p=Object.fromEntries(c.products.map(p=>[p.id,p]));
test('transactional email has three sourced, explicitly scoped free services',()=>{assert.equal(c.products.length,3);assert.equal(c.features.length,6);for(const x of c.products){assert.equal(x.prices[0].price,'0');assert.equal(x.collected_at,'2026-11-16');assert.deepEqual(Object.keys(x.features).sort(),c.features.map(f=>f.key).sort());assert.match(x.free_tier_limits,/大陆开户资格.*未核实/);assert(x.sources.length>=2);}});
test('Resend quotas, production and terms preserve important distinctions',()=>{assert.match(p.resend.features.quota.note,/3,000.*UTC.*100.*To \/ CC \/ BCC/);assert.match(p.resend.features.domains.note,/3 个.*共享/);assert.match(p.resend.features.overflow.note,/429.*不排队或重试/);assert.equal(p.resend.features.approval.value,'yes');assert.match(p.resend.free_tier_limits,/超额转付费.*0.08%.*4%/);});
test('MailerSend approval and card requirements do not inherit sandbox promises',()=>{assert.equal(p.mailersend.features.cardless.value,'no');assert.equal(p.mailersend.features.approval.value,'no');assert.match(p.mailersend.features.quota.note,/30 天 500.*每日 100.*100 次 API/);assert.match(p.mailersend.features.overflow.note,/不允许超额付费量/);});
test('Brevo daily quota, queue, branding and inactivity stay bounded',()=>{assert.match(p.brevo.features.quota.note,/300.*不结转.*不是固定/);assert.match(p.brevo.features.overflow.note,/1,000.*再超出不投递/);assert.match(p.brevo.free_tier_limits,/4 个月.*自动事务邮件.*活跃/);assert.equal(p.brevo.features.cardless.value,'yes');assert.equal(p.brevo.features.approval.value,'unknown');});
test('every Chinese transactional email string has English coverage',()=>{const strings=v=>typeof v==='string'?[v]:v&&typeof v==='object'?Object.values(v).flatMap(strings):[];for(const s of strings(c).filter(s=>/[\u4e00-\u9fff]/.test(s)))assert(en[s],s);});

test('all 18 rendered feature notes retain English after the real public-text cleaner',async()=>{
 const {build}=await import('esbuild');
 const result=await build({entryPoints:[new URL('../src/lib/display.ts',import.meta.url).pathname],bundle:true,platform:'node',format:'esm',write:false});
 const {cleanPublicText}=await import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'));
 let count=0;
 for(const product of c.products)for(const feature of Object.values(product.features)){
  const note=cleanPublicText(feature.note);assert(note,product.id);assert.equal(note,feature.note,`${product.id}: feature policy must not disappear`);
  assert(en[note],`${product.id}: ${note}`);assert.doesNotMatch(en[note],/[\u4e00-\u9fff]/);count++;
 }
 assert.equal(count,18);
});

test('cleaned summaries, free limits and price notes preserve facts and translations',async()=>{
 const {build}=await import('esbuild');
 const result=await build({entryPoints:[new URL('../src/lib/display.ts',import.meta.url).pathname],bundle:true,platform:'node',format:'esm',write:false});
 const {cleanPublicText}=await import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'));
 for(const product of c.products)for(const raw of [product.summary,product.price_summary,product.free_tier_limits,...product.prices.map(p=>p.note)]){
  const cleaned=cleanPublicText(raw);assert.equal(cleaned,raw,`${product.id}: public facts must not disappear`);
  assert(en[cleaned],`${product.id}: ${cleaned}`);assert.doesNotMatch(en[cleaned],/[\u4e00-\u9fff]/);
 }
});
