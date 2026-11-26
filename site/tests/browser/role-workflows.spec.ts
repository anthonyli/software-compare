import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const cases = [
  { slug: 'indie-developer', zh: '独立开发者', en: 'Indie developer', category: 'code-editors', product: 'vscode' },
  { slug: 'content-creator', zh: '内容创作者', en: 'Content creator', category: 'screen-recorders', product: 'obs-studio' },
  { slug: 'privacy-first', zh: '重视隐私的效率用户', en: 'Privacy-minded power user', category: 'password-managers', product: 'keepassxc' },
];

test('role discovery links to the existing product catalog in both languages and widths', async ({ page }) => {
  const previews = '../docs/design/previews';
  await mkdir(previews, { recursive: true });
  for (const { width, lang } of [{ width: 1280, lang: 'zh-CN' }, { width: 390, lang: 'en' }]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/#role-workflows');
    await page.locator(`[data-lang="${lang}"]`).click();
    const home = page.locator('#role-workflows');
    await expect(home.getByRole('heading', { level: 2, name: lang === 'en' ? 'Find tools for your workflow' : '按角色找工具' })).toBeVisible();
    await expect(home.getByRole('link')).toHaveCount(3);
    await home.screenshot({ path: `${previews}/labs-home-role-cards-${width}-${lang}.png`, animations: 'disabled' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    for (const item of cases) {
      await home.locator(`[data-role="${item.slug}"]`).click();
      await expect(page).toHaveURL(new RegExp(`/workflows/${item.slug}/$`));
      const workflow = page.locator(`[data-workflow="${item.slug}"]`);
      await expect(workflow.getByRole('heading', { level: 1, name: lang === 'en' ? item.en : item.zh })).toBeVisible();
      const steps = workflow.locator('[data-workflow-step]');
      await expect(steps).toHaveCount(3);
      await expect(workflow.locator('.workflow-product-link')).toHaveCount(6);
      if (item.slug === 'content-creator') await workflow.screenshot({ path: `${previews}/labs-home-role-detail-${width}-${lang}.png`, animations: 'disabled' });
      const first = steps.filter({ has: page.locator(`a[href="/p/${item.category}/${item.product}/"]`) });
      await expect(first.locator('a.workflow-category')).toHaveAttribute('href', `/c/${item.category}/`);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await first.locator(`a[href="/p/${item.category}/${item.product}/"]`).click();
      await expect(page).toHaveURL(new RegExp(`/p/${item.category}/${item.product}/$`));
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await page.goto('/#role-workflows');
    }
  }
});
