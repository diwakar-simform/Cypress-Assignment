class Register {

    goToRegistrationPage() {
        cy.get('.title').contains(' My account').click({force:true});
        cy.contains(' Register').click({force:true});
    }

    getFirstName() {
        return cy.get('input[name="firstname"]');
    }

    typeFirstName(firstName) {
        this.getFirstName().type(firstName);
    }

    getLastName() {
        return cy.get('input[name="lastname"]');
    }

    typeLastName(lastName) {
        this.getLastName().type(lastName);
    }

    getEmail() {
        return cy.get('input[name="email"]');
    }

    typeEmail(userEmail) {
        this.getEmail().type(userEmail);
    }

    getTelephone() {
        return cy.get('input[name="telephone"]');
    }

    typeTelephone(telephone) {
        this.getTelephone().type(telephone);
    }

    getPassword() {
        return cy.get('input[name="password"]');
    }

    typePassword(password) {
        this.getPassword().type(password);
    }

    getConfirmPassword() {
       return cy.get('input[name="confirm"]');
    }

    typeConfirmPassword(cnfPassword) {
        this.getConfirmPassword().type(cnfPassword);
    }

    agreementCheckbox() {
        return cy.get('input[name="agree"]');
    }

    submit() {
        cy.get('input[value="Continue"]').click();
    }

    confirmRegistration() {
        cy.get("#content h1").should('have.text',' Your Account Has Been Created!');
    }

    validatePrivacyPolicyWarningMessage() {
        cy.get('#account-register > .alert').should('have.text',' Warning: You must agree to the Privacy Policy!');
    }

    confirmUrl() {
        cy.url().then((currentUrl) => {
            // Click the submit button
            this.submit();
          
            // Verify that the URL remains the same
            cy.url().should('eq', currentUrl);
        });          
    }

    validateFieldErrorMessage(locator, errorMessage) {
        locator.should('be.visible').and('have.text', errorMessage);
    }

    getFirstNameErrorMessage() {
        return this.getFirstName().next();
    }

    getLastNameErrorMessage() {
        return this.getLastName().next();
    }

    getEmailErrorMessage() {
        return this.getEmail().next();
    }

    getTelephoneErrorMessage() {
        return this.getTelephone().next();
    }

    getPasswordErrorMessage() {
        return this.getPassword().next();
    } 

    getAlreadyRegisteredEmailErrorMessage() {
        return cy.get('#account-register > .alert');
    }

    getTelephoneStatusMessage() {
        return cy.get('#input-telephone-help');
    }

    getCnfPasswordFieldErrorMessage() {
        return this.getConfirmPassword().next();
    }
}

export default Register;