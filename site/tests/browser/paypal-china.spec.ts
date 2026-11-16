import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.244'}});
test('PayPal China keeps bilingual eligibility and route-specific fees on desktop and mobile',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/c/international-payments/');
  await page.locator('[data-lang="zh-CN"]').click();
  const row=page.locator(width===1280?'#matrix':'#card-list').locator('[data-product-id="paypal-china"]');
  await expect(row).toBeVisible();
  const name=row.locator(width===1280?'.product-name':'.card-title');
  await expect(name.locator('.t-zh')).toBeVisible();await expect(name.locator('.t-zh')).toHaveText('PayPal（中国大陆卖家）');
  await expect(name.locator('.t-en')).toBeHidden();
  await page.locator('[data-lang="en"]').click();
  await expect(name.locator('.t-en')).toBeVisible();await expect(name.locator('.t-en')).toHaveText('PayPal (mainland China sellers)');
  await expect(name.locator('.t-zh')).toBeHidden();
  await expect(row).toContainText('4.4% + USD 0.30');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
 await page.goto('/p/international-payments/paypal-china/');
 await expect(page.locator('h1 .t-en')).toBeVisible();await expect(page.locator('h1 .t-en')).toHaveText('PayPal (mainland China sellers)');
 await expect(page.locator('h1 .t-zh')).toBeHidden();
 await expect(page.locator('body')).toContainText('not a consumer personal account');
 await expect(page.locator('body')).toContainText('not 6% of principal');
 await expect(page.locator('body')).toContainText('USD 35 applies only');
 await page.locator('[data-lang="zh-CN"]').click();
 await expect(page.locator('h1 .t-zh')).toBeVisible();await expect(page.locator('h1 .t-zh')).toHaveText('PayPal（中国大陆卖家）');
 await expect(page.locator('h1 .t-en')).toBeHidden();await expect(page.locator('body')).toContainText('主体及控制人');
});
