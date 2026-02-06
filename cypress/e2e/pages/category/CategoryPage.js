class CategoriesPage {

    visit() {
        cy.visit('/ui/categories');
    }

    // ===== TABLE =====
    get categoriesTable() {
        return cy.get('table');
    }

    get emptyStateRow() {
        return cy.get('table tbody tr td');
    }

    // ===== BUTTONS =====
    get addCategoryButton() {
        return cy.contains('a', 'Add A Category');
    }

    get searchButton() {
        return cy.contains('button', 'Search');
    }

    get resetButton() {
        return cy.contains('a', 'Reset');
    }

    // ===== SEARCH / FILTER =====
    get searchInput() {
        return cy.get('input[name="name"]');
    }

    get parentDropdown() {
        return cy.get('select[name="parentId"]');
    }

    selectFirstParent() {
        this.parentDropdown.select(1);
    }

    // ===== SORT HEADERS =====
    get idSortHeader() {
        return cy.contains('a', 'ID');
    }

    get nameSortHeader() {
        return cy.contains('a', 'Name');
    }

    get parentSortHeader() {
        return cy.contains('a', 'Parent');
    }

    // ===== DELETE =====
    get firstDeleteButton() {
        return cy.get('table tbody tr:first-child button[data-bs-target="#deleteModal"]');
    }

    get deleteModal() {
        return cy.get('#deleteModal');
    }

    get confirmDeleteButton() {
        return cy.get('#deleteForm button.btn-danger');
    }

    get cancelDeleteButton() {
        return cy.get('#deleteModal button.btn-secondary');
    }

    // Alerts
    get successAlert() {
        return cy.get('.alert-success');
    }

    // Helper Methods
    getCategoryRow(categoryName) {
        return cy.get('table tbody tr').contains('td', categoryName).parent();
    }

    clickEdit(categoryName) {
        this.getCategoryRow(categoryName).find('a[title="Edit"]').click();
    }

    clickDelete(categoryName) {
        this.getCategoryRow(categoryName).find('button[data-bs-target="#deleteModal"]').click();
    }

    confirmDelete() {
        this.confirmDeleteButton.click();
    }
}

export default new CategoriesPage();
