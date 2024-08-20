/// <reference types="cypress" />

import Login from "../../support/pom/Login/login";

describe('Validate: Login Positive Flow', function() {

    const userEmail = "diwakar@simformsolutions.com";
    const userPassword = "1234";

    const log = new Login();

    
    it('Validate: Successful Login with valid Credentials', function() {
        log.makeLogin(userEmail, userPassword);
        log.loggedInConfirmation();
    })
})

describe('Validate: Negative Scenarios', function() {

    const log = new Login();
    const userEmail = "123@1.com";
    const userPassword = "1234"

    it('Validate: Error Message for invalid credentials', function() {
        log.makeLogin(userEmail, userPassword);
        log.validateInvalidLoginErrorMessage();
    })

    it('There is no error message for user Email & user Password', function() {

    })

})