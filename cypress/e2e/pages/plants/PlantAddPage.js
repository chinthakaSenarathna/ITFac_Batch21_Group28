class PlantAddPage {
    // Locators
    // Priority: ID > Name > CSS
    // plants-add.html

    // Form Fields
    get plantNameInput() {
        return cy.get('input[name="name"]');
    }

    get categorySelect() {
        return cy.get('select[name="categoryId"]');
    }

    get priceInput() {
        return cy.get('input[name="price"]');
    }

    get quantityInput() {
        return cy.get('input[name="quantity"]');
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

    // Methods
    visitAdd() {
        cy.visit('/ui/plants/add');
    }

    visitEdit(plantId) {
        cy.visit(`/ui/plants/edit/${plantId}`);
    }

    enterPlantName(name) {
        this.plantNameInput.clear();
        this.plantNameInput.type(name);
    }

    selectCategory(categoryText) {
        this.categorySelect.select(categoryText);
    }

    selectFirstCategory() {
        this.categorySelect.select(1); // Select first category option
    }

    enterPrice(price) {
        this.priceInput.clear();
        this.priceInput.type(price);
    }

    enterQuantity(quantity) {
        this.quantityInput.clear();
        this.quantityInput.type(quantity);
    }

    clickSave() {
        this.saveButton.click();
    }

    clickCancel() {
        this.cancelButton.click();
    }

    fillFormAndSave(plantName, category, price, quantity) {
        this.enterPlantName(plantName);
        this.selectCategory(category);
        this.enterPrice(price);
        this.enterQuantity(quantity);
        this.clickSave();
    }

    fillFormWithFirstCategory(plantName, price, quantity) {
        this.enterPlantName(plantName);
        this.selectFirstCategory();
        this.enterPrice(price);
        this.enterQuantity(quantity);
    }
}

export default new PlantAddPage();
