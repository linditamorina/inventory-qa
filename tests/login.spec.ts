import { test, expect } from '@playwright/test';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login Page', () => {
    // Make sure we are on the login page before each test
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/login');
    });

    // Test 1: UI / Visibility Test
    test('should display the login form', async ({ page }) => {
        const emailInput = page.getByPlaceholder('email@shembull.com')
        const passwordInput = page.getByRole('textbox', { name: '••••••••' });
        const loginButton = page.getByRole('button', { name: 'HYNI NË SISTEM' });

        // Assert that the email input, password input, and login button are visible
        await expect(emailInput).toBeVisible();
        await expect(passwordInput).toBeVisible();
        await expect(loginButton).toBeVisible();
    });

    // Test 2: Negative Test - Invalid Credentials
    test('should show error message for invalid credentials', async ({ page }) => {
        await page.getByPlaceholder('email@shembull.com').fill('test@gabim.com');
        await page.getByRole('textbox', { name: '••••••••' }).fill('test');
        await page.getByRole('button', { name: 'HYNI NË SISTEM' }).click();

        // Assert that an error message is displayed
        const errorMessage = page.getByText('Invalid login credentials');
        await expect(errorMessage).toBeVisible();
    });

    // Test 3: Positive Test - Valid Credentials
    test('should log in successfully with valid credentials', async ({ page }) => {
        await page.getByPlaceholder('email@shembull.com').fill(process.env.TEST_EMAIL!);
        await page.getByRole('textbox', { name: '••••••••' }).fill(process.env.TEST_PASSWORD!);
        await page.getByRole('button', { name: 'HYNI NË SISTEM' }).click();

        // Assert that the user is redirected to the dashboard
        await expect(page).toHaveURL('http://localhost:3000/dashboard');
    });

});