import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {transform} from 'esbuild';
const layout=fs.readFileSync(new URL('../src/layouts/Layout.astro',import.meta.url),'utf8');
const component=fs.readFileSync(new URL('../src/components/LangSwitch.astro',import.meta.url),'utf8');
test('language buttons are disabled in initial HTML until listeners and state are initialized',async()=>{
 const tags=component.match(/<button\b[^>]*>/g);assert.equal(tags.length,2);for(const tag of tags)assert.match(tag,/\bdisabled\b/);
 const script=layout.match(/<script>\s*([\s\S]*?)<\/script>/)[1];
 const {code}=await transform(script,{loader:'ts',target:'es2022'});
 const root=new EventTarget();let handlerBound=false;const add=root.addEventListener.bind(root);
 root.addEventListener=(...args)=>{add(...args);handlerBound=true;};
 const buttons=['zh-CN','en'].map(lang=>({dataset:{lang},attrs:{},_disabled:true,
  get disabled(){return this._disabled},set disabled(value){assert(handlerBound);assert(this.attrs['aria-pressed']);this._disabled=value;},
  setAttribute(k,v){this.attrs[k]=v;},closest(){return this;},
  click(){if(this.disabled)return;const e=new Event('click');Object.defineProperty(e,'target',{value:this});root.dispatchEvent(e);}
 }));
 const doc={documentElement:{lang:'zh-CN',dataset:{},style:{setProperty(){}}},body:{classList:{contains(){return false}}},querySelector(){return null},querySelectorAll(s){return s==='[data-lang-switch]'?[root]:s==='[data-lang-switch] .lang-btn'?buttons:[]}};
 buttons[1].click();assert.equal(doc.documentElement.lang,'zh-CN');assert.equal(handlerBound,false);
 vm.runInNewContext(code,{document:doc,window:{dispatchEvent(){}},localStorage:{setItem(){}},ResizeObserver:class{observe(){}},CustomEvent:class{}});
 assert(buttons.every(b=>!b.disabled));
 for(const lang of ['en','zh-CN','en']){buttons.find(b=>b.dataset.lang===lang).click();assert.equal(doc.documentElement.lang,lang);assert.equal(buttons.find(b=>b.dataset.lang===lang).attrs['aria-pressed'],'true');}
});
