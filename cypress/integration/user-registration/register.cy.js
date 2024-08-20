/// <reference types="cypress" />

import Main from "../../support/pom/main";
import Register from "../../support/pom/register/register";

describe('User Registration Positive Scenario', function() {

    const firstName = "Diwakar";
    const lastName = "Kumar";
    const userEmail = "diwakar@1.com";
    const userTelephone = "1234567890";
    const userPassword = "1234";

    const homePage = new Main();
    const register = new Register();

    it('Positive Test Case - Register a new user', function() {
        homePage.homePage(); // visit home page
        register.goToRegistrationPage();
        register.typeFirstName(firstName);
        register.typeLastName(lastName);
        register.typeEmail(userEmail);
        register.typeTelephone(userTelephone);
        register.typePassword(userPassword);
        register.typeConfirmPassword(userPassword);
        register.agree();
        register.submit();
        register.confirmRegistration();
    })
})

describe('User Registration Negative Scenario', function() {

    let fixtureData;

    beforeEach(function(){
        homePage.homePage(); // visit home page
        register.goToRegistrationPage();
        cy.fixture('register').then(function(data){
            fixtureData = data;
        })
    })
    const firstName = "Diwakar";
    const lastName = "Kumar";
    const userEmail = "diwakar@1.com";
    const userTelephone = "1234567890";
    const userPassword = "1234";
    const telephoneStatusMessage = "Enter valid phone number with country code!";

    const register = new Register();
    const homePage = new Main();

    it('Validate: Registration Form by submitting blank values to all manadatory fields', function(){
        register.agreementCheckbox().check({force:true});
        register.confirmUrl();       
    })

    it('Validate: Error Message for submitting Registration form without checking the agreement checkbox', function() {
        register.typeFirstName(firstName);
        register.typeLastName(lastName);
        register.typeEmail(userEmail);
        register.typeTelephone(userTelephone);
        register.typePassword(userPassword);
        register.typeConfirmPassword(userPassword);
        register.submit();
        register.confirmAlertMessage();
    })

    it.only('Validate: Error each field error messages', function() {
        register.agreementCheckbox().check({force:true});
        register.submit();
        register.validateFieldErrorMessage(register.getFirstNameErrorMessage(), fixtureData.errorMessage.firstName);
        register.validateFieldErrorMessage(register.getLastNameErrorMessage(), fixtureData.errorMessage.lastName);
        register.validateFieldErrorMessage(register.getEmailErrorMessage(), fixtureData.errorMessage.email);
        register.validateFieldErrorMessage(register.getTelephoneErrorMessage(), fixtureData.errorMessage.telephone);
        register.validateFieldErrorMessage(register.getPasswordErrorMessage(), fixtureData.errorMessage.password);
    })

    it.only('Validate: Alert message for the already registered email', function() {
        const userEmail = "diwakar@simformsolutions.com"
        const alreadyRegisteredEmailErrorMessage = " Warning: E-Mail Address is already registered!";

        register.typeFirstName(firstName);
        register.typeLastName(lastName);
        register.typeEmail(userEmail);
        register.typeTelephone(userTelephone);
        register.typePassword(userPassword);
        register.typeConfirmPassword(userPassword);
        register.agreementCheckbox().check({force:true});
        register.submit();
        register.getAlreadyRegisteredEmailErrorMessage().should('be.visible').and('have.text', alreadyRegisteredEmailErrorMessage);
    })

    it.only('Validate: Error Message for entering mismatched values in password confirm field', function() {
        const password = "1234";
        const cnfPassword = "1222";
        register.typeFirstName(firstName);
        register.typeLastName(lastName);
        register.typeEmail(userEmail);
        register.typeTelephone(userTelephone);
        register.typePassword(password);
        register.typeConfirmPassword(cnfPassword);
        register.agreementCheckbox().check({force:true});
        register.submit();
        register.validateFieldErrorMessage(register.getCnfPasswordFieldErrorMessage(),fixtureData.errorMessage.confirmPassword);
    })

    it.only('Validate: Status message for Telephone field', function() {
        register.getTelephoneStatusMessage().should('have.text', telephoneStatusMessage);
    })

})
