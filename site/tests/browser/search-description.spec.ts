import {test,expect} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.235'}});
test('search descriptions, typos and IME using real build index',async({page,request})=>{
 const response=await request.get('/search-index.json');expect(response.ok()).toBe(true);
 const data=await response.json();const resend=data.products.find(p=>p.href==='/p/transactional-email/resend/');
 expect(resend.summary).toContain('验证邮件');expect(resend.search_description).toContain('邮件');
 await mkdir('../docs/design/previews',{recursive:true});
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/');
  await page.locator('[data-lang="zh-CN"]').click();await expect(page.locator('html')).toHaveAttribute('lang','zh-CN');
  const input=page.locator('#site-search-hero');const root=input.locator('..').locator('..');
  const results=root.locator('[data-search-results]');
  for(const q of ['邮件','验证邮件','verification','resned','ＲＥＳＥＮＤ']){
   await input.fill(q);await expect(results.locator('a[href="/p/transactional-email/resend/"]')).toBeVisible();
  }
  await input.fill('邮件');await expect(results.locator('a[href="/p/transactional-email/brevo/"]')).toBeVisible();
  await expect(results.locator('a[href="/p/transactional-email/mailersend/"]')).toBeVisible();
  await page.screenshot({path:`../docs/design/previews/payment-page-search-zh-${width}.png`});
  await input.press('Escape');await expect(results).toBeHidden();await input.fill('');await expect(results).toBeHidden();
  await input.dispatchEvent('compositionstart');await input.fill('邮件');
  await input.dispatchEvent('keydown',{key:'Enter',code:'Enter',isComposing:true,keyCode:229});
  await expect(page).toHaveURL(/\/$/);await expect(results).toBeHidden();
  await input.dispatchEvent('compositionend',{data:'邮件'});
  await expect(results.locator('a[href="/p/transactional-email/resend/"]')).toBeVisible();
  await input.fill('zzzz-nonexistent-123');await expect(results.locator('a')).toHaveCount(0);await expect(results).toContainText('没有找到');
  await page.locator('[data-lang="en"]').click();await expect(page.locator('html')).toHaveAttribute('lang','en');
  await input.fill('verification emails');await expect(results.locator('a[href="/p/transactional-email/resend/"]')).toBeVisible();
  await expect(results).toContainText('verification');await page.screenshot({path:`../docs/design/previews/payment-page-search-en-${width}.png`});
  await input.fill('resend');await expect(results.locator('a').first()).toHaveAttribute('href','/p/transactional-email/resend/');
  await input.press('Enter');await expect(page).toHaveURL(/\/p\/transactional-email\/resend\/$/);
  // URL changes at navigation commit, before the new document binds search listeners.
  await page.waitForLoadState('load');
  const header=page.locator('#site-search-header');await header.fill('邮件');await expect(page.locator('.search-hit[href="/p/transactional-email/resend/"]')).toBeVisible();
 }
});
