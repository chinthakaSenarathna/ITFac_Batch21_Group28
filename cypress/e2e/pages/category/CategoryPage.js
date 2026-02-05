class CategoryPage {
    // Locators
    // Priority: ID > Name > CSS
    // categories.html

    // Search and Filter
    get searchInput() {
        return cy.get('input[name="name"]');
    }

    get searchButton() {
        // Form button
        return cy.contains('button', 'Search');
    }

    get resetButton() {
        return cy.contains('a', 'Reset');
    }

    // Admin Actions
    get addCategoryButton() {
        return cy.contains('a', 'Add Category');
    }

    // Table
    get categoryTable() {
        return cy.get('table');
    }

    get tableRows() {
        return cy.get('table tbody tr');
    }

    get noCategoriesMessage() {
        return cy.contains('td', 'No categories found');
    }

    // Methods
    visit() {
        cy.visit('/ui/categories');
    }

    searchCategory(name) {
        this.searchInput.clear();
        if (name) {
            this.searchInput.type(name);
        }
    }

    clickSearch() {
        this.searchButton.click();
    }

    clickReset() {
        this.resetButton.click();
    }

    getCategoryRow(categoryName) {
        return this.tableRows.contains('td', categoryName).parent();
    }

    // Admin Methods
    clickAddCategory() {
        this.addCategoryButton.click();
    }

    isAddCategoryButtonVisible() {
        return cy.get('body').then($body => {
            return $body.find('a:contains("Add Category")').length > 0;
        });
    }

    getEditButtonForCategory(categoryName) {
        return this.getCategoryRow(categoryName).within(() => {
            cy.get('a[title="Edit"]');
        });
    }

    getDeleteButtonForCategory(categoryName) {
        return this.getCategoryRow(categoryName).within(() => {
            cy.get('button[title="Delete"]');
        });
    }

    clickEdit(categoryName) {
        this.getCategoryRow(categoryName).find('a[title="Edit"]').click();
    }

    clickDelete(categoryName) {
        this.getCategoryRow(categoryName).find('button[title="Delete"]').click();
    }

    confirmDelete() {
        // Assuming confirmation dialog
        cy.contains('button', 'Confirm').click();
    }

    isEditActionVisible(categoryName) {
        return cy.get('body').then($body => {
            const row = $body.find('td:contains("' + categoryName + '")').closest('tr');
            return row.find('a[title="Edit"]').length > 0;
        });
    }

    isDeleteActionVisible(categoryName) {
        return cy.get('body').then($body => {
            const row = $body.find('td:contains("' + categoryName + '")').closest('tr');
            return row.find('button[title="Delete"]').length > 0;
        });
    }

    getPlantCountForCategory(categoryName) {
        return this.getCategoryRow(categoryName).find('td').eq(2); // Assuming 3rd column is plant count
    }
}

export default new CategoryPage();
