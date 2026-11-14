import {test,expect} from '@playwright/test';
test('hand-drawn additions render at both widths with localized limitations',async({page})=>{
 for(const width of [1280,390]){await page.setViewportSize({width,height:900});await page.goto('/c/animation-2d/');const list=page.locator(width===1280?'#matrix':'#card-list');for(const id of ['pencil2d','tahoma2d'])await expect(list.locator(`[data-product-id="${id}"]`)).toBeVisible();await page.locator('[data-lang="en"]').click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
 await page.goto('/p/animation-2d/tahoma2d/');await expect(page.locator('body')).toContainText('Mac download is labeled Intel');
 await page.goto('/p/animation-2d/pencil2d/');await expect(page.locator('body')).toContainText('unknown does not mean unsupported');
});
