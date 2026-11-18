import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/transcription-tools.json',import.meta.url),'utf8')).products.find(p=>p.id==='whisper-cpp');
test('whisper.cpp explicitly exports CLI text and subtitle files',()=>{
 assert.equal(p.features.transcript_export.value,'yes');
 assert.equal(p.features.transcript_export.note,'whisper-cli · TXT / VTT / SRT / CSV / JSON');
 assert(p.sources.includes('https://github.com/ggml-org/whisper.cpp/blob/d1be6fde11ac6e0407606b4e42fe72d34add8037/examples/cli/cli.cpp'));
 assert.equal(p.features.desktop_gui.value,'no');assert.equal(p.features.live_microphone.value,'partial');assert.match(p.free_tier_limits,/16-bit WAV/);
});
