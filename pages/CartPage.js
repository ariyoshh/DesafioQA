class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItem = '.cart_item';
    this.cartItemName = '.inventory_item_name';
    this.cartItemPrice = '.inventory_item_price';
    this.checkoutButton = '#checkout';
    this.continueShoppingButton = '#continue-shopping';
  }

  getCartItems() {
    return this.page.locator(this.cartItem);
  }

  async getFirstCartItemInfo() {
    const firstItem = this.getCartItems().first();
    const name = await firstItem.locator(this.cartItemName).innerText();
    const price = await firstItem.locator(this.cartItemPrice).innerText();
    return { name, price };
  }

  async proceedToCheckout() {
    await this.page.click(this.checkoutButton);
  }

  async continueShopping() {
    await this.page.click(this.continueShoppingButton);
  }
}

module.exports = { CartPage };