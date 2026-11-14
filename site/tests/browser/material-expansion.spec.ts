import {test,expect} from '@playwright/test';
test('material additions show desktop/mobile and English license boundaries',async({page})=>{
 for(const width of [1280,390]){await page.setViewportSize({width,height:900});await page.goto('/c/texture-materials/');const list=page.locator(width===1280?'#matrix':'#card-list');for(const id of ['substance-3d-painter','substance-3d-designer','armorpaint'])await expect(list.locator(`[data-product-id="${id}"]`)).toBeVisible();await page.locator('[data-lang="en"]').click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
 await page.goto('/p/texture-materials/armorpaint/');await expect(page.locator('body')).toContainText('official desktop binaries cost US$19');
 await page.goto('/p/texture-materials/substance-3d-painter/');await expect(page.locator('body')).toContainText('not automatically included in ordinary Creative Cloud');
});
