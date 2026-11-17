import {test,expect} from '@playwright/test';
test('agent browser tools remain a separate bilingual category at desktop and mobile widths',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/c/agent-browser-tools/');
  const list=page.locator(width===1280?'#matrix':'#card-list');
  for(const id of ['agent-browser','browser-use','stagehand','playwright-mcp'])await expect(list.locator(`[data-product-id="${id}"]`)).toBeVisible();
  await expect(page.locator('[data-agent-browser-notes]')).toContainText('不是人用浏览器');
  const bu=list.locator('[data-product-id="browser-use"]');
  await expect(bu).toContainText('不含云浏览器和代理费用');
  const mcp=list.locator('[data-product-id="playwright-mcp"]');
  await mcp.locator('details summary').click();
  await expect(mcp.locator('details[open]')).toContainText('默认持久 profile');
  await expect(mcp.locator('details[open]')).toContainText('不构成安全边界且不影响重定向');
  await page.locator('[data-lang="en"]').click();await expect(page.getByRole('heading',{name:'Agent browser tools',exact:true})).toBeVisible();
  await expect(list).toContainText('Local browser execution');
  await expect(page.locator('[data-agent-browser-notes]')).toContainText('separately from consumer browsers');
  await expect(bu).toContainText('excludes cloud browser and proxy charges');
  await expect(mcp.locator('details[open]')).toContainText('persistent profile retains logins');
  await expect(mcp.locator('details[open]')).toContainText('not security boundaries');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.reload();await expect(page.getByRole('heading',{name:'Agent browser tools',exact:true})).toBeVisible();
  await page.locator('[data-lang="zh-CN"]').click();
 }
 await page.goto('/p/agent-browser-tools/playwright-mcp/');await expect(page.locator('body')).toContainText('不构成安全边界');
 await page.locator('[data-lang="en"]').click();await expect(page.locator('body')).toContainText('not security boundaries');
});
test('agent tool search and source-backed detail navigation work',async({page,request})=>{
 const response=await request.get('/search-index.json');const data=await response.json();
 for(const id of ['agent-browser','browser-use','stagehand','playwright-mcp'])expect(data.products.some(p=>p.href===`/p/agent-browser-tools/${id}/`)).toBe(true);
 await page.goto('/');await page.locator('#site-search-hero').fill('Stagehand');
 await page.locator('.search-hit[href="/p/agent-browser-tools/stagehand/"]').click();
 await expect(page.getByRole('heading',{name:'Stagehand',exact:true})).toBeVisible();
});
