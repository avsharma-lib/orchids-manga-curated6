import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:3001/contact', { waitUntil: 'networkidle' });
  await page.fill('input[name="name"]', 'ADMIN');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);

  // Check Add T-Shirt tab
  await page.click('button:has-text("Add T-Shirt")');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'admin_add_tshirt.png', fullPage: true });

  // Check Add Hoodie tab
  await page.click('button:has-text("Add Hoodie")');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'admin_add_hoodie.png', fullPage: true });

  // Check Add Bottoms tab
  await page.click('button:has-text("Add Bottoms")');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'admin_add_bottoms.png', fullPage: true });

  await browser.close();
})();
