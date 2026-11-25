import { expect, test } from '@playwright/test';

test('file backup exposes its original cover and recovery boundaries', async ({ page }, info) => {
  for (const [width, lang, title, boundary] of [
    [1280, 'en', 'File backup and restore', 'Default check does not read all packs'],
    [390, 'zh-CN', '文件备份与恢复', '默认 check 不读取全部数据包'],
  ] as const) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.locator(`[data-lang="${lang}"]`).click();
    const cover = page.locator('.dir-cover img[src$="/file-backup.svg"]');
    await cover.scrollIntoViewIfNeeded();
    await expect.poll(() => cover.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    await info.attach(`backup-cover-${width}`, { body: await cover.screenshot(), contentType: 'image/png' });

    await page.goto('/c/file-backup/');
    await expect(page.locator('h1')).toContainText(title);
    const table = page.locator(width === 1280 ? '#matrix' : '#card-list');
    for (const id of ['restic', 'kopia', 'borgbackup']) {
      await expect(table.locator(`[data-product-id="${id}"]`)).toBeVisible();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.goto('/p/file-backup/restic/');
    await expect(page.locator('body')).toContainText(boundary);
  }
});
