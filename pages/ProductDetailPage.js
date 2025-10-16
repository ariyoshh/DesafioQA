class ProductDetailPage {
  constructor(page) {
    this.page = page;
    this.productName = '.inventory_details_name';
    this.productPrice = '.inventory_details_price';
    this.productDescription = '.inventory_details_desc';
    this.addToCartButton = '.btn_primary.btn_inventory';
    this.backButton = '[data-test="back-to-products"]';
  }

  
  async getProductInfo() {
    const name = await this.page.locator(this.productName).innerText();
    const price = await this.page.locator(this.productPrice).innerText();
    const description = await this.page.locator(this.productDescription).innerText();
    return { name, price, description };
  }

 
  async addToCart() {
    await this.page.click(this.addToCartButton);
  }

 
  async backToProducts() {
    await this.page.click(this.backButton);
  }
}

module.exports = { ProductDetailPage };