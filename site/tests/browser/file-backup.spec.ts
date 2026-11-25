import { expect, test } from '@playwright/test';

// Keep this read-only catalog fixture out of the local voting suite's shared bucket.
test.use({ extraHTTPHeaders: { 'CF-Connecting-IP': '203.0.113.237' } });

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
    for (const id of ['restic', 'kopia', 'borgbackup', 'time-machine', 'windows-file-history', 'arq-7', 'duplicati']) {
      await expect(table.locator(`[data-product-id="${id}"]`)).toBeVisible();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.goto('/p/file-backup/restic/');
    await expect(page.locator('body')).toContainText(boundary);
    await page.goto('/p/file-backup/time-machine/');
    await expect(page.locator('h1')).toContainText('Time Machine');
    await expect(page.locator('body')).toContainText(lang === 'en' ? 'No direct S3 destination' : '不直连 S3');
    await page.goto('/p/file-backup/windows-file-history/');
    await expect(page.locator('h1')).toContainText('Windows File History');
    await expect(page.locator('body')).toContainText(lang === 'en' ? 'neither OneDrive sync nor a system image' : '不是 OneDrive 同步或系统映像');
    await page.goto('/p/file-backup/arq-7/');
    await expect(page.locator('h1')).toContainText('Arq 7');
    await expect(page.locator('body')).toContainText(lang === 'en' ? 'keep the owning user signed in' : '文件所属用户保持登录');
    await page.goto('/p/file-backup/duplicati/');
    await expect(page.locator('h1')).toContainText('Duplicati');
    await expect(page.locator('body')).toContainText(lang === 'en' ? 'Console limits are not client limits.' : '不能把这两个监控额度当成客户端上限');
    await expect(page.locator('body')).toContainText(lang === 'en' ? 'without the original local database' : '没有原机的本地数据库');
  }
});
