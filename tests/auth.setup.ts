import { test as setup, expect } from '@playwright/test';

// Lokacioni ku do të ruhet skedari i identifikimit
const authFile = '.auth/user.json';

setup('authenticate', async ({ page }) => {
  // 1. Shkojmë tek faqja kryesore
  await page.goto('http://localhost:3000/login');
  
  // 2. Plotësojmë të dhënat e login
  await page.getByPlaceholder('email@shembull.com').fill(process.env.TEST_EMAIL!);
  await page.getByPlaceholder('••••••••').fill(process.env.TEST_PASSWORD!);
  await page.getByRole('button', { name: 'HYNI NË SISTEM' }).click();

  // 3. Presim të jemi të sigurt që logimi u krye me sukses
  await expect(page).toHaveURL(/.*dashboard/);

  // 4. RUAJ GJENDJEN! (Kjo ruan Cookies dhe LocalStorage në skedarin user.json)
  await page.context().storageState({ path: authFile });
});