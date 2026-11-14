import { test, expect } from '@playwright/test';
import { cleanPublicText, formatPriceDisplay } from '../../src/lib/display';
import { tr } from '../../src/i18n';
import publicTranslations from '../../src/i18n/public-content-en.json' with { type: 'json' };
import remote from '../../../categories/remote-desktop.json' with { type: 'json' };
import type { Product } from '../../src/lib/load-data';

const uu = remote.products.find(p => p.id === 'uu-remote')!;

test('UU translations use explicitly reviewed public keys after cleaning', () => {
  const sources = [uu.price_summary, uu.latest_release_date_note, uu.features.e2e_encryption.note, uu.features.free_for_commercial.note];
  for (const source of sources) {
    const cleaned = cleanPublicText(source);
    expect(cleaned).not.toBe(source);
    expect(cleaned).not.toMatch(/本轮|本机|curl|WebFetch|published_at/);
    expect(tr(cleaned)).toBe(publicTranslations[cleaned as keyof typeof publicTranslations]);
    expect(tr(cleaned)).not.toMatch(/[\u4e00-\u9fff]/);
  }
  expect(formatPriceDisplay(uu as unknown as Product, 'en').summary).toBe(tr(cleanPublicText(uu.price_summary)));
  expect(formatPriceDisplay(uu as unknown as Product, 'zh').summary).toBe(cleanPublicText(uu.price_summary));
});

test('public mappings and unknown fallbacks never recover removed source text', () => {
  for (const [key, value] of Object.entries(publicTranslations)) {
    expect(cleanPublicText(key)).toBe(key);
    expect(value).not.toMatch(/本轮|本机|WebFetch|curl|worker|published_at|pushed_at|stargazers_count|API[_ -]?KEY|SECRET/i);
  }
  expect(tr(cleanPublicText('WebFetch 私有 token=SECRET。'))).toBe('');
  const unknown = tr(cleanPublicText('尚无对应译文的公开限制；本轮 curl 私有 token=SECRET。'));
  expect(unknown).toContain('尚无对应译文的公开限制');
  expect(unknown).not.toMatch(/SECRET|本轮|curl/);
  expect(tr(cleanPublicText('Public limitation; WebFetch private token=SECRET'))).not.toContain('SECRET');
});

test('UU detail toggles languages without untranslated cleaned explanations', async ({ page }) => {
  await page.goto('/p/remote-desktop/uu-remote/');
  await page.getByRole('checkbox', { name: 'EN', exact: true }).check();
  const main = page.locator('main');
  await expect(main).toContainText(publicTranslations[cleanPublicText(uu.price_summary)]);
  await expect(main).toContainText(publicTranslations[cleanPublicText(uu.features.e2e_encryption.note)]);
  await expect(main).toContainText(publicTranslations[cleanPublicText(uu.features.free_for_commercial.note)]);
  await expect(main).not.toContainText('本轮');
  await page.getByRole('checkbox', { name: '中文', exact: true }).check();
  await expect(main).toContainText(cleanPublicText(uu.price_summary));
  await expect(main).not.toContainText('本轮');
});
