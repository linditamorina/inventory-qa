import { test, expect } from "@playwright/test";

test.describe("Dashboard Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
  });

  // Test 1: Header and User Info Test
  test("should display the dashboard header", async ({ page }) => {
    // Main title
    const mainTitle = page.getByRole("heading", {
      name: "DASHBOARD PËRMBLEDHJE",
    });
    await expect(mainTitle).toBeVisible();

    await expect(page.getByText("LINDITA MORINA")).toBeVisible();
    await expect(page.getByText("ADMIN")).toBeVisible();
  });

  // Test 2: Inventory Summary Test
  test("should display inventory summary cards", async ({ page }) => {
    await expect(page.getByText("ARTIKUJ TOTAL")).toBeVisible();
    await expect(page.getByText("STOK I ULËT")).toBeVisible();
    await expect(page.getByText("VLERA E INVENTARIT")).toBeVisible();
    await expect(page.getByText("PËRDORUES AKTIVË")).toBeVisible();
  });

  // Test 3: Graph and Chart Test
  test("should display inventory trends graph", async ({ page }) => {
    await expect(page.getByText("PRODUKTET SIPAS KATEGORISË")).toBeVisible();
    await expect(page.getByText("STATUSI I STOKUT")).toBeVisible();

    await expect(
      page
        .getByRole("application")
        .filter({
          hasText:
            "ELECTRONICSPHOTOGRAPHYSOFTUERAKSESORËCOMPUTERSWEARABLESAUDIOOFFICE02468",
        }),
    ).toBeVisible();
    await expect(page.getByText("Statusi i StokutNë GjendjeUlë")).toBeVisible();
  });
});
