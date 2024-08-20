/// <reference types="cypress" />

import Login from "../../pom/Login/Login"

describe('Validate: Login Positive Flow', function() {

    const userEmail = "diwakar@simformsolutions.com";
    const userPassword = "1234";

    const log = new Login();

    
    it('Validate: Successful Login with valid Credentials', function() {
        log.goToLoginPage();
        log.typeEmail(userEmail);
        log.typePassword(userPassword);
        log.clickSubmit();
        log.loggedInConfirmation();
    })
})

describe('Validate: Negative Scenarios', function() {

    const log = new Login();
    const userEmail = "123@1.com";
    const userPassword = "1234"

    it('Validate: Error Message for invalid credentials', function() {
        log.goToLoginPage();
        log.typeEmail(userEmail);
        log.typePassword(userPassword);
        log.clickSubmit();
        log.validateInvalidLoginErrorMessage();
    })

    it('There is no error message for user Email & user Password', function() {

    })

})