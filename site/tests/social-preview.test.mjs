import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const file=p=>readFileSync(new URL(p,import.meta.url),'utf8');
test('Compare states its own free access and scopes third-party pricing',()=>{
 const s=file('../src/pages/index.astro');
 assert.match(s,/data-free-access/);
 assert.match(s,/Compare 免费浏览与比较，无需注册/);
 assert.match(s,/Listed third-party products may charge separately/);
});
test('global metadata uses an absolute PNG social image with dimensions and alt',()=>{
 const s=file('../src/layouts/Layout.astro');
 assert.match(s,/new URL\("\/social\/compare-preview.png", siteConfig.siteUrl\)/);
 for(const key of ['og:image','og:image:type','og:image:width','og:image:height','og:image:alt','twitter:image','twitter:image:alt']) assert.ok(s.includes('"'+key+'"'),key);
 assert.match(s,/name="twitter:card" content="summary_large_image"/);
 assert.match(s,/property="og:image:width" content="1200"/);
 assert.match(s,/property="og:image:height" content="630"/);
 const b=readFileSync(new URL('../public/social/compare-preview.png',import.meta.url));
 assert.equal(b.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
 assert.equal(b.readUInt32BE(16),1200);assert.equal(b.readUInt32BE(20),630);
 assert.ok(b.length<500000,'keep the preview lightweight');
});
