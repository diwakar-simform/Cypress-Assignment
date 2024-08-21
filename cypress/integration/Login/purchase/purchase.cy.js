/// <reference types="cypress" />

import Main from "../../../support/pom/main";
import Login from "../../../support/pom/Login/login";
import Purchase from "../../../support/pom/Login/purchase/purchase";
import Register from "../../../support/pom/register/register";

// make a function validateErrorMessage(locator, errorMessage);

describe('Purchase a product', function() {
    
    const home = new Main();
    const purchase = new Purchase();
    const log = new Login();
    const register = new Register();

    const productId = "mz-product-listing-image-37217944-0-4";
    const userEmail = "diwakar@simformsolutions.com";
    const userPassword = "1234";
    var productName;
    
    beforeEach('Login & Buy Product', function() {
        log.makeLogin(userEmail, userPassword);
        log.loggedInConfirmation();
        home.homePage();
        purchase.selectProduct(productId);
        purchase.addToCart();
        purchase.buyNow();
        register.agreementCheckbox().check({force:true});
    })

    afterEach('Order Confirmation', function() {
        purchase.orderConfirmationMessage();
        purchase.verifyOrderConfirmationUrl();
    })

    
    it('Place order: with already existing address', function() {
        purchase.checkout();
        purchase.placeOrder();
    })

    it('Place order: with new address', function() {
        const firstName = "Rahul";
        const lastName = "Yadav";
        const companyName = "Cricket";
        const address1 = "Tagore Park";
        const address2 = "Nehrunagar";
        const cityName = "Ahmedabad";
        const postCode = "380015";
        const countryName = "India";
        const regionName = "Gujarat";
        
        purchase.deliverToNewAddress();
        register.typeFirstName(firstName);
        register.typeLastName(lastName);
        purchase.typeCompany(companyName);
        purchase.typeAddress1(address1);
        purchase.typeAddress2(address2);
        purchase.typeCity(cityName);
        purchase.typePostCode(postCode);
        purchase.selectCountry(countryName);
        purchase.selectRegion(regionName);
        purchase.checkout();
        purchase.placeOrder();
    });
})

describe('Validate ordered products', function() {
    const userEmail = "diwakar@simformsolutions.com";
    const userPassword = "1234"; 
    const productId = "mz-product-listing-image-37217944-0-4";

    var productName;

    const home = new Main();
    const log = new Login();
    const purchase = new Purchase();

    beforeEach('Login & Buy Product', function() {
        log.makeLogin(userEmail, userPassword);
        log.loggedInConfirmation();
        home.homePage();
        purchase.selectProduct(productId);
        purchase.getProductName().then((prodName) =>{
            productName = prodName;
        });
    })

    it.only("Validate: The order details in the user's order history or account dashboard", function() {
        log.goToLoginPage();
        productName = productName+"\n";
        cy.get('.row').contains(' View your order history').click();
        cy.get('tbody > :nth-child(1) > :nth-child(7)').click(); //View the first product
        // Validate: on the basis of product name.
        cy.get('#content > .table-responsive > .table > tbody > tr > :nth-child(1)').should('have.text', productName);
    });
})