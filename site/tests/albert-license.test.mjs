import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/launchers.json',import.meta.url),'utf8')).products.find(p=>p.id==='albert');
const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url),'utf8'));
test('Albert distinguishes source visibility, personal-use licensing and platform support',()=>{
 assert.equal(p.open_source,false);assert.match(p.license,/Albert license v1.1.*自定义许可.*源码可见/);
 assert.deepEqual(p.platforms,['Linux','macOS']);assert.equal(p.pricing_model,'个人免费');
 assert.doesNotMatch(p.summary,/开源/);assert.doesNotMatch(p.price_summary,/开源/);
 assert.match(p.price_summary,/企业或商业用途许可未确认/);
 assert.match(p.free_tier_limits,/不授予修改版再分发权/);assert.match(p.free_tier_limits,/二进制再分发不得面向 Microsoft 或 Apple/);assert.match(p.free_tier_limits,/不等于禁止 macOS 个人使用/);
 assert(p.sources.includes('https://github.com/albertlauncher/albert/blob/c703546832dd8e7c961b74895d43b8d0cdadf7c8/LICENSE.md'));
 for(const value of [p.license,p.summary,p.price_summary,p.free_tier_limits,p.pricing_model,p.prices[0].plan]){assert(en[value],value);assert.doesNotMatch(en[value],/[\u4e00-\u9fff]/);}
});
test('Albert actual public text and price rendering preserve English licensing scope',async()=>{
 const {build}=await import('esbuild');const result=await build({entryPoints:[new URL('../src/lib/display.ts',import.meta.url).pathname],bundle:true,platform:'node',format:'esm',write:false});
 const {cleanPublicText,formatPriceDisplay,formatHeroPrice}=await import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'));
 for(const raw of [p.license,p.summary,p.price_summary,p.free_tier_limits])assert.equal(cleanPublicText(raw),raw);
 assert.equal(formatPriceDisplay(p,'en').tableCell,'Free for personal use');assert.equal(formatHeroPrice(p,'en'),'Free for personal use');
});
