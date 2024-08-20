class Login {

    goToLoginPage(){
        cy.visit("https://ecommerce-playground.lambdatest.io/index.php?route=account/login");
    }

    getEmail() {
       return cy.get("#input-email");
    }

    typeEmail(userEmail) {
        this.getEmail().type(userEmail);
    }

    getPassword() {
        return cy.get("#input-password");
    }

    typePassword(userPassword) {
        this.getPassword().type(userPassword);
    }

    clickSubmit() {
        cy.get('input[value="Login"]').click();
    }

    loggedInConfirmation() {
        cy.url().should('eq', 'https://ecommerce-playground.lambdatest.io/index.php?route=account/account');
    }

    validateInvalidLoginErrorMessage() {
        cy.get('#account-login > .alert').should('have.text', ' Warning: No match for E-Mail Address and/or Password.');
    }
}

export default Login;