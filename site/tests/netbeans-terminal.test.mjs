import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
test('NetBeans integrated terminal retains system PTY conditions',()=>{
 const c=JSON.parse(fs.readFileSync(new URL('../../categories/code-editors.json',import.meta.url),'utf8'));const p=c.products.find(p=>p.id==='netbeans');const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url),'utf8'));
 assert.equal(p.features.integrated_terminal.value,'partial');assert.match(p.features.integrated_terminal.note,/PTY/);assert.match(en[p.features.integrated_terminal.note],/prompts for Cygwin/);for(const k of ['remote_dev'])assert.equal(p.features[k].value,'unknown');assert(p.sources.includes('https://github.com/apache/netbeans/blob/32/ide/dlight.terminal/src/org/netbeans/modules/dlight/terminal/action/TerminalSupportImpl.java'));
});
