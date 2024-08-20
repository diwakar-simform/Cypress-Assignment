

import Main from "../../../support/pom/main";
import Login from "../../../support/pom/Login/Login";
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
    
    beforeEach('Login & Buy Product', function() {
        log.goToLoginPage();
        log.typeEmail(userEmail);
        log.typePassword(userPassword);
        log.clickSubmit();
        log.loggedInConfirmation();
        home.homePage();
        purchase.selectProduct(productId);
        purchase.addToCart();
        purchase.buyNow();
        register.agree();
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
    })


})