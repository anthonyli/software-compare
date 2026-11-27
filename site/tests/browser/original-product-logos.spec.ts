// SPDX-License-Identifier: Apache-2.0
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';

const originalPng = JSON.parse(readFileSync(new URL('../../src/lib/product-logo-original-png.json', import.meta.url), 'utf8')) as Record<string, string>;

for (const [category, id, dimensions] of [
  ['web-hosting', 'netlify', [719, 711]],
  ['international-payments', 'dodo-payments', [121, 121]],
  ['cycling-tools', 'trainerroad', [1024, 1024]],
  ['ai-assistants', 'open-webui', [512, 512]],
  ['backend-as-a-service', 'supabase-cloud', [436, 449]],
] as const) {
  test(`unchanged ${id} PNG renders in both comparison layouts and detail`, async ({ page, request }) => {
    const src = `/product-logos/${id}.png`;
    const verifyTrainerRoadSize = async (image: import('@playwright/test').Locator) => {
      if (id !== 'trainerroad') return;
      const dimensions = await image.evaluate((el) => {
        const mark = el.getBoundingClientRect();
        const name = el.parentElement?.nextElementSibling?.getBoundingClientRect();
        return { height: mark.height, rightGap: name ? name.left - mark.right : 0 };
      });
      expect(dimensions.height).toBeGreaterThanOrEqual(24);
      expect(dimensions.rightGap).toBeGreaterThanOrEqual(dimensions.height / 3);
    };

    const response = await request.get(src);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('image/png');
    expect(createHash('sha256').update(await response.body()).digest('hex')).toBe(originalPng[id]);
    for (const width of [1280, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/c/${category}/`);
      const layout = page.locator(width === 1280 ? '#matrix' : '#card-list');
      const image = layout.locator(`[data-product-id="${id}"] [data-product-logo="verified"] img`);
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveAttribute('src', src);
      await expect.poll(() => image.evaluate((el: HTMLImageElement) => [el.naturalWidth, el.naturalHeight])).toEqual(dimensions);
      await verifyTrainerRoadSize(image);
    }
    await page.goto(`/p/${category}/${id}/`);
    const image = page.locator('.detail-hero [data-product-logo="verified"] img');
    await expect(image).toHaveAttribute('src', src);
    await expect(image).toHaveAttribute('alt', '');
    await expect.poll(() => image.evaluate((el: HTMLImageElement) => [el.naturalWidth, el.naturalHeight])).toEqual(dimensions);
    await verifyTrainerRoadSize(image);
  });
}

test('Rime engine logo decodes in both layouts and detail', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/c/chinese-input-methods/');
    const scope = width === 1280 ? '#matrix' : '#card-list';
    const image = page.locator(`${scope} [data-product-id="rime"] [data-product-logo="verified"] img`);
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveAttribute('src', '/product-logos/rime.webp');
    await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBe(96);
  }
  await page.goto('/p/chinese-input-methods/rime/');
  const image = page.locator('.detail-hero [data-product-logo="verified"] img');
  await expect(image).toHaveAttribute('src', '/product-logos/rime.webp');
  await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBe(96);
});

for (const [category, id] of [
  ['desktop-virtual-machines', 'utm'],
  ['ai-image-workflows', 'comfyui'],
  ['outdoor-navigation', 'organic-maps'],
  ['fitness-training', 'jefit'],
  ['fitness-training', 'fitbod'],
] as const) {
  test(`application logo loads for ${id}`, async ({ page }) => {
    const path = `/product-logos/${id}.webp`;
    for (const width of [1280, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/c/${category}/`);
      const scope = width === 1280 ? '#matrix' : '#card-list';
      const image = page.locator(`${scope} [data-product-id="${id}"] [data-product-logo="verified"] img`);
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveAttribute('src', path);
      await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBe(96);
    }
    await page.goto(`/p/${category}/${id}/`);
    await expect(page.locator('.detail-hero [data-product-logo="verified"] img')).toHaveAttribute('src', path);
  });
}
