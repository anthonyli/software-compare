import {test,expect} from '@playwright/test';
// Content-only local API identity; production rate limits are unchanged.
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.76'}});
test('fitness loggers render in responsive comparisons and English details',async({page})=>{for(const width of [1280,390]){await page.setViewportSize({width,height:900});await page.goto('/c/fitness-training/');const list=page.locator(width===1280?'#matrix':'#card-list');for(const id of ['strong','fitbod'])await expect(list.locator(`[data-product-id="${id}"]`)).toBeVisible();await page.locator('[data-lang="en"]').click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}await page.goto('/p/fitness-training/strong/');await expect(page.locator('body')).toContainText('not a limit of three logged workouts');await page.goto('/p/fitness-training/fitbod/');await expect(page.locator('body')).toContainText('logging new workouts requires payment');});

test('FitNotes shows local Android logging, partial nutrition tracking and backup limits', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/c/fitness-training/');
    await expect(page.locator(width === 1280 ? '#matrix' : '#card-list').locator('[data-product-id="fitnotes"]')).toBeVisible();
    await page.goto('/p/fitness-training/fitnotes/');
    for (const lang of ['zh-CN', 'en']) {
      await page.locator(`[data-lang="${lang}"]`).click();
      const isEnglish = lang === 'en', activeLang = isEnglish ? 'en' : 'zh';
      const rows = page.locator('.feature-row');
      await expect(rows).toHaveCount(5);
      await expect(rows.nth(2).locator('.feat')).toHaveAttribute('title', isEnglish ? 'Partial' : '部分支持');
      await expect(rows.nth(2).locator(`p .t-${activeLang}`)).toContainText(isEnglish ? 'not a dedicated food diary' : '不是专门的食物日记');
      await expect(rows.nth(4).locator(`p .t-${activeLang}`)).toContainText(isEnglish ? 'not continuous cross-device sync' : '不是持续跨设备同步');
      await expect(page.locator('body')).toContainText(isEnglish ? /replaces the existing records.*CSV is for review and analysis, not restoration/ : /覆盖设备现有记录.*CSV.*不能用于恢复/, { useInnerText: true });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  }
});

test('LiftLog renders self-hosting and backup boundaries in both languages', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/c/fitness-training/');
    await expect(page.locator(width === 1280 ? '#matrix' : '#card-list').locator('[data-product-id="liftlog"]')).toBeVisible();
    await page.goto('/p/fitness-training/liftlog/');
    for (const lang of ['zh-CN', 'en']) {
      await page.locator(`[data-lang="${lang}"]`).click();
      const isEnglish = lang === 'en', activeLang = isEnglish ? 'en' : 'zh';
      const rows = page.locator('.feature-row');
      await expect(rows).toHaveCount(5);
      await expect(rows.nth(2).locator('.feat-empty')).toHaveAttribute('title', isEnglish ? 'Unknown' : '未知');
      await expect(rows.nth(3).locator(`p .t-${activeLang}`)).toContainText(isEnglish ? 'your own Anthropic API access' : '自己的 Anthropic API 访问');
      await expect(rows.nth(4).locator(`p .t-${activeLang}`)).toContainText(isEnglish ? 'not live merging of workout history' : '不是多设备实时合并训练历史');
      await expect(page.locator('body')).toContainText(isEnglish ? 'works offline without an account' : '可离线使用，无需账号', { useInnerText: true });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  }
});
