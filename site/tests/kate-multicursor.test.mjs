import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('Kate multicursor support cites the stable KatePart handbook',()=>{
 const d=JSON.parse(readFileSync(new URL('../../categories/code-editors.json',import.meta.url)));
 const rows=d.products.filter(p=>p.id==='kate');assert.equal(rows.length,1);const p=rows[0];
 assert.deepEqual(p.features.multi_cursor,{value:'yes'});
 assert(p.sources.includes('https://kate-editor.org/'));
 assert(p.sources.includes('https://docs.kde.org/stable_kf6/en/kate/katepart/kate-part-multiple-cursors.html'));
 assert.equal(p.features.debugger.value,'partial'); // Separately verified by kate-debugger.test.mjs.
 assert.equal(p.features.remote_dev.value,'unknown');
});
