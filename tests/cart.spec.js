const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');

test('Deve adicionar produto ao carrinho e validar informações', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await productsPage.addFirstProductToCart();
  
  await page.click('.shopping_cart_link');
  
  await expect(page).toHaveURL(/cart.html/);
  
  const cartItem = await cartPage.getFirstCartItemInfo();
  console.log(`Produto no carrinho: ${cartItem.name} - ${cartItem.price}`);
  
  await cartPage.proceedToCheckout();
  await expect(page).toHaveURL(/checkout-step-one.html/);
});