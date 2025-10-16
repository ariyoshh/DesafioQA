const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('Deve fazer login com sucesso com credenciais válidas', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // Validação mais robusta usando o método do Page Object
  const isLoggedIn = await loginPage.isLoggedIn();
  expect(isLoggedIn).toBe(true);
  
  // Validação adicional da URL
  await expect(page).toHaveURL(/inventory.html/);
});