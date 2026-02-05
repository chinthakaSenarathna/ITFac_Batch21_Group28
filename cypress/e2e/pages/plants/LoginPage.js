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
        // Wait for page to be fully loaded
        this.usernameInput.should('be.visible');
    }

    login(username, password) {
        // Wait for elements to be visible and interactable before typing
        this.usernameInput.should('be.visible').clear().type(username);
        this.passwordInput.should('be.visible').clear().type(password);
        
        // Ensure button is clickable
        this.loginButton.should('be.visible').should('not.be.disabled').click();
        
        // Wait for navigation to complete (away from login page)
        cy.url().should('not.include', '/ui/login', { timeout: 10000 });
    }
}

export default new LoginPage();
