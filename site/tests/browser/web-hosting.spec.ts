import {test,expect} from '@playwright/test';
// Real Worker requests; dedicated TEST-NET client avoids cross-suite session limits.
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.245'}});
test('website hosting quotas, language visibility and cover render on desktop and mobile',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/');
  const card=page.locator('a.dir-card[href="/c/web-hosting/"]');await card.scrollIntoViewIfNeeded();await expect(card).toBeVisible();await expect.poll(()=>card.locator('img').evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
  await page.evaluate(()=>window.scrollTo(0,0));await expect.poll(()=>page.evaluate(()=>window.scrollY)).toBe(0);
  await page.screenshot({path:`../docs/design/previews/payment-page-webhosting-home-${width}.png`,fullPage:true});
  await page.goto('/c/web-hosting/');
  for(const lang of ['zh-CN','en']){
   await page.locator(`[data-lang="${lang}"]`).click();
   const active=lang==='en'?'en':'zh',hidden=lang==='en'?'zh':'en';
   await expect(page.locator(`h1 .t-${active}`)).toBeVisible();await expect(page.locator(`h1 .t-${hidden}`)).toBeHidden();
   await expect(page.locator(`h1 .t-${active}`)).toHaveText(lang==='en'?'Website deployment':'网站部署');
   const list=page.locator(width===1280?'#matrix':'#card-list');
   for(const id of ['vercel','cloudflare-pages','render']){
    const row=list.locator(`[data-product-id="${id}"]`);await expect(row).toBeVisible();const name=row.locator(width===1280?'.product-name':'.card-title');
    await expect(name.locator(`.t-${active}`)).toBeVisible();await expect(name.locator(`.t-${hidden}`)).toBeHidden();
    await expect(name.locator(`.t-${active}`)).toHaveText(id==='vercel'?'Vercel':id==='render'?'Render':'Cloudflare Pages');
    await row.locator('details summary').click();
   }
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   await page.evaluate(()=>window.scrollTo(0,0));
   await expect.poll(()=>page.evaluate(()=>window.scrollY)).toBe(0);
   await page.screenshot({path:`../docs/design/previews/payment-page-webhosting-${active}-${width}.png`,fullPage:true});
   for(const id of ['vercel','cloudflare-pages','render']){
    const detail=list.locator(`[data-product-id="${id}"] details`);
    await detail.locator('summary').click();
    await expect(detail).not.toHaveAttribute('open');
   }
  }
 }
 await page.goto('/p/web-hosting/cloudflare-pages/');await expect(page.locator('h1 .t-en')).toBeVisible();await expect(page.locator('h1 .t-en')).toHaveText('Cloudflare Pages');
 await expect(page.locator('body')).toContainText('100,000 requests/day');await expect(page.locator('body')).toContainText('no credit card');
 await page.screenshot({path:'../docs/design/previews/payment-page-webhosting-detail.png',fullPage:true});
});

test('Render detail renders all public English and Chinese notes visibly',async({page})=>{
 await page.setViewportSize({width:390,height:900});await page.goto('/p/web-hosting/render/');
 for(const lang of ['zh-CN','en']){
  await page.locator(`[data-lang="${lang}"]`).click();
  const active=lang==='en'?'en':'zh',hidden=lang==='en'?'zh':'en';
  await expect(page.locator(`h1 .t-${active}`)).toHaveText('Render');
  await expect(page.locator(`h1 .t-${active}`)).toBeVisible();await expect(page.locator(`h1 .t-${hidden}`)).toBeHidden();
  const notes=page.locator('.feature-row p');await expect(notes).toHaveCount(6);
  const phrases=['5GB','500 Starter','750 instance hours','commercial-use','USD0.15/GB','no credit card'];
  for(let i=0;i<6;i++){
   await expect(notes.nth(i).locator(`.t-${active}`)).toBeVisible();await expect(notes.nth(i).locator(`.t-${hidden}`)).toBeHidden();
   if(lang==='en'){await expect(notes.nth(i).locator('.t-en')).not.toHaveText(/[\u4e00-\u9fff]/);await expect(notes.nth(i).locator('.t-en')).toContainText(phrases[i]);}
  }
  const limits=page.locator('.price-panel > .mt-5 p');
  await expect(limits.locator(`.t-${active}`)).toBeVisible();await expect(limits.locator(`.t-${hidden}`)).toBeHidden();
  if(lang==='en'){await expect(limits.locator('.t-en')).not.toHaveText(/[\u4e00-\u9fff]/);await expect(limits.locator('.t-en')).toContainText('750 free instance hours');}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.evaluate(()=>window.scrollTo(0,0));await expect.poll(()=>page.evaluate(()=>window.scrollY)).toBe(0);
  await page.screenshot({path:`../docs/design/previews/payment-page-render-detail-${active}.png`,fullPage:true});
 }
});
