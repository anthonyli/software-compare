import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const load=path=>JSON.parse(fs.readFileSync(new URL(path,import.meta.url),'utf8'));
const category=load('../../categories/remote-desktop.json');
const translations=load('../src/i18n/content-en.json');
test('guacamole session_recording evidence and bilingual boundaries',()=>{
  const product=category.products.find(item=>item.id==='guacamole');
  const feature=product.features.session_recording;
  assert.equal(feature.value,'yes');
  for(const text of ["图形录制", "recording-path", "未配置则不录制", "录制存储扩展", "即使已录制", "Web 应用必须能读取目录和文件", "直接位于搜索路径下", "历史记录的 UUID", "一级子目录"]) assert.ok(feature.note.includes(text),text);
  for(const text of ["graphical recording", "recording-path", "off without it", "recording storage extension", "Even after capture succeeds", "web app read access", "configured search path", "directly in the configured search path", "immediate subdirectory", "history entry UUID"]) assert.ok(translations[feature.note]?.includes(text),text);
  assert.equal(product.features.audio.value,'unknown');
  for(const source of ["https://guacamole.apache.org/doc/gug/configuring-guacamole.html#graphical-session-recording", "https://guacamole.apache.org/doc/gug/recording-playback.html#how-recording-storage-and-playback-works", "https://guacamole.apache.org/doc/gug/recording-playback.html#preparing-a-directory-for-recording-storage"]) assert.ok(product.sources.includes(source),source);
});
