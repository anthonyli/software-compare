import { test, expect } from '@playwright/test';

test('homepage prioritizes media while retaining all other groups and media cards', async ({ page }) => {
  await page.goto('/');
  const groups = page.locator('#categories > [id^="group-"]');
  expect(await groups.evaluateAll(nodes => nodes.map(node => node.id))).toEqual([
    'group-media', 'group-lifestyle', 'group-ai', 'group-creative', 'group-office',
    'group-files', 'group-system', 'group-security', 'group-dev',
  ]);
  await expect(page.locator('#categories .group-jump a').first()).toHaveAttribute('href', '#group-media');
  const links = page.locator('#group-media .dir-grid a');
  expect(await links.evaluateAll(nodes => nodes.map(node => node.getAttribute('href')))).toEqual([
    '/c/screen-recorders/', '/c/video-editors/', '/c/audio-editors/',
    '/c/audio-recorders/', '/c/transcription-tools/', '/c/converters/',
  ]);
});
