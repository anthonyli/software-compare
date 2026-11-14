import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read = slug => JSON.parse(fs.readFileSync(new URL(`../../categories/${slug}.json`, import.meta.url), 'utf8'));
const expected = { 'audio-recorders': ['audacity', 'ocenaudio'], 'transcription-tools': ['vibe', 'subtitle-edit', 'macwhisper'] };
test('audio expansion adds five sourced rows with complete comparisons and translations', () => {
 const en = JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json', import.meta.url), 'utf8'));
 for (const [slug, ids] of Object.entries(expected)) {
  const c = read(slug);
  for (const id of ids) {
   const matches = c.products.filter(p => p.id === id); assert.equal(matches.length, 1, id);
   const p = matches[0]; assert.equal(p.collected_at, '2026-11-14'); assert(p.sources.length >= 2);
   assert(p.license && p.price_summary && p.free_tier_limits);
   assert.deepEqual(Object.keys(p.features).sort(), c.features.map(f => f.key).sort());
   for (const text of [p.summary,p.price_summary,p.free_tier_limits,...Object.values(p.features).map(f=>f.note)]) {
    if (/[\u4e00-\u9fff]/.test(text)) assert(en[text], `${id}: ${text}`);
   }
  }
  for (const old of c.products.filter(p=>!ids.includes(p.id))) assert.equal(old.collected_at, '2026-11-13');
 }
});
test('recording and transcription boundaries are explicit, not inferred from open source', () => {
 const recorders = read('audio-recorders').products;
 const audacity = recorders.find(p=>p.id==='audacity');
 assert.equal(audacity.features.system_audio.value, 'partial');
 assert.match(audacity.free_tier_limits, /WASAPI/);
 const ocenaudio = recorders.find(p=>p.id==='ocenaudio');
 assert.equal(ocenaudio.open_source, false); assert.equal(ocenaudio.features.app_audio.value, 'unknown');
 const transcript = read('transcription-tools').products;
 const vibe = transcript.find(p=>p.id==='vibe');
 assert.match(vibe.free_tier_limits, /Claude/); assert.match(vibe.free_tier_limits, /发送文本/);
 assert.equal(vibe.features.live_microphone.value, 'partial');
 const se = transcript.find(p=>p.id==='subtitle-edit');
 assert.deepEqual(se.platforms, ['Windows','macOS','Linux']);
 assert.equal(se.features.live_microphone.value, 'unknown');
 const mw = transcript.find(p=>p.id==='macwhisper');
 assert.equal(mw.open_source, false); assert.match(mw.free_tier_limits, /App Store/);
 assert.match(mw.free_tier_limits, /传出数据/);
});
