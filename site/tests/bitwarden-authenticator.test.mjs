import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(new URL(p,import.meta.url),'utf8'));
const auth=read('../../categories/authenticators.json');
const pm=read('../../categories/password-managers.json').products.find(p=>p.id==='bitwarden');
const en=read('../src/i18n/content-en.json');
const p=auth.products.find(x=>x.id==='bitwarden-authenticator');
const strings=v=>typeof v==='string'?[v]:v&&typeof v==='object'?Object.values(v).flatMap(strings):[];

test('standalone Bitwarden Authenticator stays separate from paid Password Manager TOTP',()=>{
 assert(p);
 assert.equal(pm.features.totp.value,'paid');
 assert(pm.sources.includes('https://bitwarden.com/help/integrated-authenticator/'));
 assert.equal(pm.sources.includes('https://bitwarden.com/help/bitwarden-authenticator/'),false);
 assert.deepEqual(auth.products.map(x=>x.id),['2fas-auth','ente-auth','aegis','google-authenticator','microsoft-authenticator','bitwarden-authenticator']);
 assert.equal(p.github_url,null);
 assert.equal(p.open_source,true);
 assert.deepEqual(p.platforms,['Android','iOS']);
 assert.equal(p.pricing_model,'免费');
 assert.match(p.license,/GPL-3\.0/);
 assert.match(p.license,/没有单独确认第三方依赖和图形资产许可/);
 assert.deepEqual(Object.values(p.features).map(f=>f.value),['yes','yes','partial','no','no']);
 assert.match(p.notes,/本地未加密数据库/);
 assert.match(p.notes,/锁出/);
 assert.match(p.free_tier_limits,/尚未确认/);
 assert.match(p.free_tier_limits,/minSdk 为 29/);
 assert.match(p.free_tier_limits,/Android 9\+/);
 assert.match(p.free_tier_limits,/不能导入带密码的 2FAS/);
 assert.match(p.source_host_note,/bitwarden\/android/);
 assert.match(p.source_host_note,/已归档/);
 for(const url of [
  'https://bitwarden.com/products/authenticator/',
  'https://bitwarden.com/help/bitwarden-authenticator/',
  'https://bitwarden.com/help/totp-sync/',
  'https://bitwarden.com/help/authenticator-import-export/',
  'https://github.com/bitwarden/android/blob/main/LICENSE.txt',
  'https://github.com/bitwarden/ios/blob/main/LICENSE.txt',
  'https://github.com/bitwarden/android/blob/main/gradle/libs.versions.toml'
 ]) assert(p.sources.includes(url),url);
 assert.doesNotMatch(JSON.stringify(p),/otpauth:\/\/|secret=/);
 const prior={
  '2fas-auth':['yes','yes','yes','yes','no'],
  'ente-auth':['yes','yes','yes','yes','yes'],
  'aegis':['yes','yes','partial','yes','no'],
  'google-authenticator':['yes','yes','yes','unknown','no'],
  'microsoft-authenticator':['yes','partial','yes','unknown','no']
 };
 for(const [id,values] of Object.entries(prior)) assert.deepEqual(Object.values(auth.products.find(x=>x.id===id).features).map(f=>f.value),values,id);
 for(const s of strings(p).filter(s=>/[\u4e00-\u9fff]/.test(s))){
  assert(en[s],s);
  assert.doesNotMatch(en[s],/[\u4e00-\u9fff]/);
 }
});
