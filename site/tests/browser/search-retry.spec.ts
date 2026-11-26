import { test, expect } from '@playwright/test';

test('mobile search retries with the same query without putting the button inside the listbox', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 850 });
  let requests = 0;
  await page.route('**/search-index.json', async route => {
    requests++;
    if (requests === 1) await route.fulfill({ status: 503, body: '' });
    else await route.continue();
  });

  await page.goto('/');
  const search = page.locator('[data-search][data-primary]');
  const input = search.getByRole('combobox');
  await input.fill('邮件');
  const error = search.locator('[data-search-error]');
  const results = search.locator('[data-search-results]');
  await expect(error.getByRole('status')).toContainText('搜索暂时不可用');
  await expect(results).toBeHidden();
  await expect(input).toHaveValue('邮件');
  await expect(input).toHaveAttribute('aria-expanded', 'false');

  await input.press('Tab');
  const retry = error.getByRole('button', { name: '重试' });
  if (!(await retry.evaluate(button => button === document.activeElement))) await page.keyboard.press('Tab');
  await expect(retry).toBeFocused();
  await retry.press('Enter');

  await expect(error).toBeHidden();
  await expect(input).toBeFocused();
  await expect(input).toHaveValue('邮件');
  await expect(results.getByRole('option').first()).toBeVisible();
  await expect(input).toHaveAttribute('aria-expanded', 'true');
  expect(requests).toBe(2);

  await input.press('ArrowDown');
  await expect(results.getByRole('option').nth(1)).toHaveAttribute('aria-selected', 'true');
});
