import {test,expect} from '@playwright/test';
// Isolate this visual visitor from other suites' real session-rate buckets.
// TEST-NET-1 address; production rate limits and real vote endpoints stay unchanged.
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.240'}});
test('domain registrars render bilingually at desktop and mobile widths',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/');
  const card=page.locator('a.dir-card[href="/c/domain-registration/"]');await card.scrollIntoViewIfNeeded();await expect(card).toBeVisible();
  await expect.poll(()=>card.locator('img').evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
  await page.screenshot({path:`../docs/design/previews/domain-page-home-${width}.png`});
  await page.goto('/c/domain-registration/');
  await page.locator('[data-lang="zh-CN"]').click();
  const recovery=page.locator('#domain-recovery');
  const fees=[
   ['porkbun','USD 200，另付普通续费','USD 200 plus the normal renewal fee'],
   ['namecheap','USD 89.98 含续费','USD 89.98 includes renewal'],
   ['tencent','CNY 1,000；是否包含续费未核实','CNY 1,000 on the China price list; renewal inclusion not verified'],
   ['aliyun','中国站公开表价 CNY 1,200，含一年续费','CNY 1,200 on the public China price list, including one year of renewal'],
   ['cloudflare','可能在续费之外收取恢复费','a restoration fee may apply in addition to renewal'],
  ];
  await expect(recovery.locator('h2 .t-zh')).toBeVisible();
  for(const [id,zh] of fees){
   const row=recovery.locator(`[data-recovery-registrar="${id}"] dd > .t-zh`);
   await expect(row).toBeVisible();await expect(row).toContainText(zh);
  }
  const aliyun=recovery.locator('[data-recovery-registrar="aliyun"]');
  await expect(aliyun.locator('dt a')).toHaveAttribute('href','https://wanwang.aliyun.com/help/price.html');
  await expect(aliyun.getByRole('link',{name:'计费说明'})).toHaveAttribute('href','https://help.aliyun.com/zh/dws/user-guide/redeem-a-domain-name');
  const list=page.locator(width===1280?'#matrix':'#card-list');
  for(const id of ['cloudflare-registrar','porkbun','namecheap-domains','aliyun-domains','tencent-domains'])await expect(list.locator(`[data-product-id="${id}"]`)).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.locator('[data-lang="en"]').click();await expect(page.locator('body')).toContainText('Domain registration');
  await expect(recovery.locator('h2 .t-en')).toBeVisible();
  await expect(aliyun.getByRole('link',{name:'Fee details'})).toBeVisible();
  for(const [id,,en] of fees){
   const row=recovery.locator(`[data-recovery-registrar="${id}"] dd > .t-en`);
   await expect(row).toBeVisible();await expect(row).toContainText(en);
  }
  for(const [id,name] of [['aliyun-domains','Alibaba Cloud Wanwang Domains'],['tencent-domains','Tencent Cloud Domains']]){
   const product=list.locator(`[data-product-id="${id}"]`);const title=product.locator(width===1280?'a.product-name':'a.card-title');
   await expect(title.locator('.t-en')).toBeVisible();await expect(title.locator('.t-en')).toHaveText(name);await expect(title.locator('.t-zh')).toBeHidden();await expect(title).toHaveAttribute('title',name);
  }
  await page.screenshot({path:`../docs/design/previews/domain-page-comparison-${width}.png`});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
 for(const [id,name] of [['aliyun-domains','Alibaba Cloud Wanwang Domains'],['tencent-domains','Tencent Cloud Domains']]){
  await page.goto(`/p/domain-registration/${id}/`);await expect(page.locator('h1 .t-en')).toBeVisible();await expect(page.locator('h1 .t-en')).toHaveText(name);await expect(page).toHaveTitle(new RegExp(name));
 }
 await page.goto('/p/domain-registration/cloudflare-registrar/');await expect(page.locator('body')).toContainText('Cloudflare authoritative DNS is mandatory');
 await expect(page.locator('body')).not.toContainText('$未知');
});
