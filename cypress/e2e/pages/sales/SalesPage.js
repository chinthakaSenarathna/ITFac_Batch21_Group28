class SalesPage {

    visit() {
        cy.visit('/ui/sales');
    }

    // Main Sales table
    get salesTable() {
        return cy.get('table');
    }

    // Sell Plant button on Sales page
    get sellPlantButton() {
        return cy.contains('a', 'Sell Plant');
    }

    // ===== Sell Plant form =====
    get plantDropdown() {
        return cy.get('select#plantId');
    }

    get quantityInput() {
        return cy.get('input#quantity');
    }

    get confirmSaleButton() {
        return cy.contains('button', 'Sell');
    }

    // Alerts
    get successAlert() {
        return cy.get('.alert-success');
    }

    get errorAlert() {
        return cy.get('div.text-danger'); // for Plant required
    }

    get stockErrorAlert() {
        return cy.get('.alert.alert-danger'); // stock or other errors
    }

    // Close button of alert
    get stockAlertCloseButton() {
        return cy.get('.alert.alert-danger .btn-close');
    }

    get firstSaleDeleteButton() {
        return cy.get('table tbody tr:first-child form button');
    }
    
    deleteFirstSale() {
        this.firstSaleDeleteButton.click();
        cy.on('window:confirm', () => true); // accept alert
    }
    
    validateSuccessAlert() {
        this.successAlert
            .should('be.visible')
            .and('contain.text', 'Sale deleted successfully');
    }    

    // Clear quantity field
    clearQuantity() {
        this.quantityInput.clear();
    }

    // ===== Methods =====
    selectFirstPlant() {
        this.plantDropdown.select(1);
    }

    selectPlantByName(name) {
        this.plantDropdown.select(name);
    }

    selectPlantByValue(value) {
        this.plantDropdown.select(value); // empty string '' to deselect
    }

    enterQuantity(qty) {
        this.quantityInput.clear().type(qty);
    }

    confirmSale() {
        this.confirmSaleButton.click();
    }
}

export default new SalesPage();
