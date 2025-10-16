const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { ProductDetailPage } = require('../pages/ProductDetailPage');

test('Deve validar título, preço e descrição do produto na página de detalhes', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const productDetailPage = new ProductDetailPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory.html/);

  const productListInfo = await productsPage.getFirstProductInfo();
  
  await productsPage.openFirstProduct();

  const productDetailInfo = await productDetailPage.getProductInfo();

  console.log('=== VALIDAÇÃO COMPLETA DO PRODUTO ===');
  console.log(`📝 Nome: ${productDetailInfo.name}`);
  console.log(`💰 Preço: ${productDetailInfo.price}`);
  console.log(`📄 Descrição: ${productDetailInfo.description.substring(0, 80)}...`);

  expect(productDetailInfo.name).toBeTruthy(); 
  expect(productDetailInfo.price).toMatch(/\$\d+\.\d+/); 
  expect(productDetailInfo.description).toBeTruthy();

  await productDetailPage.addToCart();
});