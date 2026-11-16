import {test,expect,type Locator} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.218'}});
const products=[
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
  await page.screenshot({path:`../docs/design/previews/payment-page-mail-home-${width}.png`});
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
   }
  }
 }
});
