import {test, expect} from '@playwright/test';
const cases = [
 {slug:'transcription-tools', zh:'离线转写', en:'Offline transcription'},
 {slug:'audio-recorders', zh:'麦克风录音', en:'Microphone recording'},
 {slug:'screen-recorders', zh:'区域录制', en:'Region recording'},
];
for (const c of cases) test(`${c.slug}: feature labels switch in table/cards and persist`, async({page})=>{
 await page.goto(`/c/${c.slug}/`);
 const zh=page.locator('[data-lang="zh-CN"]');
 const en=page.locator('[data-lang="en"]');
 await en.click();
 await expect(page.locator('#matrix thead')).toContainText(c.en);
 await expect(page.locator('#matrix th.feat-h').filter({hasText:c.en})).toHaveAttribute('title',c.en);
 await page.locator('[data-view="cards"]').click();
 await expect(page.locator('#card-list')).toBeVisible();
 await expect(page.locator('#card-list .t-en').filter({hasText:c.en}).first()).toBeVisible();
 await page.reload();
 await expect(page.locator('html')).toHaveAttribute('lang','en');
 await expect(page.locator('#card-list .t-en').filter({hasText:c.en}).first()).toBeVisible();
 await zh.click();
 await expect(page.locator('#card-list .t-zh').filter({hasText:c.zh}).first()).toBeVisible();
 await page.locator('[data-view="table"]').click();
 await expect(page.locator('#matrix th.feat-h').filter({hasText:c.zh})).toHaveAttribute('title',c.zh);
});
test('transcription pricing uses existing translations and persists through product navigation',async({page})=>{
 await page.goto('/c/transcription-tools/');
 await page.locator('[data-lang="en"]').click();
 const row=page.locator('#matrix tr').filter({has:page.getByRole('link',{name:'MacWhisper',exact:true})});
 await expect(row.locator('.price-cell .t-en')).toHaveText('Free edition / one-time Pro purchase');
 await row.getByRole('link',{name:'MacWhisper',exact:true}).click();
 await expect(page.locator('html')).toHaveAttribute('lang','en');
 await page.goBack();
 await expect(row.locator('.price-cell .t-en')).toBeVisible();
 await page.locator('[data-lang="zh-CN"]').click();
 await expect(row.locator('.price-cell .t-zh')).toHaveText('免费版 / 一次性付费 Pro');
});
