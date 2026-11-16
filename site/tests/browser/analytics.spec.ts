import {test, expect} from '@playwright/test';

// Pages injects the beacon in production. Local build output must not add a second one.
test('public page layouts leave analytics injection to Cloudflare Pages', async ({request}) => {
  for (const path of ['/', '/c/note-taking/', '/p/cad/qcad-ce/']) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    const html = await response.text();
    const scripts = html.match(/<script\b[^>]*src=["']https:\/\/static\.cloudflareinsights\.com\/beacon\.min\.js["'][^>]*>/g) || [];
    expect(scripts).toHaveLength(0);
    expect(html).not.toContain('data-cf-beacon');
  }
});
