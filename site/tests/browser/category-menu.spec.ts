import { test, expect } from '@playwright/test';

for (const viewport of [{width:1280,height:800},{width:390,height:600},{width:844,height:390}]) {
  test(`category menu scrolls within viewport ${viewport.width}x${viewport.height}`, async ({page}) => {
    await page.setViewportSize(viewport);
    await page.goto('/');
    const button = page.locator('[data-cat-btn]');
    const panel = page.locator('[data-cat-panel]');
    const links = panel.locator('a');
    await button.click();
    await expect(panel).toBeVisible();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    const dimensions = await panel.evaluate(el => ({
      bottom: el.getBoundingClientRect().bottom,
      height: el.getBoundingClientRect().height,
      scrollHeight: el.scrollHeight,
      clientHeight: el.clientHeight,
      overflow: getComputedStyle(el).overflowY,
    }));
    expect(dimensions.bottom).toBeLessThanOrEqual(viewport.height - 15);
    expect(dimensions.height).toBeLessThanOrEqual(448);
    expect(dimensions.scrollHeight).toBeGreaterThan(dimensions.clientHeight);
    expect(dimensions.overflow).toBe('auto');
    await button.press('ArrowDown');
    await expect(links.first()).toBeFocused();
    await links.first().press('End');
    await expect(links.last()).toBeFocused();
    expect(await panel.evaluate(el => el.scrollTop)).toBeGreaterThan(0);
    await expect(links.last()).toBeInViewport();
    await page.keyboard.press('Escape');
    await expect(panel).toBeHidden();
    await expect(button).toBeFocused();
    await button.click();
    await button.click();
    await expect(panel).toBeHidden();
    await button.click();
    await page.locator('.brand').first().click();
    await expect(panel).toBeHidden();
  });
}

test('open category menu resizes and keeps final link usable', async ({page}) => {
  await page.setViewportSize({width:1280,height:900});
  await page.goto('/');
  const button = page.locator('[data-cat-btn]');
  const panel = page.locator('[data-cat-panel]');
  await button.click();
  await page.setViewportSize({width:390,height:500});
  await expect.poll(() => panel.evaluate(el => el.getBoundingClientRect().bottom)).toBeLessThanOrEqual(485);
  await button.press('End');
  const last = panel.locator('a').last();
  const href = await last.getAttribute('href');
  await last.press('Enter');
  await expect(page).toHaveURL(new RegExp(`${href}$`));
  await expect(page.locator('[data-cat-panel]')).toBeHidden();
});
