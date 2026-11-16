import {test,expect} from '@playwright/test';
// Real Worker requests; dedicated TEST-NET client avoids cross-suite session limits.
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.245'}});
test('website hosting quotas, language visibility and cover render on desktop and mobile',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/');
  const card=page.locator('a.dir-card[href="/c/web-hosting/"]');await card.scrollIntoViewIfNeeded();await expect(card).toBeVisible();await expect.poll(()=>card.locator('img').evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
  await page.screenshot({path:`../docs/design/previews/payment-page-webhosting-home-${width}.png`});
  await page.goto('/c/web-hosting/');
  for(const lang of ['zh-CN','en']){
   await page.locator(`[data-lang="${lang}"]`).click();
   const active=lang==='en'?'en':'zh',hidden=lang==='en'?'zh':'en';
   await expect(page.locator(`h1 .t-${active}`)).toBeVisible();await expect(page.locator(`h1 .t-${hidden}`)).toBeHidden();
   await expect(page.locator(`h1 .t-${active}`)).toHaveText(lang==='en'?'Website deployment':'网站部署');
   const list=page.locator(width===1280?'#matrix':'#card-list');
   for(const id of ['vercel','cloudflare-pages']){
    const row=list.locator(`[data-product-id="${id}"]`);await expect(row).toBeVisible();const name=row.locator(width===1280?'.product-name':'.card-title');
    await expect(name.locator(`.t-${active}`)).toBeVisible();await expect(name.locator(`.t-${hidden}`)).toBeHidden();
    await expect(name.locator(`.t-${active}`)).toHaveText(id==='vercel'?'Vercel':'Cloudflare Pages');
    await row.locator('details summary').click();
   }
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   await page.screenshot({path:`../docs/design/previews/payment-page-webhosting-${active}-${width}.png`,fullPage:true});
   for(const detail of await list.locator('details[open] summary').all())await detail.click();
  }
 }
 await page.goto('/p/web-hosting/cloudflare-pages/');await expect(page.locator('h1 .t-en')).toBeVisible();await expect(page.locator('h1 .t-en')).toHaveText('Cloudflare Pages');
 await expect(page.locator('body')).toContainText('100,000 requests/day');await expect(page.locator('body')).toContainText('no credit card');
 await page.screenshot({path:'../docs/design/previews/payment-page-webhosting-detail.png',fullPage:true});
});
