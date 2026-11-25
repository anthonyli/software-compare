import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(new URL('../../'+p,import.meta.url),'utf8'));const c=read('categories/cli-frameworks.json'),en=read('site/src/i18n/content-en.json');
test('CLI frameworks retain licenses and core versus add-on boundaries',()=>{
 assert.deepEqual(c.products.map(p=>p.id),['cobra','clap','commander','click','typer','oclif','swift-argument-parser','picocli']);
 assert.deepEqual(c.products.map(p=>p.license),['Apache-2.0','MIT OR Apache-2.0','MIT','BSD-3-Clause','MIT','MIT','Apache-2.0 WITH Swift-exception','Apache-2.0']);
 assert.deepEqual(c.products.map(p=>p.features.shell_completion.value),['yes','partial','unknown','yes','yes','partial','yes','yes']);
 assert.deepEqual(c.products.map(p=>p.features.interactive_prompts.value),['unknown','unknown','unknown','yes','yes','partial','unknown','partial']);
 assert.match(c.products[5].features.interactive_prompts.note,/Inquirer/);
 assert.match(c.products[3].free_tier_limits,/python script.py/);assert.match(c.notes,/不是 AI/);
 for(const p of c.products){assert.equal(p.open_source,true);assert.deepEqual(Object.keys(p.features),c.features.map(f=>f.key));assert(p.sources.length>=2);for(const k of ['github_stars','latest_release','latest_release_date','maintenance_status'])assert.equal(p[k],null);}
});
test('CLI framework Chinese strings have English translations',()=>{const strings=v=>typeof v==='string'?[v]:v&&typeof v==='object'?Object.values(v).flatMap(strings):[];for(const s of strings(c).filter(s=>/[\u4e00-\u9fff]/.test(s)))assert(en[s],s);});

test('clap distinguishes generated static scripts from opt-in dynamic candidates in both languages',()=>{
 const clap=c.products.find(p=>p.id==='clap');
 const {value,note}=clap.features.shell_completion;
 assert.equal(value,'partial');
 assert.match(note,/独立的 clap_complete 4\.6\.11.*编译时或运行时.*静态 Shell 补全脚本/);
 assert.match(note,/运行时生成静态脚本不等于动态计算补全候选/);
 assert.match(note,/动态补全需显式启用默认关闭的不稳定功能 unstable-dynamic/);
 assert.match(en[note],/separate clap_complete 4\.6\.11 crate generates static shell completion scripts at build time or runtime/);
 assert.match(en[note],/not the same as computing completion candidates dynamically/);
 assert.match(en[note],/explicitly enabling the unstable unstable-dynamic feature, which is off by default/);
 assert(clap.sources.includes('https://docs.rs/clap_complete/4.6.11/clap_complete/'));
 assert(clap.sources.includes('https://github.com/clap-rs/clap/blob/clap_complete-v4.6.11/clap_complete/Cargo.toml'));
});

test('Swift Argument Parser distinguishes its toolchain, native completion and prompting',()=>{
 const p=c.products.find(p=>p.id==='swift-argument-parser');
 assert.match(p.free_tier_limits,/1\.8\.2 需要 Swift 6/);
 assert.match(p.features.shell_completion.note,/Bash、Zsh、Fish.*安装或加载/);
 assert.equal(p.features.interactive_prompts.value,'unknown');
 assert(p.sources.some(url=>url.endsWith('/1.8.2/Package.swift')));
});

test('picocli implements terminal value prompts, not a full TUI',()=>{
 const p=c.products.find(p=>p.id==='picocli');
 assert.equal(p.license,'Apache-2.0');
 assert.match(p.features.shell_completion.note,/Bash 和 Zsh.*需要安装或加载/);
 assert.equal(p.features.interactive_prompts.value,'partial');
 assert.match(p.features.interactive_prompts.note,/提示输入选项或位置参数的值.*不是多步表单/);
 assert.match(en[p.features.interactive_prompts.note],/not a multi-step form/);
});
