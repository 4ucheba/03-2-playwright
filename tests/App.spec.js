const { test, expect } = require("@playwright/test");
const { email, password } = require("../user");

test("Autorization successful", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").fill(password);
  await page.getByTestId("login-submit-btn").click();
  await expect(await page.locator("h2")).toContainText("Моё обучение", {
    timeout: 15000,
  });
});

test("Autorization failed", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill("test@test.ru");
  await page.getByPlaceholder("Пароль").fill("wrongPass");
  await page.getByTestId("login-submit-btn").click();
  const error = await page.locator('[data-testid="login-error-hint"]');
  await expect(error).toHaveText("Вы ввели неправильно логин или пароль", {
    timeout: 15000,
  });
 });
