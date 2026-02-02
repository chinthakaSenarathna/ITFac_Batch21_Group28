class LoginPage {
    // Locators
    // Priority: ID > Name > CSS
    // login.html: inputs have no ID, so using Name.
    
    get usernameInput() {
        return cy.get('input[name="username"]');
    }

    get passwordInput() {
        return cy.get('input[name="password"]');
    }

    get loginButton() {
        return cy.get('button[type="submit"]');
    }

    get invalidFeedback() {
        return cy.get('.invalid-feedback');
    }

    get alertError() {
        return cy.get('.alert-danger');
    }

    // Actions
    visit() {
        cy.visit('/ui/login');
    }

    login(username, password) {
        this.usernameInput.type(username);
        this.passwordInput.type(password);
        this.loginButton.click();
    }
}

export default new LoginPage();
