import {test,expect} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.246'}});
test('buyer wallets expose bilingual columns and qualified details',async({page})=>{
 await mkdir('../docs/design/previews',{recursive:true});
 const labels=[['支付宝（大陆钱包）','Alipay (mainland wallet)'],['微信支付','WeChat Pay']];
 const ids=['dodo-payments','creem','paddle','lemon-squeezy','stripe-payments','paypal-china'];
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/c/international-payments/');
  const list=page.locator(width===1280?'#matrix':'#card-list');
  for(const lang of ['en','zh-CN']){
   await page.locator(`[data-lang="${lang}"]`).click();
   const active=lang==='en'?'.t-en':'.t-zh',hidden=lang==='en'?'.t-zh':'.t-en';
   for(const pair of labels){
    const label=list.locator(active).filter({hasText:new RegExp('^'+pair[lang==='en'?1:0].replace(/[()]/g,'\\$&')+'$')}).first();
    await expect(label).toBeVisible();await expect(label.locator('..').locator(hidden)).toBeHidden();
   }
   for(const id of ids)await expect(list.locator(`[data-product-id="${id}"]`)).toBeVisible();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   await page.evaluate(()=>window.scrollTo(0,0));await expect.poll(()=>page.evaluate(()=>scrollY)).toBe(0);
   await page.screenshot({path:`../docs/design/previews/payment-page-wallets-${lang}-${width}.png`,fullPage:true});
  }
 }
 for(const id of ids){
  await page.goto(`/p/international-payments/${id}/`);
  for(const lang of ['en','zh-CN']){
   await page.locator(`[data-lang="${lang}"]`).click();
   const active=lang==='en'?'.t-en':'.t-zh',hidden=lang==='en'?'.t-zh':'.t-en';
   for(const pair of labels){
    const row=page.locator('.feature-row').filter({hasText:pair[0]});
    await expect(row.locator(active).filter({hasText:pair[lang==='en'?1:0]}).first()).toBeVisible();
    await expect(row.locator('p '+active)).toBeVisible();await expect(row.locator('p '+hidden)).toBeHidden();
   }
   if(id==='dodo-payments')await expect(page.locator('.feature-list '+active).filter({hasText:'AlipayHK'})).toBeVisible();
   if(id==='paypal-china')await expect(page.locator('.feature-list '+active).filter({hasText:'Braintree'})).toHaveCount(2);
  }
 }
});
