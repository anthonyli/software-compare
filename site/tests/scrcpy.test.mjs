import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read = path => JSON.parse(readFileSync(new URL(path,import.meta.url)));
const c=read('../../categories/remote-desktop.json'), en=read('../src/i18n/content-en.json');
const p=c.products.find(p=>p.id==='scrcpy');
test('scrcpy is a complete bilingual Android-specific comparison row',()=>{
 assert.equal(c.products.filter(p=>p.id==='scrcpy').length,1);
 assert.deepEqual(Object.keys(p.features).sort(),c.features.map(f=>f.key).sort());
 assert.equal(p.license,'Apache-2.0'); assert.equal(p.open_source,true);
 assert.equal(p.collected_at,'2026-11-16');assert.equal(c.collected_at,'2026-11-12');
 const strings=v=>typeof v==='string'?[v]:v&&typeof v==='object'?Object.values(v).flatMap(strings):[];
 for(const s of strings(p).filter(s=>/[\u4e00-\u9fff]/.test(s)))assert(en[s],s);
 assert(p.sources.includes('https://github.com/Genymobile/scrcpy/blob/v5.0.1/doc/audio.md'));
});
test('scrcpy does not conflate audio, OTG, targets and general remote desktop capabilities',()=>{
 assert.equal(p.features.audio.value,'partial');assert.match(p.features.audio.note,/Android 11.*解锁.*失败.*视频.*--require-audio/);
 assert.equal(p.features.mobile_control.value,'partial');assert.match(p.free_tier_limits,/OTG.*不含音视频/);
 assert.equal(p.features.file_transfer.value,'partial');
 for(const k of ['unattended_access','multi_monitor','e2e_encryption','self_host','wake_on_lan'])assert.equal(p.features[k].value,'unknown');
 assert.match(en[p.features.audio.note],/Android 11.*unlocked.*video-only.*--require-audio/);
});
