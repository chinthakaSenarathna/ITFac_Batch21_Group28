import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import CategoriesPage from "../../../pages/category/CategoryPage.js";
import LoginPage from "../../../pages/plants/LoginPage.js";

// ========== NAVIGATION ==========

Given('Admin navigates to Categories page', () => {
    CategoriesPage.visit();
    cy.url().should('include', '/ui/categories');
    cy.get('table', { timeout: 10000 }).should('be.visible');
});

// ========== TABLE VALIDATIONS ==========

Then('Categories table should be visible', () => {
    CategoriesPage.categoriesTable.should('be.visible');
});

Then('Table should have columns {string}, {string}, {string}, {string}', (col1, col2, col3, col4) => {
    cy.get('table thead').within(() => {
        cy.get('th, td').should('contain.text', col1);
        cy.get('th, td').should('contain.text', col2);
        cy.get('th, td').should('contain.text', col3);
        cy.get('th, td').should('contain.text', col4);
    });
});

Then('"Add A Category" button should be visible', () => {
    CategoriesPage.addCategoryButton.should('be.visible');
});

Then('At least one category should be displayed in the table', () => {
    cy.get('table tbody tr').should('have.length.at.least', 1);
    cy.get('table tbody tr').first().find('td').should('have.length.at.least', 2);
});

Then('Category {string} should be visible in the table', (name) => {
    CategoriesPage.categoriesTable.should('contain.text', name);
});

// ========== ACTION BUTTONS ==========

Then('Edit button should be visible for each category row', () => {
    cy.get('table tbody tr').each(($row) => {
        if ($row.text().includes('No category found')) return;
        cy.wrap($row).find('a[title="Edit"], a.btn-warning, a.btn-primary').should('have.length.at.least', 1);
    });
});

Then('Delete button should be visible for each category row', () => {
    cy.get('table tbody tr').each(($row) => {
        if ($row.text().includes('No category found')) return;
        cy.wrap($row).find('.btn-danger, button.btn-danger, a.btn-danger').should('have.length.at.least', 1);
    });
});

// ========== SEARCH ==========

When('Admin types {string} in the search field', (text) => {
    CategoriesPage.searchInput.clear().type(text);
});

When('Admin clicks the Search button', () => {
    CategoriesPage.searchButton.click();
});

When('Admin clicks the Reset button', () => {
    CategoriesPage.resetButton.click();
    cy.get('table', { timeout: 5000 }).should('be.visible');
});

Then('No category found message should be displayed', () => {
    cy.get('table tbody').should('contain.text', 'No category found');
});

// ========== DROPDOWN ==========

Then('Parent dropdown should be visible', () => {
    CategoriesPage.parentDropdown.should('be.visible');
});

Then('Parent dropdown should have {string} as default option', (defaultText) => {
    CategoriesPage.parentDropdown.find('option').first().should('contain.text', defaultText);
});

// ========== SORTING ==========

When('Admin clicks the ID column header', () => {
    CategoriesPage.idSortHeader.click();
});

// ========== SIDEBAR ==========

Then('Sidebar should contain {string} link', (linkText) => {
    cy.get('nav, .sidebar, aside, [class*="sidebar"], [class*="nav"]')
        .should('contain.text', linkText);
});
