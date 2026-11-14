import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.135'}});
test('proxy category appears near homepage start and supports bilingual mobile tables',async({page})=>{
 await page.goto('/');await expect(page.locator('#group-network .dir-grid a[href="/c/proxy-clients/"]')).toBeVisible();
 for(const width of [1280,390]){await page.setViewportSize({width,height:900});await page.goto('/c/proxy-clients/');const list=page.locator(width===1280?'#matrix':'#card-list');for(const id of ['clash-verge-rev','clash-party','v2rayn'])await expect(list.locator(`[data-product-id="${id}"]`)).toBeVisible();await page.locator('[data-lang="en"]').click();await expect(page.locator('[data-proxy-notes]')).toContainText('returned 404');await expect(page.getByRole('heading',{name:'Proxy clients',exact:true})).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
 await page.goto('/p/proxy-clients/clash-party/');await expect(page.locator('body')).toContainText('The former Mihomo Party repository');
});
