import { test, expect, type Page } from '@playwright/test';
import { execFileSync } from 'node:child_process';

// Keep the guide's product-page visits outside the voting suite's per-IP quota.
test.use({extraHTTPHeaders: {'CF-Connecting-IP': '192.0.2.239'}});

const guide = '/guides/mac-free-screen-recorders/';
const visitApi = '/api/ai-visits';

async function choose(page: Page, name: string, value: string) {
  const menu = page.locator('[data-filter-menu]').filter({has: page.locator(`input[name="${name}"]`)});
  await menu.locator('[data-fmenu-btn]').click();
  await menu.locator(`[role="option"][data-value="${value}"]`).click();
}

test('AI arrival, repeated filtering, product navigation and official click share one D1 session', async ({ page, context }) => {
  await context.route('https://obsproject.com/**', route => route.fulfill({body:'Official site'}));
  await page.goto(guide + '?utm_source=chatgpt.com');
  await expect(page.locator('#guide-filters')).toBeVisible();
  await choose(page, 'version', 'legacy');
  await choose(page, 'need', 'audio');
  await expect(page.locator('#guide-empty')).toBeVisible();
  await page.locator('#guide-empty button').click();
  await expect(page.locator('[data-recorder]:visible')).toHaveCount(3);
  await choose(page, 'need', 'watermark');
  await expect(page.locator('[data-recorder]:visible')).toHaveCount(1);
  await page.locator('[data-recorder="obs-studio"] a[href^="/p/"]').click();
  await expect(page).toHaveURL(/\/p\/screen-recorders\/obs-studio\//);
  const ack = page.waitForResponse(r => r.url().endsWith(visitApi) && r.request().postDataJSON()?.actions.includes('visited_official'));
  await page.locator('[data-selection-official]').first().click();
  expect((await ack).status()).toBe(204);
  const state = await page.evaluate(() => JSON.parse(sessionStorage.getItem('compare-ai-visit')!));
  expect(state.id).toMatch(/^[a-f0-9-]{36}$/);
  // Replaying the older arrival cannot undo the actions already recorded.
  const older = await page.request.post(visitApi, {
    headers: {Origin:'http://127.0.0.1:8788'},
    data: {id:state.id, source:'chatgpt', landing:guide, actions:[]},
  });
  expect(older.status()).toBe(204);
  const sql = `SELECT source,landing_path,filtered,opened_product,visited_official FROM ai_visits WHERE session_id='${state.id}'`;
  const result = execFileSync('node_modules/.bin/wrangler', ['d1','execute','DB','--local','--persist-to','.wrangler/test-state','--command', sql, '--json'], {encoding:'utf8'});
  expect(JSON.parse(result)[0].results).toEqual([{source:'chatgpt',landing_path:guide,filtered:1,opened_product:1,visited_official:1}]);
});

test('ordinary referrals and excluded QA tabs browse without first-party AI writes', async ({page}) => {
  const requests: string[] = [];
  page.on('request', r => { if (r.url().endsWith(visitApi)) requests.push(r.url()); });
  await page.goto(guide, {referer:'https://www.google.com/search?q=record'});
  await choose(page, 'need', 'gif');
  await expect(page.locator('[data-recorder]:visible')).toHaveText(/Kap/);
  await page.goto(guide + '?utm_source=chatgpt.com&compare_test=1');
  await page.locator('[data-recorder="kap"] a[href^="/p/"]').click();
  expect(requests).toEqual([]);
  expect(await page.evaluate(() => sessionStorage.getItem('compare-ai-visit'))).toBeNull();
});

test('category links to a bilingual mobile guide and recognizes an AI referrer without UTM', async ({page}) => {
  await page.setViewportSize({width:390,height:844});
  const write = page.waitForResponse(r => r.url().endsWith(visitApi));
  await page.goto('/c/screen-recorders/', {referer:'https://www.perplexity.ai/search/example'});
  expect((await write).status()).toBe(204);
  await page.locator(`a[href="${guide}"]`).click();
  await page.locator('[data-lang="en"]').click();
  await expect(page.getByRole('heading', {name:'Which free Mac screen recorder fits?'})).toBeVisible();
  await page.getByRole('button', {name:/Recording need/}).click();
  await expect(page.getByRole('option', {name:/without drivers/})).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const state = await page.evaluate(() => JSON.parse(sessionStorage.getItem('compare-ai-visit')!));
  expect(state).toMatchObject({source:'perplexity', landing:'/c/screen-recorders/'});
});
