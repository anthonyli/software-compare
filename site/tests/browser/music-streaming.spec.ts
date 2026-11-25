import { expect, test } from '@playwright/test';

test.use({ extraHTTPHeaders: { 'CF-Connecting-IP': '203.0.113.252' } });

test('streaming music prices and lossless playback paths render distinctly in both layouts', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [lang,title,boundary,region,apple,spotify,tidal,tidalMobile] of [
      ['zh-CN','音乐串流订阅','不是本地文件播放器','中国大陆 Apple 官网','普通蓝牙不传输无损','Premium AAC 256 kbps','Firefox 不支持 Max','iPhone、iPad 和 Android 设备'],
      ['en','Music streaming subscriptions','not local file players','Apple\'s mainland China page','Ordinary Bluetooth does not carry lossless audio','Premium, not native-app lossless','Firefox does not support Max','iPhone, iPad and Android devices'],
    ] as const) {
      const locale = `[data-lang="${lang}"]`;
      await page.goto('/c/music-streaming/');
      await page.locator(locale).click();
      await expect(page.locator('h1')).toContainText(title);
      await expect(page.locator('[data-music-streaming-notes]').getByText(boundary, { exact: false }).filter({ visible: true })).toBeVisible();
      const products = page.locator(width === 1280 ? '#matrix' : '#card-list');
      await expect(products.locator('[data-product-id]')).toHaveCount(3);
      for (const id of ['apple-music','spotify','tidal']) {
        await expect(products.locator(`[data-product-id="${id}"]`)).toBeVisible();
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      for (const [id,notes] of [['apple-music',[region,apple]],['spotify',[spotify]],['tidal',[tidal,tidalMobile]]] as const) {
        await page.goto(`/p/music-streaming/${id}/`);
        await page.locator(locale).click();
        for (const note of notes) await expect(page.getByText(note, { exact:false }).filter({ visible:true }).first()).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
    }
  }
});
