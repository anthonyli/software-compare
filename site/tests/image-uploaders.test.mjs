import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => fs.readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const data = JSON.parse(read('categories/image-uploaders.json'));
const en = JSON.parse(read('site/src/i18n/content-en.json'));
const [upic, picgo, ipic] = data.products;
const keys = ['imupload_input','imupload_files','imupload_links','imupload_custom','imupload_hosted'];

test('an upload and link format do not grant hosting privacy or quota', () => {
  assert.deepEqual(data.features.map(f => f.key), keys);
  assert.deepEqual(data.products.map(p => p.id), ['upic','picgo','ipic']);
  assert.deepEqual(data.products.map(p => keys.map(k => p.features[k].value)), [
    ['yes','yes','yes','yes','unknown'],
    ['yes','yes','yes','yes','yes'],
    ['yes','yes','yes','paid','partial'],
  ]);
  for (const p of data.products) assert.deepEqual(Object.keys(p.features), keys);
  assert.match(data.notes, /不把客户端当存储或 CDN.*向所选服务发送文件.*Markdown 链接本身不证明文件是私密的/);
  assert.match(upic.features.imupload_hosted.note, /未核实 uPic 提供自营存储或购买客户端即附托管额度/);
  assert.match(picgo.features.imupload_custom.note, /不用 PicGo Cloud 账号.*存储可能需自己的账号/);
  assert.match(picgo.free_tier_limits, /付费云相册自动归集.*非 Cloud 上传的 URL、文件名等元数据.*原文件留在所选目的地/);
  assert.match(ipic.features.imupload_files.note, /不能据此推断默认图床支持任意文件/);
  assert.match(ipic.features.imupload_hosted.note, /默认免费图床.*未核实当前运营方、额度、链接寿命/);
});

test('license documents, release channels, subscriptions and storage charges remain distinct', () => {
  assert.deepEqual(data.products.map(p => [p.latest_release,p.latest_release_date,p.license]), [
    ['1.4.9','2026-06-13','Apache-2.0'],
    ['v3.0.4','2026-11-13','MIT'],
    ['1.8.4','2024-07-13','未知'],
  ]);
  assert.match(upic.price_summary, /US\$4\.99.*未核实中国大陆.*LICENSE 是 Apache-2\.0，但 README 页脚写 MIT.*不把它当作商店二进制许可/);
  assert.match(upic.free_tier_limits, /macOS 13\+.*SM\.MS 改为 S\.EE.*v0\.21\.1 来自 2020 年.*未验证凭据/);
  assert.deepEqual(upic.prices.map(p=>[p.price,p.currency,p.period]),[['4.99','USD','once']]);
  assert.match(picgo.price_summary, /MIT 免费.*可选托管.*500 MB 存储、单文件 10 MB/);
  assert.match(ipic.price_summary, /US\$0\.99\/月或 US\$9\.99\/年.*7 天条件试用及自动续订.*提前 24 小时.*外部存储费用不含/);
  assert.deepEqual(ipic.prices.map(p=>[p.price,p.currency,p.period]),[['0.99','USD','month'],['9.99','USD','year']]);
});

test('the bilingual file-tools route is separate from hosting, archiving and finder moves', () => {
  const strings = v => typeof v === 'string' ? [v] : v && typeof v === 'object' ? Object.values(v).flatMap(strings) : [];
  for (const s of strings(data).filter(s => /[\u4e00-\u9fff]/.test(s))) {
    assert.equal(typeof en[s], 'string', s);
    assert.doesNotMatch(en[s], /[\u4e00-\u9fff]/, s);
  }
  const config=read('site/src/config.ts');
  assert.match(config, /id: "files",[\s\S]*?slugs: \["archivers"[^\]]*"finder-file-moves", "image-uploaders"/);
  assert.match(read('site/src/i18n/labels.ts'), /"image-uploaders": \{ zh: "图片与文件上传工具", en: "Image and file uploaders" \}/);
  assert.match(read('site/src/pages/c/[slug].astro'), /category.slug === "image-uploaders".*data-image-uploader-notes.*tr\(category.notes\)/);
  assert.match(read('site/public/categories/image-uploaders.svg'), /viewBox="0 0 480 260"/);
});
