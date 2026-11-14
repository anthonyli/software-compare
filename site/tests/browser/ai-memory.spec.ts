import {test,expect} from '@playwright/test';
import {cleanPublicText} from '../../src/lib/display';
test('MCP capabilities survive public cleaning without retaining collection notes',()=>{
 expect(cleanPublicText('开发者 API、Webhook 与 MCP')).toBe('开发者 API、Webhook 与 MCP');
 expect(cleanPublicText('本轮 MCP 抓取私有 token=SECRET。')).not.toContain('SECRET');
});
test('AI memory category exposes three products and bilingual text without mobile overflow',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/c/ai-memory/');
  const list=page.locator(width===1280?'#matrix':'#card-list');
  for(const id of ['taosheng','omi','screenpipe'])await expect(list.locator(`[data-product-id="${id}"]`)).toBeVisible();
  await page.locator('[data-lang="en"]').click();await expect(page.getByRole('heading',{name:'AI memory assistants',exact:true})).toBeVisible();
  await expect(list).toContainText('Local processing options');
  await expect(list).toContainText('Developer API, webhooks and MCP');
  await expect(list).toContainText('Local REST API, MCP and Pipes');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.reload();await expect(page.getByRole('heading',{name:'AI memory assistants',exact:true})).toBeVisible();
  await page.locator('[data-lang="zh-CN"]').click();await expect(page.getByRole('heading',{name:'AI 记忆助手',exact:true})).toBeVisible();
 }
 await page.goto('/p/ai-memory/screenpipe/');await expect(page.locator('body')).toContainText('Screenpipe Commercial License');
});
