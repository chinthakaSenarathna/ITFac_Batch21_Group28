class SalesPage {

    // Elements
    get sellPlantButton() {
        return cy.contains('button', 'Sell Plant');
    }

    get salesTable() {
        return cy.get('table');
    }

    get plantDropdown() {
        return cy.get('select[name="plantId"]');
    }

    get quantityInput() {
        return cy.get('input[name="quantity"]');
    }

    get confirmButton() {
        return cy.contains('button', 'Confirm');
    }

    get successAlert() {
        return cy.get('.alert-success');
    }

    get errorMessage() {
        return cy.get('.alert-danger, .text-danger');
    }

    // Actions
    visit() {
        cy.visit('/ui/sales');
    }

    selectFirstPlant() {
        this.plantDropdown.select(1);
    }

    selectPlantByName(name) {
        this.plantDropdown.select(name);
    }

    enterQuantity(qty) {
        this.quantityInput.clear();
        this.quantityInput.type(qty);
    }

    confirmSale() {
        this.confirmButton.click();
    }
}

export default new SalesPage();
