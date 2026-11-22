import {test,expect} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.247'}});
test('cloud SQL quotas and caveats remain visible in both languages and viewport sizes',async({page})=>{
 await mkdir('../docs/design/previews',{recursive:true});
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/');
  const card=page.locator('a.dir-card[href="/c/cloud-sql-databases/"]');await card.scrollIntoViewIfNeeded();await expect(card).toBeVisible();await expect.poll(()=>card.locator('img').evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
  await page.goto('/c/cloud-sql-databases/');
  const list=page.locator(width===1280?'#matrix':'#card-list');
  for(const lang of ['en','zh-CN']){
   await page.locator(`[data-lang="${lang}"]`).click();const active=lang==='en'?'.t-en':'.t-zh',hidden=lang==='en'?'.t-zh':'.t-en';
   await expect(page.locator('h1 '+active)).toBeVisible();await expect(page.locator('h1 '+active)).toHaveText(lang==='en'?'Cloud SQL databases':'云 SQL 数据库');await expect(page.locator('h1 '+hidden)).toBeHidden();
   for(const id of ['turso','cloudflare-d1']){const row=list.locator(`[data-product-id="${id}"]`);await expect(row).toBeVisible();await row.locator('details summary').click();await expect(row.locator('details')).toHaveAttribute('open','');}
   await expect(list.locator(active).filter({hasText:lang==='en'?'500 million rows read per month':'每月 5 亿读行'}).first()).toBeVisible();
   await expect(list.locator(active).filter({hasText:lang==='en'?'00:00 UTC':'UTC 00:00'}).first()).toBeVisible();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   await page.evaluate(()=>window.scrollTo(0,0));await expect.poll(()=>page.evaluate(()=>scrollY)).toBe(0);
   await page.screenshot({path:`../docs/design/previews/payment-page-sql-${lang}-${width}.png`,fullPage:true});
   for(const id of ['turso','cloudflare-d1']){const details=list.locator(`[data-product-id="${id}"] details`);await details.locator('summary').click();await expect(details).not.toHaveAttribute('open','');}
  }
 }
 for(const id of ['turso','cloudflare-d1']){
  await page.goto(`/p/cloud-sql-databases/${id}/`);
  for(const lang of ['en','zh-CN']){await page.locator(`[data-lang="${lang}"]`).click();const active=lang==='en'?'.t-en':'.t-zh',hidden=lang==='en'?'.t-zh':'.t-en';await expect(page.locator('.feature-row')).toHaveCount(6);for(const row of await page.locator('.feature-row').all()){await expect(row.locator('p '+active)).toBeVisible();await expect(row.locator('p '+hidden)).toBeHidden();}}
 }
});

test('Aurora DSQL shows pooled DPU, recovery and card checks in both languages',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});
  await page.goto('/c/cloud-sql-databases/');
  await expect(page.locator(width===1280?'#matrix':'#card-list').locator('[data-product-id="aurora-dsql"]')).toBeVisible();
  await page.goto('/p/cloud-sql-databases/aurora-dsql/');
  for(const lang of ['zh-CN','en']){
   await page.locator(`[data-lang="${lang}"]`).click();
   const active=lang==='en'?'en':'zh';
   const rows=page.locator('.feature-row');await expect(rows).toHaveCount(6);
   await expect(rows.nth(1).locator(`p .t-${active}`)).toContainText(lang==='en'?'no separate free read-row quota':'没有独立免费读行配额');
   await expect(rows.nth(2).locator(`p .t-${active}`)).toContainText(lang==='en'?'no separate free write-row quota':'没有独立免费写行配额');
   await expect(rows.nth(4).locator('.feat')).toHaveAttribute('title',lang==='en'?'No':'不支持');
   await expect(rows.nth(4).locator(`p .t-${active}`)).toContainText(lang==='en'?'restores to a new cluster':'恢复会创建新集群');
   await expect(rows.nth(5).locator('.feat')).toHaveAttribute('title',lang==='en'?'Partial':'部分支持');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
