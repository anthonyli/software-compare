import {test,expect} from '@playwright/test';
test('free access copy and share metadata are server-rendered, image is publicly fetchable',async({page,request})=>{
 const response=await request.get('/');expect(response.status()).toBe(200);
 const html=await response.text();expect(html).toContain('Compare 免费浏览与比较，无需注册');expect(html).toContain('og:image');
 for(const width of [390,1280]){
  await page.setViewportSize({width,height:900});await page.goto('/');
  await page.locator('[data-lang="zh-CN"]').click();await expect(page.locator('[data-free-access] .t-zh')).toBeVisible();
  await page.locator('[data-lang="en"]').click();await expect(page.locator('[data-free-access] .t-en')).toContainText('no registration required');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
 const image=page.locator('meta[property="og:image"]');const url=await image.getAttribute('content');
 expect(new URL(url!).pathname).toBe('/social/compare-preview.png');
 await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content',url!);
 await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content','summary_large_image');
 // Read same asset from the test server; configured canonical origin can differ in CI.
 const png=await request.get(new URL(url!).pathname);expect(png.status()).toBe(200);expect(png.headers()['content-type']).toContain('image/png');
 const bytes=await png.body();expect(bytes.readUInt32BE(16)).toBe(1200);expect(bytes.readUInt32BE(20)).toBe(630);
});
