import { test, expect } from '@playwright/test';
import { cleanPublicText } from '../../src/lib/display';
import { tr } from '../../src/i18n';

test('license translation preserves identifiers, unknown content and cleaning', () => {
  expect(tr(cleanPublicText('专有软件'))).toBe('Proprietary software');
  for (const id of ['MIT', 'Apache-2.0', 'GPL-3.0-only', 'AGPL-3.0-or-later']) expect(tr(cleanPublicText(id))).toBe(id);
  expect(tr(cleanPublicText('尚未收录的许可证名称'))).toBe('尚未收录的许可证名称');
  expect(tr(cleanPublicText('WebFetch private token=SECRET'))).toBe('');
});

test('license value follows language switch and persists after reload', async ({ page }) => {
  await page.goto('/p/remote-desktop/uu-remote/');
  const overview = page.locator('.meta-list');
  await expect(overview).toContainText('专有软件');
  await page.getByRole('button', { name: 'EN', exact: true }).click();
  await expect(overview).toContainText('Proprietary software');
  await expect(overview.getByText('专有软件', { exact: true })).toBeHidden();
  await page.reload();
  await expect(overview).toContainText('Proprietary software');
  await page.getByRole('button', { name: '中文', exact: true }).click();
  await expect(overview).toContainText('专有软件');
});
