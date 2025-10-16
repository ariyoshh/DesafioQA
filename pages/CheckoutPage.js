class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = '#first-name';
    this.lastNameField = '#last-name';
    this.postalCodeField = '#postal-code';
    this.continueButton = '#continue';
    this.finishButton = '#finish';
    this.itemTotal = '.summary_subtotal_label';
    this.tax = '.summary_tax_label';
    this.total = '.summary_total_label';
    this.completeHeader = '.complete-header';
  }

  async fillShippingInfo(firstName, lastName, postalCode) {
    await this.page.fill(this.firstNameField, firstName);
    await this.page.fill(this.lastNameField, lastName);
    await this.page.fill(this.postalCodeField, postalCode);
  }

  async continueToOverview() {
    await this.page.click(this.continueButton);
  }

  async finishOrder() {
    await this.page.click(this.finishButton);
  }

  async getOrderSummary() {
    const itemTotal = await this.page.locator(this.itemTotal).innerText();
    const tax = await this.page.locator(this.tax).innerText();
    const total = await this.page.locator(this.total).innerText();
    return { itemTotal, tax, total };
  }

  async getSuccessMessage() {
    return await this.page.locator(this.completeHeader).innerText();
  }
}

module.exports = { CheckoutPage };