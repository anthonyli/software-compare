import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {prepareSearchIndex,searchCatalog,normalizeSearch,oneEditAway} from '../src/lib/search.mjs';
const items=[
 {name:'Resend',summary:'适合应用通知与验证邮件',summary_en:'Application notifications and verification emails',category_name:'事务邮件',category_name_en:'Transactional email',href:'/resend'},
 {name:'MailerSend',summary:'事务邮件平台',summary_en:'Transactional email platform',href:'/mailersend'},
 {name:'Other',summary:'nothing',search_description:'完整说明可以查询，消息通知',href:'/other'},
 {name:'阿里云',name_en:'Alibaba Cloud',summary:'域名',href:'/alibaba'},
];
const index=prepareSearchIndex(items), names=q=>searchCatalog(index,q).map(i=>i.name);
test('Chinese and English descriptions, full descriptions and mixed tokens',()=>{
 assert.deepEqual(new Set(names('邮件')),new Set(['MailerSend','Resend']));
 assert.deepEqual(names('验证邮件'),['Resend']);assert.deepEqual(names('notifications'),['Resend']);
 assert.deepEqual(names('Resend 邮件'),['Resend']);assert.deepEqual(names('消息通知'),['Other']);assert.deepEqual(names('alibaba'),['阿里云']);
});
test('normalization and bounded Latin typo matching',()=>{
 assert.equal(normalizeSearch(' ＲＥＳＥＮＤ  '),'resend');
 for(const q of ['resen','resned','resendd','resend','ＲＥＳＥＮＤ','verificaton']) assert.equal(names(q)[0],'Resend');
 for(const [a,b] of [['resned','resend'],['email','emial'],['email','emails']])assert.ok(oneEditAway(a,b));
 assert.ok(!oneEditAway('mail','emailxxx'));
});
test('no broad Chinese/short typos; AND semantics, bounded results',()=>{
 for(const q of ['', '  ', 'xyz-no-match-987', '邮仵','消息不存在','邮件 banana','API typo','x'.repeat(201)])assert.deepEqual(names(q),[]);
 assert.equal(searchCatalog(prepareSearchIndex(Array.from({length:30},(_,i)=>({name:`Mail ${i}`,summary:'邮件'}))),'邮件').length,12);
 assert.deepEqual(names('邮件'),names('邮件 邮件'));
});
test('exact name precedes description or fuzzy matches',()=>{assert.equal(searchCatalog(prepareSearchIndex([{name:'Alpha',summary:'resend'},...items]),'resend')[0].name,'Resend');});
test('real mail catalog descriptions contain requested keywords',()=>{
 const c=JSON.parse(readFileSync(new URL('../../categories/transactional-email.json',import.meta.url)));
 const real=prepareSearchIndex(c.products.map(p=>({...p,category_name:c.category_name_zh})));
 assert.deepEqual(new Set(searchCatalog(real,'邮件').map(p=>p.id)),new Set(['resend','mailersend','brevo','smtp2go','postmark','amazon-ses','sendgrid']));
 assert.equal(searchCatalog(real,'验证邮件')[0].id,'resend');
});

test('scrolling capture task aliases match confirmed capability rather than descriptions', () => {
 const real = prepareSearchIndex([
  {name:'Flameshot',summary:'不支持滚动长截图 / does not support scrolling screenshots'},
  {name:'Greenshot',summary:'scrolling capture only in IE'},
  {name:'PixPin',summary:'长截图',scrolling_capture:true},
  {name:'Shottr',summary:'滚动截图',scrolling_capture:true},
  ...items,
 ]);
 for (const query of ['长截图','滚动截图','滚动长截图',' SCROLLING SCREENSHOT ','scrolling screenshots','scrolling capture']) {
  assert.deepEqual(searchCatalog(real,query).map(p=>p.name),['PixPin','Shottr']);
 }
 assert.deepEqual(searchCatalog(real,'滚动长截图',1).map(p=>p.name),['PixPin']);
 assert.deepEqual(searchCatalog(real,'Flameshot').map(p=>p.name),['Flameshot']);
 assert.deepEqual(searchCatalog(real,'邮件').map(p=>p.name),names('邮件'));
});
