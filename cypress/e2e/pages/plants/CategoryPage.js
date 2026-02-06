class CategoryPage {

    get addCategoryButton() { return cy.get('a[href="/ui/categories/add"]'); }
    get nameInput() { return cy.get('input[name="name"]'); }
    get parentCategorySelect() { return cy.get('select[name="parentId"]'); }
    get saveButton() { return cy.get('button[type="submit"]'); }
    get tableRows() { return cy.get('table tbody tr'); }

    visit() {
        cy.visit('/ui/categories');
    }

    clickAddCategory() {
        this.addCategoryButton.click();
    }

    enterCategoryName(name) {
        this.nameInput.clear().type(name);
    }

    selectParentCategory(parentName) {
        this.parentCategorySelect.select(parentName);
    }

    clickSave() {
        this.saveButton.click();
    }

    verifyCategoryVisible(name) {
        this.tableRows.should('contain.text', name);
    }
}

export default new CategoryPage();
