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
   for(const id of ['vercel','cloudflare-pages','render','netlify']){
    const row=list.locator(`[data-product-id="${id}"]`);await expect(row).toBeVisible();const name=row.locator(width===1280?'.product-name':'.card-title');
    await expect(name.locator(`.t-${active}`)).toBeVisible();await expect(name.locator(`.t-${hidden}`)).toBeHidden();
    await expect(name.locator(`.t-${active}`)).toHaveText(id==='vercel'?'Vercel':id==='render'?'Render':id==='netlify'?'Netlify':'Cloudflare Pages');
    await row.locator('details summary').click();
   }
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   await page.evaluate(()=>window.scrollTo(0,0));
   await expect.poll(()=>page.evaluate(()=>window.scrollY)).toBe(0);
   await page.screenshot({path:`../docs/design/previews/payment-page-webhosting-${active}-${width}.png`,fullPage:true});
   for(const id of ['vercel','cloudflare-pages','render','netlify']){
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

test('Netlify detail renders all public English and Chinese notes visibly',async({page})=>{
 await page.setViewportSize({width:390,height:900});await page.goto('/p/web-hosting/netlify/');
 for(const lang of ['zh-CN','en']){
  await page.locator(`[data-lang="${lang}"]`).click();
  const active=lang==='en'?'en':'zh',hidden=lang==='en'?'zh':'en';
  await expect(page.locator(`h1 .t-${active}`)).toHaveText('Netlify');
  await expect(page.locator(`h1 .t-${active}`)).toBeVisible();await expect(page.locator(`h1 .t-${hidden}`)).toBeHidden();
  const notes=page.locator('.feature-row p');await expect(notes).toHaveCount(6);
  const phrases=['300 credits','15 credits','10 credits/GB-hour','commercial projects','entire team','unconfirmed'];
  for(let i=0;i<6;i++){
   await expect(notes.nth(i).locator(`.t-${active}`)).toBeVisible();await expect(notes.nth(i).locator(`.t-${hidden}`)).toBeHidden();
   if(lang==='en'){await expect(notes.nth(i).locator('.t-en')).not.toHaveText(/[\u4e00-\u9fff]/);await expect(notes.nth(i).locator('.t-en')).toContainText(phrases[i]);}
  }
  const limits=page.locator('.price-panel > .mt-5 p');
  await expect(limits.locator(`.t-${active}`)).toBeVisible();await expect(limits.locator(`.t-${hidden}`)).toBeHidden();
  if(lang==='en'){await expect(limits.locator('.t-en')).not.toHaveText(/[\u4e00-\u9fff]/);await expect(limits.locator('.t-en')).toContainText('legacy plans');}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.evaluate(()=>window.scrollTo(0,0));await expect.poll(()=>page.evaluate(()=>window.scrollY)).toBe(0);
  await page.screenshot({path:`../docs/design/previews/payment-page-netlify-detail-${active}.png`,fullPage:true});
 }
});

test('Firebase Hosting renders disputed quotas and App Hosting boundaries on both layouts', async ({ page }) => {
 for (const width of [1280, 390]) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto('/c/web-hosting/');
  await expect(page.locator(width === 1280 ? '#matrix' : '#card-list').locator('[data-product-id="firebase-hosting"]')).toBeVisible();
  await page.goto('/p/web-hosting/firebase-hosting/');
  for (const lang of ['zh-CN', 'en']) {
   await page.locator(`[data-lang="${lang}"]`).click();
   const english = lang === 'en', active = english ? 'en' : 'zh';
   const rows = page.locator('.feature-row');
   await expect(rows).toHaveCount(6);
   await expect(rows.nth(1).locator(`p .t-${active}`)).toContainText(english ? 'not on build minutes included with Hosting' : '不等于 Hosting 赠送构建分钟');
   await expect(rows.nth(2).locator(`p .t-${active}`)).toContainText(english ? 'require Blaze for deployment' : '部署这些动态后端需 Blaze');
   await expect(rows.nth(3).locator('.feat-empty')).toHaveAttribute('title', english ? 'Unknown' : '未知');
   await expect(rows.nth(5).locator(`p .t-${active}`)).toContainText(english ? 'Spark does not require a payment method' : 'Spark 不需要支付方式');
   const limits = page.locator(`.price-panel > .mt-5 p .t-${active}`);
   await expect(limits).toBeVisible();
   await expect(limits).toContainText(english ? /360 MB\/day.*10 GB\/month.*periods conflict/ : /每天 360 MB.*每月 10 GB.*周期不一致/);
   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
 }
});

test('GitHub Pages shows private-source and private-publication limits in both layouts', async ({ page }) => {
 for (const width of [1280, 390]) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto('/c/web-hosting/');
  await expect(page.locator(width === 1280 ? '#matrix' : '#card-list').locator('[data-product-id="github-pages"]')).toBeVisible();
  await page.goto('/p/web-hosting/github-pages/');
  for (const lang of ['zh-CN', 'en']) {
   await page.locator(`[data-lang="${lang}"]`).click();
   const english = lang === 'en', active = english ? 'en' : 'zh';
   const rows = page.locator('.feature-row');
   await expect(rows.nth(2).locator('.feat')).toHaveAttribute('title', english ? 'No' : '不支持');
   await expect(rows.nth(5).locator('.feat-empty')).toHaveAttribute('title', english ? 'Unknown' : '未知');
   await expect(page.locator(`.price-panel > .mt-5 p .t-${active}`)).toContainText(english ? 'does not mean private publication' : '不能把 Pro 支持私有源仓库理解成私有发布');
   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
 }
});

test('Firebase App Hosting is distinct from classic Hosting on both layouts',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});
  await page.goto('/c/web-hosting/');
  const list=page.locator(width===1280?'#matrix':'#card-list');
  for(const id of ['firebase-hosting','firebase-app-hosting']){
   await expect(list.locator(`[data-product-id="${id}"]`)).toBeVisible();
  }
  await page.goto('/p/web-hosting/firebase-app-hosting/');
  for(const [lang,quota,budget,payment] of [
   ['zh-CN','每月 10 GiB 出站流量免收费','预算告警不是硬性费用上限','有效支付方式'],
   ['en','first 10 GiB of monthly outbound bandwidth','Budget alerts are not a hard spending cap','valid payment method'],
  ]){
   await page.locator(`[data-lang="${lang}"]`).click();
   for(const text of [quota,budget,payment,'USD 0.15','USD 0.20']){
    await expect(page.getByText(text,{exact:false}).filter({visible:true}).first()).toBeVisible();
   }
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
