import { test, expect } from "@playwright/test";

test.describe("Inventory Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/inventory");
    await expect(
      page.getByRole("heading", { name: "INVENTORY STOCK" }),
    ).toBeVisible();
  });

  test("should display 'SHTO PRODUKT' button and open the add product form", async ({
    page,
  }) => {
    const addButton = page.getByRole("button", { name: "SHTO PRODUKT" });
    await expect(addButton).toBeVisible();
    await addButton.click();

    await expect(page.getByText("Emri", { exact: true })).toBeVisible();
    await expect(page.getByText("SKU (KODI)", { exact: true })).toBeVisible();
    await expect(page.getByText("Përshkrimi", { exact: true })).toBeVisible();
    // await expect(page.getByText('Kategoria', { exact: true })).toBeVisible();
    await expect(
      page.locator("label").filter({ hasText: "Kategoria" }),
    ).toBeVisible();
    // Verifikojmë butonin e ruajtjes
    await expect(page.getByRole("button", { name: "RUAJ" })).toBeVisible();

    // Verifikojmë butonin e mbylljes
    const closeButton = page
      .locator('button[class*="close-modal-shto"]')
      .first();
    await expect(closeButton).toBeVisible();
    await closeButton.click();

    // Verifikojmë që forma është mbyllur
    await expect(
      page
        .locator("div")
        .filter({ hasText: "Shto ProduktDetajet e Stokut" })
        .nth(5),
    ).toBeHidden();
  });
});

test.describe("Actions on Inventory Items", () => {
  let productRow: any;

  test.beforeEach(async ({ page }) => {
    await page.goto("/inventory");
    await expect(
      page.getByRole("heading", { name: "INVENTORY STOCK" }),
    ).toBeVisible();
    // Supozojmë që kemi të paktën një produkt në databazën e testimit
    productRow = page.locator("tr").filter({ hasText: "Samsung Galaxy S24" });
    await expect(productRow).toBeVisible();
  });

  test('Duhet te hapi modalin "STOK I RI" kur klikohet butoni përkatës', async ({
    page,
  }) => {
    // Përdorim atributin title që e pamë në DOM
    await productRow.getByTitle("Stok i Ri").click();

    // Verifikojmë modalin dhe elementet e tij
    await expect(
      page.getByRole("heading", { name: "STOK I RI" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "HYRJE (+)" })).toBeVisible();
    await expect(page.getByRole("button", { name: "DALJE (-)" })).toBeVisible();
    await expect(page.getByRole("button", { name: "PËRDITËSO" })).toBeVisible();
    await expect(
      page.locator("div").filter({ hasText: /^Sasia$/ }),
    ).toBeVisible();
    await expect(
      page.locator("div").filter({ hasText: /^Arsyeja$/ }),
      ``,
    ).toBeVisible();

    // Verifikojmë butonin e mbylljes
    const closeButton = page.locator('button[class*="close-in-out"]').first();
    await expect(closeButton).toBeVisible();
    await closeButton.click();
  });

  test("Validate the Sasia field", async ({ page }) => {
    await productRow.getByTitle("Stok i Ri").click();
    const sasiaInput = page.locator('input[type="number"]').first();
    // await expect(sasiaInput).toHaveValue("0");
    await expect(sasiaInput).toHaveAttribute('placeholder', '0');

    // Testojmë vlera pozitive
    await test.step("Should allow positive values", async () => {
      await sasiaInput.fill("5");
      await expect(sasiaInput).toHaveValue("5");
    });

    // Testojmë shkrimin e tekstit (duhet të lejojë vetëm numra)
    await test.step("Should only allow numeric input", async () => {
      await sasiaInput.clear();
      await sasiaInput.pressSequentially("abc");
      await expect(sasiaInput).toBeEmpty();
    });

    // Vlerat ekstreme eksponenciale
    await test.step("Nuk pranon vlera ekstreme eksponenciale", async () => {
      await sasiaInput.clear();
      await sasiaInput.fill("1e10");
      const value = await sasiaInput.inputValue();
      expect.soft(value).not.toContain("e");
    });

    // Vlerat negative (duhet të lejojë vetëm numra pozitivë)
    await test.step("Should not allow negative values", async () => {
      await sasiaInput.clear();
      await sasiaInput.pressSequentially("-5");
      const finalvalue = await sasiaInput.inputValue();
      expect.soft(finalvalue.includes("-")).toBeFalsy();
    });

    // Testojmë që nuk lejon zbritjen në negativ përmes tastierës
    await test.step("Nuk lejon zbritjen ne negativ permes tastieres", async () => {
      await sasiaInput.fill('0');
      await sasiaInput.pressSequentially('ArrowDown');
      await expect(sasiaInput).toHaveValue('0');
    });

  });
});
