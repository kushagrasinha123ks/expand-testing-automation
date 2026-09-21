import { test, expect } from "@playwright/test";
import { createFreshUser } from "../../utils/fakeUser";

test.describe("Test register page", () => {

  const { freshUsername, freshPassword } = createFreshUser();
  const existingUsername = "practice";
  const existingPassword = "SuperSecretPassword!";

  test.beforeEach(async ({ page }) => {
    await page.goto("/register");
  });

  test.describe("Test register page", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/register");
    });

    test("TC-Register-01 - Valid registration", async ({ page }) => {
      await page.getByLabel("Username").fill(freshUsername);

      await page.getByLabel("Password", { exact: true }).fill(freshPassword);

      await page.getByLabel("Confirm Password", { exact: true }).fill(freshPassword);

      await page.getByRole("button", { name: "Register" }).click();

      const alertMessage = page.locator("#flash");

      await expect(alertMessage).toBeVisible();

      await expect(alertMessage).toContainText(
        "Successfully registered, you can log in now.",
      );

      await expect(page).toHaveURL('/login');
    });
  });

  test("TC-Register-02 - Username less than 3 characters", async ({ page }) => {
    await page.getByLabel("Username").fill(freshUsername.substring(0, 2));
    await page.getByLabel("Password", { exact: true }).fill(freshPassword);
    await page.getByLabel("Confirm Password", { exact: true }).fill(freshPassword);

    await page.getByRole("button", { name: "Register" }).click();

    const alertMessage = page.locator("#flash");

    await expect(alertMessage).toBeVisible();
    await expect(alertMessage).toContainText(
      "Username must be at least 3 characters long.",
    );
  });

  test("TC-Register-03 - Password less than 4 characters", async ({ page }) => {
    const shortPassword = freshPassword.substring(0, 3);

    await page.getByLabel("Username").fill(freshUsername);
    await page.getByLabel("Password", { exact: true }).fill(shortPassword);
    await page.getByLabel("Confirm Password", { exact: true }).fill(shortPassword);

    await page.getByRole("button", { name: "Register" }).click();

    const alertMessage = page.locator("#flash");

    await expect(alertMessage).toBeVisible();
    await expect(alertMessage).toContainText(
      "Password must be at least 4 characters long.",
    );
  });

  test("TC-Register-04 - Password and confirm password do not match", async ({
    page,
  }) => {
    const differentPassword = freshPassword.split("").reverse().join("");

    await page.getByLabel("Username").fill(freshUsername);
    await page.getByLabel("Password", { exact: true }).fill(freshPassword);
    await page.getByLabel("Confirm Password", { exact: true }).fill(differentPassword);

    await page.getByRole("button", { name: "Register" }).click();

    const alertMessage = page.locator("#flash");

    await expect(alertMessage).toBeVisible();
    await expect(alertMessage).toContainText("Passwords do not match.");
  });

  test("TC-Register-05 - Empty username", async ({ page }) => {
    await page.getByLabel("Password", { exact: true }).fill(freshPassword);
    await page.getByLabel("Confirm Password", { exact: true }).fill(freshPassword);

    await page.getByRole("button", { name: "Register" }).click();

    const alertMessage = page.locator("#flash");

    await expect(alertMessage).toBeVisible();
    await expect(alertMessage).toContainText("All fields are required.");
  });

  test("TC-Register-06 - Empty password", async ({ page }) => {
    await page.getByLabel("Username").fill(freshUsername);
    await page.getByLabel("Confirm Password", { exact: true }).fill(freshPassword);

    await page.getByRole("button", { name: "Register" }).click();

    const alertMessage = page.locator("#flash");

    await expect(alertMessage).toBeVisible();
    await expect(alertMessage).toContainText("All fields are required.");
  });

  test("TC-Register-07 - Empty confirm password", async ({ page }) => {
    await page.getByLabel("Username").fill(freshUsername);
    await page.getByLabel("Password", { exact: true }).fill(freshPassword);

    await page.getByRole("button", { name: "Register" }).click();

    const alertMessage = page.locator("#flash");

    await expect(alertMessage).toBeVisible();
    await expect(alertMessage).toContainText("All fields are required.");
  });

  test("TC-Register-08 - Register with already existing credentials", async ({
    page,
  }) => {
    await page.getByLabel("Username").fill(existingUsername);
    await page.getByLabel("Password", { exact: true }).fill(existingPassword);
    await page.getByLabel("Confirm Password", { exact: true }).fill(existingPassword);

    await page.getByRole("button", { name: "Register" }).click();

    const alertMessage = page.locator("#flash");

    await expect(alertMessage).toBeVisible();
    await expect(alertMessage).toContainText("Username is already taken.");
  });
});
