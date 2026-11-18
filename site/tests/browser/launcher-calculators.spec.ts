import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.194'}});
test('verified launcher calculators render as supported in both languages and widths',async({page})=>{
 for(const id of ['flow-launcher','ulauncher'])for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto(`/p/launchers/${id}/`);
  for(const lang of ['en','zh-CN']){
   await page.locator(`[data-lang="${lang}"]`).click();
   const row=page.locator('.feature-row').filter({hasText:lang==='en'?'Calculator':'计算器'});
   await expect(row).toHaveCount(1);await expect(row.locator('.feat')).toBeVisible();await expect(row.locator('.feat-empty')).toHaveCount(0);
   await expect(row.locator('.feat')).toHaveAttribute('data-zh','支持');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
