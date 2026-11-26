import { test, expect } from '@playwright/test';

test('verified product logos load locally on desktop, mobile and detail pages', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/c/rss-readers/');
    const container = page.locator(width === 1280 ? '#matrix' : '#card-list');
    const product = container.locator('[data-product-id="newsboat"]');
    const badge = product.locator('[data-product-logo="verified"]');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveAttribute('aria-hidden', 'true');
    await expect(badge.locator('img')).toHaveAttribute('src', '/product-logos/newsboat.webp');
    await expect(badge.locator('img')).toHaveAttribute('alt', '');
    await expect(product.getByRole('link', { name: 'Newsboat', exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }

  await page.goto('/p/rss-readers/newsboat/');
  const hero = page.locator('.detail-hero');
  await expect(hero.getByRole('heading', { name: 'Newsboat', exact: true })).toBeVisible();
  const image = hero.locator('[data-product-logo="verified"] img');
  await expect(image).toBeVisible();
  await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
});

test('browser comparison shows verified logos on desktop and mobile', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/c/browsers/');
    const container = page.locator(width === 1280 ? '#matrix' : '#card-list');
    for (const id of ['brave', 'dia', 'ego-lite', 'helium']) {
      const badge = container.locator(`[data-product-id="${id}"] [data-product-logo="verified"]`);
      await expect(badge).toBeVisible();
      await expect(badge.locator('img')).toHaveAttribute('src', `/product-logos/${id}.webp`);
    }
  }
  await page.goto('/p/browsers/ego-lite/');
  const image = page.locator('.detail-hero [data-product-logo="verified"] img');
  await expect(image).toBeVisible();
  await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
});

test('logo rows have no outer tile and mixed rows align without boxed initials', async ({ page }) => {
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, body: '' }));
  let unillustratedHref: string | null = null;
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/c/browsers/');
    const container = page.locator(width === 1280 ? '#matrix' : '#card-list');
    const verified = container.locator('[data-product-id="brave"]');
    const icon = verified.locator('[data-product-logo="verified"]');
    await expect(icon).toHaveCSS('border-top-width', '0px');
    await expect(icon).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    const unverified = container.locator('[data-product-id]').filter({
      has: page.locator('[data-product-logo="placeholder"]'),
    }).first();
    if (!(await unverified.count())) continue; // The catalog can eventually have full coverage.
    const emptySlot = unverified.locator('[data-product-logo="placeholder"]');
    await expect(emptySlot).toBeEmpty();
    await expect(emptySlot).toHaveAttribute('aria-hidden', 'true');
    const namedLink = width === 1280 ? '.product-name' : '.card-title';
    const verifiedLeft = (await verified.locator(namedLink).boundingBox())?.x;
    const unverifiedLink = unverified.locator(namedLink);
    expect(verifiedLeft).toBeDefined();
    expect((await unverifiedLink.boundingBox())?.x).toBe(verifiedLeft);
    unillustratedHref = await unverifiedLink.getAttribute('href');
  }

  if (unillustratedHref) {
    await page.goto(unillustratedHref);
    await expect(page.locator('.detail-hero h1')).toBeVisible();
    await expect(page.locator('.detail-hero [data-product-logo]')).toHaveCount(0);
  }
});
