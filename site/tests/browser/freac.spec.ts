import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.243'}});
test('fre:ac shows audio-only evidence boundaries in both converter layouts',async({page})=>{
 for(const width of [1280,390]){await page.setViewportSize({width,height:900});await page.goto('/c/converters/');await expect(page.locator(width===1280?'#matrix':'#card-list').locator('[data-product-id="freac"]')).toBeVisible();await page.locator('[data-lang="en"]').click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
 await page.goto('/p/converters/freac/');await expect(page.locator('body')).toContainText('GPL-2.0-or-later');await expect(page.locator('body')).toContainText('video-track extraction in this column is not');await expect(page.locator('body')).toContainText('not GPU or dedicated video hardware encoding');await expect(page.locator('body')).toContainText('does not establish video resizing');
});
