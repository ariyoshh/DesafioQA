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

  // Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // Adiciona produto e vai para o carrinho
  await productsPage.addFirstProductToCart();
  await page.click('.shopping_cart_link');
  await cartPage.proceedToCheckout();

  // Preenche informações de envio
  await checkoutPage.fillShippingInfo('João', 'Silva', '12345678');
  await checkoutPage.continueToOverview();

  // Obtém e valida resumo do pedido
  const summary = await checkoutPage.getOrderSummary();
  console.log(`🧾 Resumo do pedido: ${summary.total} (${summary.itemTotal} + ${summary.tax})`);

  // Validações do resumo
  expect(summary.itemTotal).toMatch(/Item total: \$\d+\.\d+/);
  expect(summary.tax).toMatch(/Tax: \$\d+\.\d+/);
  expect(summary.total).toMatch(/Total: \$\d+\.\d+/);

  // Finaliza pedido
  await checkoutPage.finishOrder();

  // Valida mensagem de sucesso
  const successMessage = await checkoutPage.getSuccessMessage();
  expect(successMessage).toContain('Thank you for your order');
  console.log(`✅ ${successMessage}`);
});