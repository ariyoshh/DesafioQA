class ProductDetailPage {
  constructor(page) {
    this.page = page;
    this.productName = page.locator('.inventory_details_name');
    this.productPrice = page.locator('.inventory_details_price');
    this.productDescription = page.locator('.inventory_details_desc');
    this.addToCartButton = page.locator('.btn_primary.btn_inventory'); // poderia ser data-test também
    this.backButton = page.locator('[data-test="back-to-products"]');
  }

  async getProductInfo() {
    const name = await this.productName.innerText();
    const price = await this.productPrice.innerText();
    const description = await this.productDescription.innerText();
    return { name, price, description };
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async backToProducts() {
    await this.backButton.click();
  }
}

module.exports = { ProductDetailPage };
