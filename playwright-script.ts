import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3001/contact', { waitUntil: 'networkidle' });
  await page.fill('input[name="name"]', 'ADMIN');
  // It needs to be submitted to trigger the router push
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'admin_panel.png', fullPage: true });

  await browser.close();
})();
