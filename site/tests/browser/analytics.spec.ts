import {test, expect} from '@playwright/test';

// Fetch HTML only: verify build output without sending test visits to analytics.
test('public page layouts contain exactly one configured Cloudflare beacon', async ({request}) => {
  for (const path of ['/', '/c/note-taking/', '/p/cad/qcad-ce/']) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    const html = await response.text();
    const scripts = html.match(/<script\b[^>]*src=["']https:\/\/static\.cloudflareinsights\.com\/beacon\.min\.js["'][^>]*>/g) || [];
    expect(scripts).toHaveLength(1);
    expect(scripts[0]).toContain('type="module"');
    expect(scripts[0]).toContain('7f61fca6df0149618c39f67eea6844f8');
    expect(scripts[0]).toContain('data-cf-beacon=');
    expect(scripts[0]).not.toContain('is:inline');
  }
});
