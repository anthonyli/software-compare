import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.242'}});
test('Antares appears in both database layouts with English engine boundaries',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/c/database-clients/');await expect(page.locator(width===1280?'#matrix':'#card-list').locator('[data-product-id="antares"]')).toBeVisible();await page.locator('[data-lang="en"]').click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
 await page.goto('/p/database-clients/antares/');await expect(page.locator('body')).toContainText('Linux alone checked for ARM');await expect(page.locator('body')).toContainText('DuckDB/SQL Server are unchecked');await expect(page.locator('body')).toContainText('not universal backup/restore');
});
