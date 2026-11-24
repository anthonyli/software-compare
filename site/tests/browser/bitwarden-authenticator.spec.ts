import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.206'}});
test('standalone Bitwarden Authenticator limits stay localized on desktop and mobile',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});
  await page.goto('/c/authenticators/');
  await expect(page.locator(width===1280?'#matrix':'#card-list').locator('[data-product-id="bitwarden-authenticator"]')).toBeVisible();
  await page.goto('/p/authenticators/bitwarden-authenticator/');
  for(const lang of ['zh-CN','en']){
   await page.locator(`[data-lang="${lang}"]`).click();
   const english=lang==='en';
   const rows=page.locator('.feature-row');
   await expect(rows.nth(2).locator('.feat')).toHaveText(english?'Partial':'部分',{useInnerText:true});
   await expect(rows.nth(3).locator('.feat')).toHaveText('✗',{useInnerText:true});
   await expect(rows.nth(3).locator('.feat')).toHaveAttribute('title',english?'No':'不支持');
   await expect(rows.nth(4).locator('.feat')).toHaveText('✗',{useInnerText:true});
   const limits=page.locator('.price-panel .mt-5 p');
   await expect(limits).toContainText(english?'not confirmed':'尚未确认');
   await expect(limits).toContainText(english?'minSdk 29':'minSdk 为 29');
   await expect(page.locator('body')).toContainText(english?'cause a lockout':'造成锁出');
   await expect(page.locator('body')).toContainText(english?'does not override that statement':'端到端加密表述不覆盖');
   await expect(page.locator('body')).not.toContainText('otpauth://');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
