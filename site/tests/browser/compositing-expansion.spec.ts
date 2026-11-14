import {test,expect} from '@playwright/test';
test('professional compositors render and keep commercial distinctions',async({page})=>{
 for(const width of [1280,390]){await page.setViewportSize({width,height:900});await page.goto('/c/compositing/');const list=page.locator(width===1280?'#matrix':'#card-list');for(const id of ['fusion-studio','nuke'])await expect(list.locator(`[data-product-id="${id}"]`)).toBeVisible();await page.locator('[data-lang="en"]').click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
 await page.goto('/p/compositing/fusion-studio/');await expect(page.locator('body')).toContainText('not Fusion inside free Resolve');
 await page.goto('/p/compositing/nuke/');await expect(page.locator('body')).toContainText('1920');await expect(page.locator('body')).toContainText('Non-commercial');
});
