const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test('Deve completar o fluxo de checkout com sucesso', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await productsPage.addFirstProductToCart();
  
  await page.click('.shopping_cart_link');
  await cartPage.proceedToCheckout();

  await checkoutPage.fillShippingInfo('João', 'Silva', '12345678');
  await checkoutPage.continueToOverview();

  const summary = await checkoutPage.getOrderSummary();
  console.log('Resumo do pedido:', summary);

  await checkoutPage.finishOrder();

  const successMessage = await checkoutPage.getSuccessMessage();
  expect(successMessage).toContain('Thank you for your order');
});