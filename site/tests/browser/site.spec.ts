import {test,expect} from '@playwright/test';
const origin='http://127.0.0.1:8788';
test('Pages serves assets and API separately without exposing the worker bundle',async({request})=>{
 expect((await request.get('/')).status()).toBe(200);
 expect((await request.get('/vote-catalog.json')).status()).toBe(200);
 expect((await request.get('/this-page-does-not-exist/')).status()).toBe(404);
 const bundle=await request.get('/_worker.js');
 // Pages dev currently returns 502 for this reserved path; neither local nor
 // production asset serving may expose the function source.
 expect(bundle.status()).toBeGreaterThanOrEqual(400);
 expect(await bundle.text()).not.toContain('async function createIdentity');
 const unknown=await request.get('/api/not-found');
 expect(unknown.status()).toBe(404);
 expect(await unknown.json()).toEqual({error:'not_found'});
});
test('anonymous votes persist, share across categories and change ranking',async({page,browser})=>{
 await page.goto('/c/screenshot-tools/');
 const vote=page.locator('#matrix [data-vote-id="sharex"]');
 await expect(vote).toBeEnabled();
 await vote.click();
 await expect(vote).toHaveAttribute('aria-pressed','true');
 await expect(page.locator('#matrix tbody tr').first()).toHaveAttribute('data-product-id','sharex');
 const count=Number(await vote.locator('[data-vote-count]').innerText());
 await page.reload();await expect(vote).toHaveAttribute('aria-pressed','true');
 await page.getByRole('button',{name:'卡片',exact:true}).click();
 await expect(page.locator('#matrix')).toBeHidden();
 await expect(page.locator('#card-list [data-vote-id="sharex"]')).toHaveAttribute('aria-pressed','true');
 const second=await browser.newContext();const visitor=await second.newPage();
 await visitor.goto('/p/screen-recorders/sharex/');
 await expect(visitor.locator('[data-vote-id="sharex"] [data-vote-count]')).toHaveText(String(count));
 await expect(visitor.locator('[data-vote-id="sharex"]')).toHaveAttribute('aria-pressed','false');
 await visitor.locator('[data-vote-id="sharex"]').click();
 await expect(visitor.locator('[data-vote-count]')).toHaveText(String(count+1));
 await page.goto('/p/screen-recorders/sharex/');
 await expect(page.locator('[data-vote-id="sharex"]')).toHaveAttribute('aria-pressed','true');
 await expect(page.locator('[data-vote-count]')).toHaveText(String(count+1));
 await page.locator('[data-vote-id="sharex"]').click();
 await expect(page.locator('[data-vote-count]')).toHaveText(String(count));
 await expect(page.locator('[data-vote-id="sharex"]')).toHaveAttribute('aria-pressed','false');
 await second.close();
});
test('API is idempotent, rejects forged identity, cross-origin and unknown IDs',async({playwright})=>{
 const api=await playwright.request.newContext({baseURL:origin});
 let response=await api.get('/api/votes?ids=rustdesk');expect(response.status()).toBe(200);
 expect(response.headers()['cache-control']).toContain('no-store');
 const initial=(await response.json()).votes[0].count;
 for(let i=0;i<3;i++) {
  response=await api.put('/api/votes',{headers:{Origin:origin},data:{id:'rustdesk',liked:true}});
  expect(response.status()).toBe(200);expect((await response.json()).vote.count).toBe(initial+1);
 }
 response=await api.put('/api/votes',{headers:{Origin:'https://evil.example'},data:{id:'rustdesk',liked:false}});expect(response.status()).toBe(403);
 response=await api.put('/api/votes',{headers:{Origin:origin},data:{id:'invented-software',liked:true}});expect(response.status()).toBe(400);
 response=await api.put('/api/votes',{headers:{Origin:origin,Cookie:'compare_voter=forged'},data:{id:'rustdesk',liked:false}});expect(response.status()).toBe(401);
 response=await api.put('/api/votes',{headers:{Origin:origin},data:{id:'rustdesk',liked:false}});expect((await response.json()).vote.count).toBe(initial);
 response=await api.put('/api/votes',{headers:{Origin:origin},data:{id:'rustdesk',liked:false}});expect((await response.json()).vote.count).toBe(initial);
 await api.dispose();
});
test('views, GitHub header, dates, language and mobile layout',async({page})=>{
 for(const width of [375,390,767,768,1440]) {
  await page.setViewportSize({width,height:900});await page.goto('/c/remote-desktop/');
  await expect(page.locator(width>=768?'#matrix':'#card-list')).toBeVisible();
  await expect(page.locator(width>=768?'#card-list':'#matrix')).toBeHidden();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await expect(page.locator('.header-github')).toBeVisible();
 }
 await expect(page.locator('.header-github')).toHaveAttribute('href','https://github.com/anthonyli/software-compare');
 await expect(page.locator('.site-footer')).toContainText('软件资料（价格、功能、平台与许可证）采集于 2026-11-12');
 await expect(page.locator('.site-footer [data-github-freshness]')).toContainText('GitHub');
 await page.locator('[data-lang="en"]').click();
 await expect(page.locator('.site-footer')).toContainText('Software details');
 await page.locator('[data-view="cards"]').click();await page.reload();
 await expect(page.locator('#card-list')).toBeVisible();
 await page.locator('[data-view="table"]').click();await expect(page.locator('#matrix')).toBeVisible();
});
test('failed vote does not invent a count and retry restores service',async({page})=>{
 await page.route('**/api/votes*',route=>route.fulfill({status:503,contentType:'application/json',body:'{"error":"unavailable"}'}));
 await page.goto('/p/screenshot-tools/flameshot/');
 await expect(page.locator('[data-vote-status]')).toBeVisible();
 await expect(page.locator('[data-vote-count]')).toHaveText('—');
 await expect(page.locator('[data-vote-id]')).toBeDisabled();
 await page.unroute('**/api/votes*');await page.locator('[data-vote-retry]').click();
 await expect(page.locator('[data-vote-id]')).toBeEnabled();
 const before=await page.locator('[data-vote-count]').innerText();
 await page.route('**/api/votes',route=>route.fulfill({status:503,contentType:'application/json',body:'{}'}));
 await page.locator('[data-vote-id]').click();
 await expect(page.locator('[data-vote-status]')).toBeVisible();
 await expect(page.locator('[data-vote-count]')).toHaveText(before);
 await expect(page.locator('[data-vote-id]')).toHaveAttribute('aria-pressed','false');
});
test('filter reset and empty search do not leave stale state',async({page})=>{
 await page.goto('/c/cleaners/');
 const choose=async(name:string,value:string)=>{
  const menu=page.locator('[data-filter-menu]').filter({has:page.locator(`input[name="${name}"]`)});
  await menu.locator('[data-fmenu-btn]').click();
  await menu.locator(`[data-value="${value}"]`).click();
 };
 await choose('sort','name');await choose('platform','Windows');await choose('status','暂停维护');
 await page.locator('label.filter-chip').filter({has:page.locator('input[name="oss"]')}).click();
 await expect(page.locator('#empty-filter')).toBeVisible();
 await page.locator('[data-reset]').click();await expect(page.locator('[data-count]')).toHaveText('显示 23 / 23');
 await expect(page.locator('input[name="sort"]')).toHaveValue('likes');
 const menu=page.locator('[data-filter-menu]').filter({has:page.locator('input[name="platform"]')});
 await expect(menu.locator('[data-fmenu-btn]')).toContainText('全部');
 const input=page.locator('#site-search-header');await input.fill('ShareX');
 await expect(page.locator('.search-hit').first()).toBeVisible();
 await input.fill('zzzz-nonexistent-123');await expect(page.locator('[data-search-results]')).toContainText('没有找到');
 await input.press('Enter');await expect(page).toHaveURL(/\/c\/cleaners\//);
});
test('concurrent retries count once and excessive writes are limited',async({playwright})=>{
 const api=await playwright.request.newContext({baseURL:origin});
 const initial=(await (await api.get('/api/votes?ids=sunshine')).json()).votes[0].count;
 const results=await Promise.all(Array.from({length:5},()=>api.put('/api/votes',{headers:{Origin:origin},data:{id:'sunshine',liked:true}})));
 for(const result of results) {expect(result.status()).toBe(200);expect((await result.json()).vote.count).toBe(initial+1);}
 let limited=false;
 for(let i=0;i<35;i++) {
  const response=await api.put('/api/votes',{headers:{Origin:origin},data:{id:'sunshine',liked:true}});
  if(response.status()===429) {expect(response.headers()['retry-after']).toBe('60');limited=true;break;}
 }
 expect(limited).toBe(true);
 expect((await (await api.get('/api/votes?ids=sunshine')).json()).votes[0].count).toBe(initial+1);
 await api.dispose();
});

test('expanded catalog links, English labels and requested recorders', async ({page}) => {
 await page.goto('/');
 for (const slug of ['ai-assistants','image-editors','vector-graphics','photo-management','desktop-publishing','ai-coding','ai-image-workflows','animation-3d','animation-2d','compositing','database-clients','api-clients','audio-recorders','transcription-tools','fitness-training','cycling-tools','outdoor-navigation']) {
  await expect(page.locator(`main a[href="/c/${slug}/"]`).first()).toBeVisible();
 }
 await page.goto('/c/local-ai/');
 await expect(page.locator('main')).toContainText('Ollama');
 await page.locator('[data-lang="en"]').click();
 await expect(page.locator('h1')).toContainText('AI chat assistants');
 await page.goto('/p/screen-recorders/focusee/');
 await expect(page.locator('main')).toContainText('FocuSee');
 await page.goto('/p/screen-recorders/screen-studio/');
 await expect(page.locator('main')).toContainText('Screen Studio');
});
