import { expect, test } from '@playwright/test';

test.use({ extraHTTPHeaders: { 'CF-Connecting-IP': '198.51.100.250' } });

test('AI workbench rows show worktree and compute boundaries in both languages and layouts', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [lang, title, caveat, orca, t3, conductor] of [
      ['zh-CN', 'AI 编程 Agent 工作台', '不是系统沙箱', 'Orca 是否自行提供以及价格均未核实', '不给 Agent 分配厂商计算沙箱', 'Vercel 的托管 Linux 沙箱'],
      ['en', 'AI coding agent workbenches', 'not a system sandbox', 'privacy policy mentions hosted sandboxes that users choose', 'not vendor-provisioned execution sandboxes', 'managed Vercel Linux sandboxes'],
    ] as const) {
      const locale = `[data-lang="${lang}"]`;
      await page.goto('/c/ai-agent-workbenches/');
      await page.locator(locale).click();
      await expect(page.locator('h1')).toContainText(title);
      await expect(page.getByText(caveat, { exact: false }).filter({ visible: true })).toBeVisible();
      const products = page.locator(width === 1280 ? '#matrix' : '#card-list');
      await expect(products.locator('[data-product-id]')).toHaveCount(3);
      for (const id of ['orca','t3-code','conductor']) {
        await expect(products.locator(`[data-product-id="${id}"]`)).toBeVisible();
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

      for (const [id, note] of [['orca',orca], ['t3-code',t3], ['conductor',conductor]] as const) {
        await page.goto(`/p/ai-agent-workbenches/${id}/`);
        await page.locator(locale).click();
        await expect(page.getByText(note, { exact: false }).filter({ visible: true })).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
    }
  }
});
