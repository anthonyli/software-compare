import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const load=path=>JSON.parse(fs.readFileSync(new URL(path,import.meta.url),'utf8'));
const category=load('../../categories/screenshot-tools.json');
const translations=load('../src/i18n/content-en.json');
test('flameshot cloud_share evidence and bilingual boundaries',()=>{
  const product=category.products.find(item=>item.id==='flameshot');
  const feature=product.features.cloud_share;
  assert.equal(feature.value,'partial');
  for(const text of ["从 v13 起", "默认编译不含 Imgur 上传", "仅启用 ENABLE_IMGUR", "匿名上传", "共享配额可能用尽", "自定义 Client ID", "不绑定个人账号", "不是私有备份"]) assert.ok(feature.note.includes(text),text);
  for(const text of ["Since v13", "default build configuration excludes", "Only builds compiled with ENABLE_IMGUR", "anonymously", "shared quota may run out", "separate quota", "does not link uploads to your account", "private backups"]) assert.ok(translations[feature.note]?.includes(text),text);
  assert.equal(product.features.window_capture.value,'unknown');
  for(const source of ["https://github.com/flameshot-org/flameshot/releases/tag/v13.0.0", "https://github.com/flameshot-org/flameshot/blob/v15.0.0/CMakeLists.txt#L93-L97", "https://github.com/flameshot-org/flameshot/blob/v15.0.0/src/tools/toolfactory.cpp#L54-L56", "https://flameshot.org/docs/guide/imgur-help/", "https://flameshot.org/docs/advanced/protecting-your-privacy/"]) assert.ok(product.sources.includes(source),source);
});
