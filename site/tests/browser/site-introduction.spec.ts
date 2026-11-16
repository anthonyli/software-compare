import { test, expect } from '@playwright/test';
for (const width of [1280, 390]) {
 test(`product positioning and public feedback at ${width}px`, async ({ page }) => {
  await page.setViewportSize({width,height:900}); await page.goto('/');
  const intro=page.locator('[data-product-intro]');
  await expect(intro.locator('.t-zh').first()).toBeVisible();
  await expect(intro).toContainText('个人、内容创作者、开发者和小团队');
  await expect(page.locator('[data-product-tags] li')).toHaveCount(3);
  const feedback=page.locator('[data-public-feedback]');
  await feedback.scrollIntoViewIfNeeded();
  await expect(feedback.locator('a')).toHaveAttribute('href','https://github.com/anthonyli/software-compare/issues');
  await expect(feedback.locator('a .t-zh')).toBeVisible();
  await page.locator('[data-lang="en"]').click();
  await expect(feedback.locator('a .t-en')).toBeVisible();
  await intro.scrollIntoViewIfNeeded(); await expect(intro.locator('.t-en').first()).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
 });
}
