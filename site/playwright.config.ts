import {defineConfig} from '@playwright/test';
export default defineConfig({
  testDir:'./tests/browser',
  workers:1,
  use:{baseURL:'http://127.0.0.1:8788',headless:true,launchOptions:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? {executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH} : {}},
  webServer:{command:'node scripts/test-server.mjs',url:'http://127.0.0.1:8788',reuseExistingServer:false,timeout:120000},
});
