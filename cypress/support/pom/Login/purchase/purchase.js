class Purchase {

    selectProduct(productId) {
        cy.get(`#${productId}`).click();
    }

    getProductName() {
        return cy.get("h1.h3").invoke('text');
    }

    addToCart() {
        cy.get('#entry_216842').click();
    }

    buyNow() {
        cy.get('#entry_216843').click();
    }

    checkout() {
        cy.get('#button-save').click();
    }

    placeOrder() {
        cy.get('#button-confirm').click();
    }

    orderConfirmationMessage() {
        cy.get('.page-title')
          .should('be.visible')
          .and('have.text', ' Your order has been placed!');
    }

    verifyOrderConfirmationUrl() {
        cy.url().should('eq', 'https://ecommerce-playground.lambdatest.io/index.php?route=checkout/success');
    }

    deliverToNewAddress() {
        cy.get('#input-payment-address-new').check({force:true});
    }

    getCompany() {
        return cy.get('#input-payment-company');
    }

    typeCompany(companyName) {
        this.getCompany().type(companyName);
    }

    getAddress1() {
        return cy.get('#input-payment-address-1');
    }

    typeAddress1(address1) {
        this.getAddress1().type(address1);
    }

    getAddress2() {
        return cy.get('#input-payment-address-2');
    }

    typeAddress2(address2) {
        this.getAddress2().type(address2);
    }

    getCity() {
        return cy.get('#input-payment-city');
    }

    typeCity(cityName) {
        this.getCity().type(cityName);
    }

    getPostCode() {
        return cy.get('#input-payment-postcode');
    }

    typePostCode(postCode) {
        this.getPostCode().type(postCode);
    }

    selectCountry(countryName) {
        cy.get('select#input-payment-country').select(countryName);
    }

    selectRegion(regionName) {
        cy.get('select#input-payment-zone').select(regionName);
    }
}

export default Purchase;