import {test,expect} from '@playwright/test';
test('domain registrars render bilingually at desktop and mobile widths',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/');
  const card=page.locator('a.dir-card[href="/c/domain-registration/"]');await card.scrollIntoViewIfNeeded();await expect(card).toBeVisible();
  await expect.poll(()=>card.locator('img').evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
  await page.screenshot({path:`../docs/design/previews/domain-page-home-${width}.png`});
  await page.goto('/c/domain-registration/');
  const list=page.locator(width===1280?'#matrix':'#card-list');
  for(const id of ['cloudflare-registrar','porkbun','namecheap-domains','aliyun-domains','tencent-domains'])await expect(list.locator(`[data-product-id="${id}"]`)).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.locator('[data-lang="en"]').click();await expect(page.locator('body')).toContainText('Domain registration');
  await page.screenshot({path:`../docs/design/previews/domain-page-comparison-${width}.png`});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
 await page.goto('/p/domain-registration/cloudflare-registrar/');await expect(page.locator('body')).toContainText('Cloudflare authoritative DNS is mandatory');
 await expect(page.locator('body')).not.toContainText('$未知');
});
