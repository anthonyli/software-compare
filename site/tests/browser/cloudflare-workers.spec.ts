import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.189'}});
test('Workers appears beside Pages and renders scoped quotas in both languages',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});
  await page.goto('/c/web-hosting/');
  for(const lang of ['zh-CN','en']){
   await page.locator(`[data-lang="${lang}"]`).click();
   const list=page.locator(width===1280?'#matrix':'#card-list');
   await expect(list.locator('[data-product-id="cloudflare-workers"]')).toBeVisible();
   await expect(list.locator('[data-product-id="cloudflare-pages"]')).toBeVisible();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   await page.screenshot({path:`../docs/design/previews/payment-page-workers-compare-${lang}-${width}.png`,fullPage:true});
  }
  await page.goto('/p/web-hosting/cloudflare-workers/');
  for(const lang of ['zh-CN','en']){
   await page.locator(`[data-lang="${lang}"]`).click();
   const active=lang==='en'?'en':'zh';
   await expect(page.locator(`h1 .t-${active}`)).toHaveText('Cloudflare Workers');
   const notes=page.locator('.feature-row p');await expect(notes).toHaveCount(6);
   const phrases=['20,000','3,000','10ms','not explicitly confirmed','429','no credit card'];
   for(let i=0;i<6;i++){
    await expect(notes.nth(i).locator(`.t-${active}`)).toBeVisible();
    if(lang==='en'){await expect(notes.nth(i).locator('.t-en')).toContainText(phrases[i]);await expect(notes.nth(i).locator('.t-en')).not.toHaveText(/[\u4e00-\u9fff]/);}
   }
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   await page.screenshot({path:`../docs/design/previews/payment-page-workers-detail-${lang}-${width}.png`,fullPage:true});
  }
 }
});
