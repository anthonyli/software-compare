import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.233'}});
test('CLI framework core and plugin boundaries across languages and widths',async({page})=>{
 for(const width of [1280,390]){await page.setViewportSize({width,height:900});
  for(const lang of ['en','zh-CN']){
   await page.goto('/c/cli-frameworks/');await page.locator(`[data-lang="${lang}"]`).click();
   for(const id of ['cobra','clap','commander','click','typer','oclif','swift-argument-parser','picocli'])await expect(page.locator(width===1280?'#matrix':'#card-list').locator(`[data-product-id="${id}"]`)).toBeVisible();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   for(const [id,state] of [['cobra','Yes'],['clap','Partial'],['commander','Unknown'],['click','Yes'],['typer','Yes'],['oclif','Partial'],['swift-argument-parser','Yes'],['picocli','Yes']]){
    await page.goto(`/p/cli-frameworks/${id}/`);await page.locator(`[data-lang="${lang}"]`).click();
    await expect(page.locator('.feature-row').nth(3).locator(state==='Unknown'?'.feat-empty':'.feat')).toHaveAttribute('title',lang==='en'?state:({'Yes':'支持','Partial':'部分支持','Unknown':'未知'}[state]!));
    if(id==='swift-argument-parser'){
     await expect(page.locator('.feature-row').nth(3).getByText(lang==='en'?'Bash, Zsh and Fish':'Bash、Zsh、Fish',{exact:false})).toBeVisible();
     await expect(page.getByText(lang==='en'?'requires Swift 6':'需要 Swift 6',{exact:false}).filter({visible:true}).first()).toBeVisible();
    }
    if(id==='picocli'){
     await expect(page.locator('.feature-row').nth(3).getByText(lang==='en'?'Bash and Zsh scripts':'Bash 和 Zsh',{exact:false})).toBeVisible();
     await expect(page.locator('.feature-row').nth(4).getByText(lang==='en'?'not a multi-step form':'不是多步表单',{exact:false})).toBeVisible();
    }
    if(id==='clap'){
     const shellRow=page.locator('.feature-row').nth(3);
     for(const text of lang==='en'
      ? ['static shell completion scripts at build time or runtime','not the same as computing completion candidates dynamically','unstable-dynamic feature, which is off by default']
      : ['在编译时或运行时生成静态 Shell 补全脚本','运行时生成静态脚本不等于动态计算补全候选','显式启用默认关闭的不稳定功能 unstable-dynamic']){
      await expect(shellRow.getByText(text,{exact:false})).toBeVisible();
     }
    }
    await expect(page.locator('body')).toContainText(lang==='en'?'third-party services may cost extra':'第三方服务费用另计');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   }
  }
 }
});
