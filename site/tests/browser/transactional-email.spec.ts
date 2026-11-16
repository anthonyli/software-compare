import {test,expect,type Locator} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.218'}});
const products=[
 {id:'amazon-ses',summary:['面向未验证收件人需生产审批','unverified recipients require production approval'],limits:['大陆开户资格未核实','Mainland China signup eligibility is unverified']},
 {id:'postmark',summary:['向外部域名发送前需账户审批','Account approval is required before sending to external domains'],limits:['Free 不允许月度超额','Free does not allow monthly overages']},
 {id:'smtp2go',summary:['新账户仍需审查','New accounts remain subject to review'],limits:['月额度耗尽后新增发送拒收，不排队到下月','After the monthly allowance is exhausted, new sends are rejected, not queued for next month']},
 {id:'resend',summary:['无需生产审批，仍须验证域名 DNS','no production approval, but domain DNS verification is required'],limits:['超额返回 429，不排队或重试','Over limit: 429, no queue or retry']},
 {id:'mailersend',summary:['正式 Free 需审批、组织地址和信用卡','ongoing Free requires approval, organization address and a credit card'],limits:['不支持额外付费发送量，额度用尽后暂停','Extra paid usage is unavailable; sends pause at the limit']},
 {id:'brevo',summary:['生产审批和验证域名数量未核实','production approval and verified-domain count are unverified'],limits:['免费账户闲置 4 个月会删除','Free accounts inactive for 4 months are deleted']},
];
async function visibleTranslation(scope:Locator,pair:string[],english:boolean){
 const active=english?'.t-en':'.t-zh',hidden=english?'.t-zh':'.t-en';
 const text=scope.locator(active).filter({hasText:pair[english?1:0]}).first();
 await expect(text).toBeVisible();await expect(text.locator('..').locator(hidden)).toBeHidden();
}
test('transactional email limits and covers render in both languages and widths',async({page})=>{
 await mkdir('../docs/design/previews',{recursive:true});
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/');
  const card=page.locator('a.dir-card[href="/c/transactional-email/"]');await card.scrollIntoViewIfNeeded();await expect(card).toBeVisible();
  await expect.poll(()=>card.locator('img').evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
  await page.evaluate(()=>window.scrollTo(0,0));await expect.poll(()=>page.evaluate(()=>scrollY)).toBe(0);
  await page.screenshot({path:`../docs/design/previews/payment-page-mail-home-${width}.png`,fullPage:true});
  await page.goto('/c/transactional-email/');
  const list=page.locator(width===1280?'#matrix':'#card-list');
  for(const lang of ['zh-CN','en']){
   await page.locator(`[data-lang="${lang}"]`).click();
   await visibleTranslation(page.locator('h1'),['事务邮件','Transactional email'],lang==='en');
   for(const item of products){
    const row=list.locator(`[data-product-id="${item.id}"]`);await expect(row).toBeVisible();
    await visibleTranslation(row,item.summary,lang==='en');
    const details=row.locator('details');await expect(details).not.toHaveAttribute('open','');
    await details.locator('summary').click();await expect(details).toHaveAttribute('open','');
    await visibleTranslation(details,item.limits,lang==='en');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await page.evaluate(()=>window.scrollTo(0,0));await expect.poll(()=>page.evaluate(()=>scrollY)).toBe(0);
    await page.screenshot({path:`../docs/design/previews/payment-page-mail-${item.id}-${lang}-${width}.png`,fullPage:true});
    await details.locator('summary').click();await expect(details).not.toHaveAttribute('open','');
   }
   await page.evaluate(()=>window.scrollTo(0,0));await expect.poll(()=>page.evaluate(()=>scrollY)).toBe(0);
   await page.screenshot({path:`../docs/design/previews/payment-page-mail-comparison-${lang}-${width}.png`,fullPage:true});
  }
  for(const item of products){
   await page.goto(`/p/transactional-email/${item.id}/`);
   for(const lang of ['zh-CN','en']){
    await page.locator(`[data-lang="${lang}"]`).click();
    await visibleTranslation(page.locator('main'),item.summary,lang==='en');
    await visibleTranslation(page.locator('main'),item.limits,lang==='en');
    const active=lang==='en'?'.t-en':'.t-zh',hidden=lang==='en'?'.t-zh':'.t-en';
    const freeLimits=page.locator('.price-panel > .mt-5 > p '+active);
    const priceNote=page.locator('.price-table tbody tr td:last-child '+active);
    for(const text of [freeLimits,priceNote]){
     await expect(text).toBeVisible();await expect(text.locator('..').locator(hidden)).toBeHidden();
     await expect(text).toContainText(item.limits[lang==='en'?1:0]);
     if(lang==='en')await expect(text).not.toHaveText(/[\u4e00-\u9fff]/);
    }
    if(item.id==='amazon-ses'){
     const checks=lang==='en'?['per recipient','six months','verified sender','200 messages per 24 hours','identity checks','Paid accounts charge']:['按收件人计费','6 个月','验证发件','200 封/24 小时','身份核验','Paid 账户'];
     for(let i=0;i<6;i++)await expect(page.locator('.feature-row p '+active).nth(i)).toContainText(checks[i]);
    }
    if(item.id==='postmark'){
     const checks=lang==='en'?['separate message streams','100 emails per account/month','10 custom sending domains','your own domains added and verified','no credit card required','mechanisms are unverified']:['独立消息流','每账户每月 100','10 个自定义发信域名','账户已添加且验证的自有域名','无需信用卡','机制未核实'];
     for(let i=0;i<6;i++)await expect(page.locator('.feature-row p '+active).nth(i)).toContainText(checks[i]);
    }
    if(item.id==='smtp2go'){
     await expect(freeLimits).toContainText(lang==='en'?'past 5 days':'过去 5 天');
     await expect(page.locator('.feature-row p '+active).nth(1)).toContainText(lang==='en'?'25/hour':'每小时 25');
     await expect(page.locator('.feature-row p '+active).nth(5)).toContainText(lang==='en'?'Daily-limit queueing':'日限排队');
    }
    if(item.id==='resend'){
     await expect(freeLimits).toContainText(lang==='en'?'No cold outreach, purchased or scraped lists':'禁止冷邮件、购买或爬取的联系人名单');
     await expect(priceNote).toContainText(lang==='en'?'complaints must stay below 0.08% and bounces below 4%':'投诉率须低于 0.08%，退信率低于 4%');
    }
    const notes=page.locator('.feature-row p '+(lang==='en'?'.t-en':'.t-zh'));
    await expect(notes).toHaveCount(6);
    for(let i=0;i<6;i++){
     const note=notes.nth(i);await expect(note).toBeVisible();
     await expect(note.locator('..').locator(lang==='en'?'.t-zh':'.t-en')).toBeHidden();
     if(lang==='en')await expect(note).not.toHaveText(/[\u4e00-\u9fff]/);
    }
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    if(item.id==='amazon-ses'){await page.evaluate(()=>window.scrollTo(0,0));await expect.poll(()=>page.evaluate(()=>scrollY)).toBe(0);await page.screenshot({path:`../docs/design/previews/payment-page-mail-amazon-ses-detail-${lang}-${width}.png`,fullPage:true});}
    if(item.id==='postmark'){await page.evaluate(()=>window.scrollTo(0,0));await expect.poll(()=>page.evaluate(()=>scrollY)).toBe(0);await page.screenshot({path:`../docs/design/previews/payment-page-mail-postmark-detail-${lang}-${width}.png`,fullPage:true});}
    if(item.id==='smtp2go'){await page.evaluate(()=>window.scrollTo(0,0));await expect.poll(()=>page.evaluate(()=>scrollY)).toBe(0);await page.screenshot({path:`../docs/design/previews/payment-page-mail-smtp2go-detail-${lang}-${width}.png`,fullPage:true});}
   }
  }
 }
});
