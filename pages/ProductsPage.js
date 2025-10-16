class ProductsPage {
  constructor(page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.itemNames = page.locator('.inventory_item_name');
    this.itemPrices = page.locator('.inventory_item_price');
    this.addToCartButtons = page.locator('.btn_primary'); 
    // this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
  }

  async openFirstProduct() {
    await this.itemNames.first().click();
  }

  async getFirstProductInfo() {
    const name = await this.itemNames.first().innerText();
    const price = await this.itemPrices.first().innerText();
    return { name, price };
  }

  async addFirstProductToCart() {
    await this.addToCartButtons.first().click();
  }
}

module.exports = { ProductsPage };
