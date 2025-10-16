class ProductsPage {
  constructor(page) {
    this.page = page;
    this.inventoryItem = '.inventory_item';
    this.inventoryItemName = '.inventory_item_name';
    this.inventoryItemPrice = '.inventory_item_price';
    this.addToCartButton = '.btn_primary';
  }

  async getFirstProduct() {
    return this.page.locator(this.inventoryItem).first();
  }

  async openFirstProduct() {
    const product = await this.getFirstProduct();
    await product.locator(this.inventoryItemName).click();
  }

  async getFirstProductInfo() {
    const product = await this.getFirstProduct();
    const name = await product.locator(this.inventoryItemName).innerText();
    const price = await product.locator(this.inventoryItemPrice).innerText();
    return { name, price };
  }

  async addFirstProductToCart() {
    const product = await this.getFirstProduct();
    await product.locator(this.addToCartButton).click();
  }
}

module.exports = { ProductsPage };