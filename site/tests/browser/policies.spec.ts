import { test, expect } from '@playwright/test';
test('policy drafts are reachable, bilingual and responsive without leaving the site', async ({ page }) => {
  await page.route('https://static.cloudflareinsights.com/**', route => route.abort());
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.locator('[data-policy-links] a[href="/privacy/"]').click();
    await expect(page).toHaveURL(/\/privacy\/$/);
    await expect(page.locator('[data-policy-page]')).toBeVisible();
    await page.locator('[data-lang="zh-CN"]').click();
    await expect(page.locator('h1 .t-zh')).toHaveText('隐私说明');
    await expect(page.locator('[data-policy-draft] .t-zh')).toBeVisible();
    await page.locator('[data-lang="en"]').click();
    await expect(page.locator('h1 .t-en')).toHaveText('Privacy notice');
    await expect(page.locator('h1 .t-zh')).toBeHidden();
    await expect(page.locator('[data-policy-draft] .t-en')).toContainText('not an effective policy');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.locator('[data-policy-page] nav a[href="/terms/"]').click();
    await expect(page).toHaveURL(/\/terms\/$/);
    await expect(page.locator('h1 .t-en')).toHaveText('Terms of use');
    await expect(page.locator('[data-policy-draft] .t-en')).toBeVisible();
    await page.locator('[data-lang="zh-CN"]').click();
    await expect(page.locator('h1 .t-zh')).toHaveText('使用条款');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
