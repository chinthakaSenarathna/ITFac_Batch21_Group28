class CategoryAddPage {
    // Locators
    // Priority: ID > Name > CSS
    // categories-add.html

    // Form Fields
    get categoryNameInput() {
        return cy.get('input[name="name"]');
    }

    get categoryDescriptionInput() {
        return cy.get('textarea[name="description"]');
    }

    // Buttons
    get saveButton() {
        return cy.contains('button', 'Save');
    }

    get cancelButton() {
        return cy.contains('a', 'Cancel');
    }

    // Page Title
    get pageTitle() {
        return cy.get('h3');
    }

    // Error Messages
    get errorMessage() {
        return cy.get('.alert-danger');
    }

    get fieldErrorMessage() {
        return cy.get('.text-danger');
    }

    get successMessage() {
        return cy.get('.alert-success');
    }

    // Methods
    visitAdd() {
        cy.visit('/ui/categories/add');
    }

    visitEdit(categoryId) {
        cy.visit(`/ui/categories/edit/${categoryId}`);
    }

    enterCategoryName(name) {
        this.categoryNameInput.clear();
        this.categoryNameInput.type(name);
    }

    enterCategoryDescription(description) {
        this.categoryDescriptionInput.clear();
        this.categoryDescriptionInput.type(description);
    }

    clickSave() {
        this.saveButton.click();
    }

    clickCancel() {
        this.cancelButton.click();
    }

    fillFormAndSave(categoryName, description) {
        this.enterCategoryName(categoryName);
        this.enterCategoryDescription(description);
        this.clickSave();
    }

    updateCategoryName(newName) {
        this.categoryNameInput.clear();
        this.categoryNameInput.type(newName);
    }

    updateCategoryDescription(newDescription) {
        this.categoryDescriptionInput.clear();
        this.categoryDescriptionInput.type(newDescription);
    }

    verifyPageTitle(expectedTitle) {
        this.pageTitle.should('contain.text', expectedTitle);
    }

    verifyErrorMessageDisplayed() {
        this.errorMessage.should('be.visible');
    }

    verifyErrorMessageContains(text) {
        this.errorMessage.should('contain.text', text);
    }

    clearForm() {
        this.categoryNameInput.clear();
        this.categoryDescriptionInput.clear();
    }
}

export default new CategoryAddPage();
