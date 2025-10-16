const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { ProductDetailPage } = require('../pages/ProductDetailPage');

test('Deve validar título, preço e descrição do produto na página de detalhes', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const productDetailPage = new ProductDetailPage(page);

  // Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory.html/);

  // Obtém info do produto na listagem
  const productListInfo = await productsPage.getFirstProductInfo();
  
  // Abre a página de detalhes
  await productsPage.openFirstProduct();

  // Obtém info do produto na página de detalhes
  const productDetailInfo = await productDetailPage.getProductInfo();

  // Logs mais profissionais
  console.log(`✅ Produto validado: ${productDetailInfo.name} | ${productDetailInfo.price}`);
  console.log(`📄 Descrição: ${productDetailInfo.description.substring(0, 60)}...`);

  // Validações robustas
  expect(productDetailInfo.name).toBe(productListInfo.name);
  expect(productDetailInfo.price).toBe(productListInfo.price);
  expect(productDetailInfo.name).toBeTruthy();
  expect(productDetailInfo.price).toMatch(/\$\d+\.\d+/);
  expect(productDetailInfo.description).toBeTruthy();

  // Adiciona ao carrinho
  await productDetailPage.addToCart();
});