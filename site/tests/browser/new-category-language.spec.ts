import {test,expect} from '@playwright/test';
const cases=[["word-processors","文字处理","Word processors"],["spreadsheets","电子表格","Spreadsheets"],["presentation-tools","演示文稿","Presentations"],["cad","二维 CAD","2D CAD"],["texture-materials","纹理与材质","Textures & materials"]];
for(const [slug,zh,en] of cases)test(`${slug} category title switches language`,async({page})=>{
 await page.goto(`/c/${slug}/`);
 await page.locator('[data-lang="en"]').click();
 await expect(page.getByRole('heading',{name:en,exact:true})).toBeVisible();
 await page.reload();
 await expect(page.getByRole('heading',{name:en,exact:true})).toBeVisible();
 await page.locator('[data-lang="zh-CN"]').click();
 await expect(page.getByRole('heading',{name:zh,exact:true})).toBeVisible();
});
