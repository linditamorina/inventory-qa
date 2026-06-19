import { test, expect } from '@playwright/test';

test.describe("Sidebar Navigation Tests", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/dashboard");
    });

    test("needs to show the sidebar with all navigation links", async ({ page }) => {
        await expect(page.locator('span').filter({ hasText: 'Inventory' })).toBeVisible();

        // Check for the presence of all expected sidebar links without clicking
        await expect(page.getByRole("link", { name: "Dashboard" })).toBeVisible();
        await expect(page.getByRole("link", { name: "Inventory" })).toBeVisible();
        await expect(page.getByRole("link", { name: "Orders" })).toBeVisible();
        await expect(page.getByRole("link", { name: "Categories" })).toBeVisible();
        await expect(page.getByRole("link", { name: "Reports" })).toBeVisible();
        await expect(page.getByRole("link", { name: "Staff" })).toBeVisible();
    });

    // DATA-DRIVEN TEST: Test each sidebar link for correct navigation
    const sidebarLinks = [
        { name: "Dashboard", url: "/dashboard" },
        { name: "Inventory", url: "/inventory" },
        { name: "Orders", url: "/orders" },
        { name: "Categories", url: "/categories" },
        { name: "Reports", url: "/reports" },
        { name: "Staff", url: "/dashboard/staff" },
    ];

    // Loop through each link and create a test for it
    for (const link of sidebarLinks) {
        test(`should navigate to ${link.name} page when clicking on the sidebar link`, async ({ page }) => {
            await page.getByRole("link", { name: link.name }).click();
            await expect(page).toHaveURL(link.url);
        });
    }

});