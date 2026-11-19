import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
test('Kate debugger is conditional on configured DAP plugin, not unknown',()=>{
 const c=JSON.parse(fs.readFileSync(new URL('../../categories/code-editors.json',import.meta.url),'utf8'));const p=c.products.find(p=>p.id==='kate');
 assert.equal(p.features.debugger.value,'partial');assert.equal(p.features.remote_dev.value,'unknown');assert(p.sources.includes('https://docs.kde.org/stable_kf6/en/kate/kate/kate-application-plugin-gdb.html'));
 const d=fs.readFileSync(new URL('../../docs/kate-debugger-evidence-2026-11-19.md',import.meta.url),'utf8');assert.match(d,/install a compatible server/);assert.match(d,/historical release/);
});
