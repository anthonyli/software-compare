import { expect, test } from '@playwright/test';

test.use({ extraHTTPHeaders: { 'CF-Connecting-IP': '203.0.113.250' } });

test('task-specific assistant access, plan and permission limits render in both layouts', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [lang,title,boundary,grokPlan,grokReview,geminiAccount,geminiLimits,geminiRegion,grokPlatform,geminiPlatform,grokRelease] of [
      ['zh-CN','个人 AI 助理（任务与提醒）','不能把接入等同于全权访问','Free 和 Plus 不含','不是逐项人工批准','工作或学校账号暂不支持','Pro/Ultra 最多 50 个','欧洲经济区、尼日利亚、瑞士和英国','iOS/iPadOS 18+','iPhone、iPad 和 Android App','v1.2.3（2026-11-18）为最新产品版本'],
      ['en','Personal AI assistants for tasks','A connection is not unrestricted access','Free and Plus do not','not manual approval of every operation','Work and school accounts do not currently get this task surface','Pro or Ultra allows up to 50','EEA, Nigeria, Switzerland and the UK','iOS/iPadOS 18+','iPhone, iPad and Android','v1.2.3 (2026-11-18) as the latest product release'],
    ] as const) {
      const locale = `[data-lang="${lang}"]`;
      await page.goto('/c/personal-ai-assistants/');
      await page.locator(locale).click();
      await expect(page.locator('h1')).toContainText(title);
      await expect(page.locator('[data-personal-ai-assistant-notes]').getByText(boundary, { exact: false }).filter({ visible: true })).toBeVisible();
      const products = page.locator(width === 1280 ? '#matrix' : '#card-list');
      await expect(products.locator('[data-product-id]')).toHaveCount(2);
      for (const id of ['grok-bot','gemini-tasks']) await expect(products.locator(`[data-product-id="${id}"]`)).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      for (const [id,notes] of [['grok-bot',[grokPlan,grokReview,grokPlatform,grokRelease]],['gemini-tasks',[geminiAccount,geminiLimits,geminiRegion,geminiPlatform]]] as const) {
        await page.goto(`/p/personal-ai-assistants/${id}/`);
        await page.locator(locale).click();
        for (const note of notes) await expect(page.getByText(note, { exact:false }).filter({ visible:true }).first()).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
    }
  }
});
