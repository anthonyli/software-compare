import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.195'}});
test('verified screenshot capabilities render in both languages and widths',async({page})=>{
 for(const [id,index] of [['flameshot',6],['sharex',9]] as const)for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto(`/p/screenshot-tools/${id}/`);
  for(const lang of ['en','zh-CN']){
   await page.locator(`[data-lang="${lang}"]`).click();
   const row=page.locator('.feature-row').nth(index);
   await expect(row.locator('.feat')).toBeVisible();await expect(row.locator('.feat-empty')).toHaveCount(0);
   await expect(row.locator('.feat')).toHaveAttribute('data-zh','支持');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
