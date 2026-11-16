import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = path => JSON.parse(readFileSync(new URL(path, import.meta.url)));
test('Syncthing distinguishes encrypted relay traffic and discontinued official Android app in both languages', () => {
 const p = read('../../categories/file-sync.json').products.find(p => p.id === 'syncthing');
 const en = read('../src/i18n/content-en.json');
 assert.equal(p.features.e2e_encrypt.value, 'yes');
 assert.equal(p.features.mobile.value, 'partial');
 assert(p.platforms.includes('Android'));
 assert.match(p.price_summary, /默认.*中继/);
 assert.match(p.features.e2e_encrypt.note, /密文.*IP.*设备 ID.*流量/);
 assert.match(p.features.mobile.note, /官方 Android 应用已停更/);
 for (const s of [p.summary, p.price_summary, p.prices[0].note, p.features.e2e_encrypt.note, p.features.mobile.note]) {
  assert(en[s]); assert.doesNotMatch(en[s], /[\u4e00-\u9fff]/);
  assert.doesNotMatch(s, /数据不经过开发者服务器|不经过中央服务器|有 Android 官方/);
 }
 assert.match(en[p.features.e2e_encrypt.note], /encrypted data.*IP addresses.*device IDs.*traffic volume/);
 assert.match(en[p.features.mobile.note], /official Android app has been discontinued.*not all community/);
 assert(p.sources.includes('https://docs.syncthing.net/users/relaying.html'));
 assert(p.sources.includes('https://forum.syncthing.net/t/discontinuing-syncthing-android/23002'));
});
