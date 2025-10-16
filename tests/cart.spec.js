const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');

test('Deve adicionar produto ao carrinho e validar informações', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  // Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // Adiciona produto ao carrinho
  await productsPage.addFirstProductToCart();
  
  // Navega para o carrinho
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/cart.html/);
  
  // Obtém informações do item no carrinho
  const cartItem = await cartPage.getFirstCartItemInfo();
  console.log(`🛒 Produto no carrinho: ${cartItem.name} - ${cartItem.price}`);
  
  // Validações
  expect(cartItem.name).toBeTruthy();
  expect(cartItem.price).toMatch(/\$\d+\.\d+/);
  await expect(page.locator('.cart_item')).toContainText(cartItem.name);
  
  // Prossegue para checkout
  await cartPage.proceedToCheckout();
  await expect(page).toHaveURL(/checkout-step-one.html/);
});