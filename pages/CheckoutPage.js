class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.locator('#first-name');
    this.lastNameField = page.locator('#last-name');
    this.postalCodeField = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.finishButton = page.locator('#finish');
    this.itemTotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');
    this.completeHeader = page.locator('.complete-header');
  }

  async fillShippingInfo(firstName, lastName, postalCode) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.postalCodeField.fill(postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async getOrderSummary() {
    const itemTotal = await this.itemTotal.innerText();
    const tax = await this.tax.innerText();
    const total = await this.total.innerText();
    return { itemTotal, tax, total };
  }

  async getSuccessMessage() {
    return await this.completeHeader.innerText();
  }
}

module.exports = { CheckoutPage };