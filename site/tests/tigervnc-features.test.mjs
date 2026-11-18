import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/remote-desktop.json',import.meta.url),'utf8')).products.find(p=>p.id==='tigervnc');
test('TigerVNC viewer clipboard is verified without implying file transfer',()=>{
 assert.equal(p.features.clipboard_sync.value,'yes');assert.match(p.features.clipboard_sync.note,/AcceptClipboard.*SendClipboard/);assert.equal(p.features.file_transfer.value,'unknown');
});
test('TigerVNC multi-monitor scope remains partial full-screen viewer selection',()=>{
 assert.equal(p.features.multi_monitor.value,'partial');assert.equal(p.features.multi_monitor.note,'vncviewer · FullScreenMode=all/selected');assert.equal(p.features.e2e_encryption.value,'partial');
 assert(p.sources.includes('https://github.com/TigerVNC/tigervnc/blob/b555312d70d7ff017f866649a7e7167af4eb8fca/vncviewer/vncviewer.man'));
});
