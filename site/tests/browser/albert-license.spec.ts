import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.190'}});
test('Albert is source-available rather than open source in both languages and widths',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/c/launchers/');
  const row=page.locator(width===1280?'#matrix':'#card-list').locator('[data-product-id="albert"]');
  for(const lang of ['en','zh-CN']){
   await page.locator(`[data-lang="${lang}"]`).click();const active=lang==='en'?'.t-en':'.t-zh';
   await expect(row).toBeVisible();await expect(row).toHaveAttribute('data-oss','0');await expect(row.locator('.chip-oss')).toHaveCount(0);
   await expect(row.locator(active).filter({hasText:lang==='en'?'Free for personal use':'个人免费'}).first()).toBeVisible();
   await expect(row).toHaveAttribute('data-platforms',/Linux/);await expect(row).toHaveAttribute('data-platforms',/macOS/);
  }
  await page.goto('/p/launchers/albert/');
  for(const lang of ['en','zh-CN']){
   await page.locator(`[data-lang="${lang}"]`).click();const active=lang==='en'?'.t-en':'.t-zh';
   await expect(page.locator('main '+active).filter({hasText:lang==='en'?'Free for personal use':'个人免费'}).first()).toBeVisible();
   const limits=page.locator('.price-panel > .mt-5 > p '+active);
   await expect(limits).toContainText(lang==='en'?'does not grant redistribution of modified versions':'不授予修改版再分发权');
   await expect(limits).toContainText(lang==='en'?'not a ban on personal macOS use':'不等于禁止 macOS 个人使用');
   if(lang==='en')await expect(limits).not.toHaveText(/[\u4e00-\u9fff]/);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
