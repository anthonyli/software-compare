import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/remote-desktop.json',import.meta.url),'utf8')).products.find(p=>p.id==='ultravnc');
test('UltraVNC file transfer is scoped to its viewer/server pair',()=>{
 assert.equal(p.features.file_transfer.value,'yes');
 assert.equal(p.features.file_transfer.note,'UltraVNC Viewer ↔ UltraVNC Server');
 assert(p.sources.includes('https://github.com/ultravnc/UltraVNC/blob/edc654df7e95e7151bb02ebaa5d6ef2b16e3e5ed/vncviewer/FileTransfer.cpp'));
});
test('UltraVNC clipboard remains configurable without expanding other capabilities',()=>{
 assert.equal(p.features.clipboard_sync.value,'yes');
 assert.equal(p.features.clipboard_sync.note,'-disableclipboard');
 assert.equal(p.features.multi_monitor.value,'unknown');
 assert.equal(p.features.e2e_encryption.value,'partial');
 assert(p.sources.includes('https://github.com/ultravnc/UltraVNC/blob/edc654df7e95e7151bb02ebaa5d6ef2b16e3e5ed/vncviewer/VNCOptions.cpp'));
});
