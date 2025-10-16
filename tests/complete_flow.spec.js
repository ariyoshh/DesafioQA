const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { ProductDetailPage } = require('../pages/ProductDetailPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test('Fluxo completo: login até finalização de pedido', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const productDetailPage = new ProductDetailPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // 1. Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  
  // 2. Navegação e validação de produto
  const productListInfo = await productsPage.getFirstProductInfo();
  await productsPage.openFirstProduct();
  
  const productDetailInfo = await productDetailPage.getProductInfo();
  
  // Valida consistência dos dados
  expect(productDetailInfo.name).toBe(productListInfo.name);
  expect(productDetailInfo.price).toBe(productListInfo.price);
  
  // 3. Adiciona ao carrinho
  await productDetailPage.addToCart();
  
  // 4. Vai para o carrinho e checkout
  await page.click('.shopping_cart_link');
  await cartPage.proceedToCheckout();
  
  // 5. Preenche checkout e finaliza
  await checkoutPage.fillShippingInfo('Test', 'User', '12345678');
  await checkoutPage.continueToOverview();
  await checkoutPage.finishOrder();
  
  // Valida finalização
  const successMessage = await checkoutPage.getSuccessMessage();
  expect(successMessage).toContain('Thank you for your order');
});