import { test, expect } from '@playwright/test';

for (const [random, edge] of [[0, 'first'], [0.999999, 'last']] as const) {
  test(`promotion selects ${edge} inter-group gap without changing categories`, async ({ page }) => {
    await page.addInitScript(value => { Math.random = () => value; }, random);
    for (const width of [1280, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      const promo = page.locator('#home-promotion');
      await expect(promo).toHaveCount(1);
      await expect(promo).toBeVisible();
      await expect(promo.locator('a')).toHaveAttribute('href', 'https://pageon.cc');
      await expect(promo.locator('a')).toHaveAttribute('rel', 'sponsored noopener');
      const position = await promo.evaluate(el => {
        const groups = [...document.querySelectorAll('[data-category-group]')];
        return { previous: groups.indexOf(el.previousElementSibling!), next: groups.indexOf(el.nextElementSibling!), count: groups.length };
      });
      expect(position.previous).toBe(edge === 'first' ? 0 : position.count - 2);
      expect(position.next).toBe(position.previous + 1);
      await expect(page.locator('.dir-grid #home-promotion, .dir-card#home-promotion')).toHaveCount(0);
      await page.locator('[data-lang="en"]').click();
      await expect(promo.locator('.promotion-label .t-en')).toBeVisible();
      await expect(promo.locator('.promotion-label .t-zh')).toBeHidden();
      await expect(promo).toContainText('Explore Pageon');
      await page.locator('[data-lang="zh-CN"]').click();
      await expect(promo.locator('.promotion-label .t-zh')).toBeVisible();
      await expect(promo.locator('.promotion-label .t-en')).toBeHidden();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.reload();
      await expect(promo).toHaveCount(1);
    }
  });
}
test('JavaScript disabled leaves no promotion placeholder', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:8788/');
  await expect(page.locator('#home-promotion')).toBeHidden();
  await context.close();
});
