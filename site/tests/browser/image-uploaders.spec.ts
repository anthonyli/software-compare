import { expect, test } from '@playwright/test';

test.use({ extraHTTPHeaders: { 'CF-Connecting-IP': '203.0.113.248' } });

const variants = [
  { lang:'zh-CN', title:'图片与文件上传工具', boundary:'Markdown 链接本身不证明文件是私密的',
    details: {'upic':['LICENSE 是 Apache-2.0，但 README 页脚写 MIT','现成安装包 v0.21.1 来自 2020 年'],
      'picgo':['500 MB 存储、单文件 10 MB','非 Cloud 上传的 URL、文件名等元数据'],
      'ipic':['US$0.99/月或 US$9.99/年','7 天条件试用及自动续订']} },
  { lang:'en', title:'Image and file uploaders', boundary:'Markdown links do not establish privacy',
    details: {'upic':['LICENSE contains Apache-2.0 while the README footer says MIT','GitHub installer is v0.21.1 from 2020'],
      'picgo':['500 MB storage and 10 MB per file','metadata such as URLs and filenames from non-Cloud uploads'],
      'ipic':['US$0.99/month or US$9.99/year','conditional seven-day trial and automatic renewal']} },
] as const;

test('upload destination, app license and hosted service limits render in both layouts', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const {lang,title,boundary,details} of variants) {
      const locale = `[data-lang="${lang}"]`;
      await page.goto('/c/image-uploaders/');
      await page.locator(locale).click();
      await expect(page.locator('h1')).toContainText(title);
      await expect(page.locator('[data-image-uploader-notes]').getByText(boundary, { exact: false }).filter({ visible: true })).toBeVisible();
      const products = page.locator(width === 1280 ? '#matrix' : '#card-list');
      await expect(products.locator('[data-product-id]')).toHaveCount(3);
      for (const id of Object.keys(details)) await expect(products.locator(`[data-product-id="${id}"]`)).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      for (const [id,notes] of Object.entries(details)) {
        await page.goto(`/p/image-uploaders/${id}/`);
        await page.locator(locale).click();
        for (const note of notes) await expect(page.getByText(note, { exact:false }).filter({ visible:true }).first()).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
    }
  }
});
