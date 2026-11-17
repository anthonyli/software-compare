import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.189'}});
test('SendGrid trial boundaries survive desktop/mobile and language changes',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});
  await page.goto('/c/transactional-email/');
  for(const lang of ['en','zh-CN']){
   await page.locator(`[data-lang="${lang}"]`).click();
   const active=lang==='en'?'.t-en':'.t-zh';
   const row=page.locator(width===1280?'#matrix':'#card-list').locator('[data-product-id="sendgrid"]');
   await expect(row).toBeVisible();await expect(row.locator(active).filter({hasText:lang==='en'?'60-day trial':'免费试用仅 60 天'}).first()).toBeVisible();
   await row.locator('details summary').click();
   await expect(row.locator('details '+active).filter({hasText:'Maximum credits exceeded'})).toBeVisible();
   await row.locator('details summary').click();
  }
  await page.goto('/p/transactional-email/sendgrid/');
  for(const lang of ['en','zh-CN']){
   await page.locator(`[data-lang="${lang}"]`).click();const active=lang==='en'?'.t-en':'.t-zh';
   const notes=page.locator('.feature-row p '+active);
   await expect(notes.nth(1)).toContainText(lang==='en'?'one 60-day trial':'一次 60 天试用');
   await expect(notes.nth(1)).toContainText('100');await expect(notes.nth(1)).toContainText('UTC');
   await expect(notes.nth(4)).toContainText(lang==='en'?'no credit card':'无需信用卡');
   await expect(notes.nth(5)).toContainText('Maximum credits exceeded');
   await expect(page.locator('.price-panel > .mt-5 > p '+active)).toContainText('Marketing Campaigns');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   if(lang==='en')for(const note of await notes.all())await expect(note).not.toHaveText(/[\u4e00-\u9fff]/);
  }
 }
});
