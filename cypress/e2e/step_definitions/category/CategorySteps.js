import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from '../../pages/plants/LoginPage.js';
import CategoryPage from '../../pages/category/CategoryPage.js';
import CategoryAddPage from '../../pages/category/CategoryAddPage.js';

// ========== USER TEST STEPS ==========

// User Login
Given('User is logged in with username {string} and password {string}', (username, password) => {
    LoginPage.visit();
    LoginPage.login(username, password);
    // Verify login success
    cy.url().should('include', '/ui/dashboard'); // Default redirect
});

// User Navigation
Given('User is on Category List page', () => {
    CategoryPage.visit();
});

// Data Setup
Given('Categories like {string}, {string}, and {string} exist in the system', (c1, c2, c3) => {
    // We assume data exists. 
    // Ideally we would seed here.
    cy.log('Assuming categories exist: ' + c1 + ', ' + c2 + ', ' + c3);
});

Given('Category {string} exists with {string} plants', (categoryName, plantCount) => {
    // Assumption
    cy.log('Assuming category ' + categoryName + ' exists with ' + plantCount + ' plants');
});

// Search
When('User enters {string} in the search field', (text) => {
    CategoryPage.searchCategory(text);
});

When('User clears search field', () => {
    CategoryPage.searchInput.clear();
});

When('Click Search button', () => {
    CategoryPage.clickSearch();
});

// Validation
Then('Validate search results display only categories with {string} in name', (name) => {
    CategoryPage.tableRows.each(($row) => {
        // If not empty row
        if ($row.text().includes('No categories found')) return;

        cy.wrap($row).find('td').first().should('contain.text', name);
    });
});

Then('Validate other categories like {string} and {string} are not displayed', (c1, c2) => {
    CategoryPage.tableRows.should('not.contain.text', c1);
    CategoryPage.tableRows.should('not.contain.text', c2);
});

Then('Validate all categories are displayed again', () => {
    // Ideally check count > 0 and no filter applied
    CategoryPage.tableRows.should('be.visible'); // Header + Data
});

Then('Validate search results displays no records', () => {
    // Might show "No categories found" row
    CategoryPage.noCategoriesMessage.should('be.visible');
});

Then('Validate system displays the message {string}', (msg) => {
    CategoryPage.tableRows.should('contain.text', msg);
});

Then('Validate category {string} displays plant count', (categoryName) => {
    CategoryPage.getCategoryRow(categoryName).within(() => {
        cy.get('td').eq(2).should('be.visible'); // Assuming 3rd column is plant count
    });
});

Then('Validate plant count shows {string} plants', (count) => {
    cy.get('table tbody tr').should('contain.text', count);
});

Then('Validate category table is displayed', () => {
    CategoryPage.categoryTable.should('be.visible');
});

Then('Validate table contains columns {string}, {string}, and {string}', (col1, col2, col3) => {
    cy.get('table thead th').should('contain.text', col1);
    cy.get('table thead th').should('contain.text', col2);
    cy.get('table thead th').should('contain.text', col3);
});

Then('Validate at least one category is displayed', () => {
    CategoryPage.tableRows.should('have.length.at.least', 1);
});

Then('Validate navigation to add category page is restricted', () => {
    // Try to visit add page directly and verify redirect or error
    cy.visit('/ui/categories/add', { failOnStatusCode: false });
    cy.url().should('not.include', '/ui/categories/add');
});

// ========== ADMIN TEST STEPS ==========

// Admin Login
Given('Admin is logged in with username {string} and password {string}', (username, password) => {
    LoginPage.visit();
    LoginPage.login(username, password);
    // Verify login success
    cy.url().should('include', '/ui/dashboard'); // Default redirect
});

// Admin Navigation
Given('Admin is on Category List page', () => {
    CategoryPage.visit();
});

Given('Admin is on Add Category page', () => {
    CategoryAddPage.visitAdd();
});

Given('At least one category exists in the system', () => {
    // We assume at least one category exists
    cy.log('Assuming at least one category exists in the system');
});

Given('Category {string} exists in the system', (categoryName) => {
    // Assumption for edit test
    cy.log('Assuming category ' + categoryName + ' exists');
});

Given('Category {string} has plants associated with it', (categoryName) => {
    // Assumption - category has plants so deletion should fail
    cy.log('Assuming category ' + categoryName + ' has associated plants');
});

Given('Category {string} exists with no plants', (categoryName) => {
    // Assumption - empty category that can be deleted
    cy.log('Assuming category ' + categoryName + ' exists with no plants');
});

// Logout Steps
When('Admin logs out', () => {
    // Click on logout button/menu
    cy.contains('Logout').click();
});

When('User logs out', () => {
    cy.contains('Logout').click();
});

// Add Category Button Visibility
Then('Validate "Add Category" button is visible', () => {
    CategoryPage.addCategoryButton.should('be.visible');
});

Then('Validate "Add Category" button is NOT visible', () => {
    cy.get('body').then($body => {
        expect($body.find('a:contains("Add Category")').length).to.equal(0);
    });
});

// Edit Action Visibility
Then('Validate "Edit" action is visible for categories in the list', () => {
    CategoryPage.tableRows.each(($row) => {
        // Skip empty state row
        if ($row.text().includes('No categories found')) return;
        
        cy.wrap($row).find('a[title="Edit"]').should('be.visible');
    });
});

Then('Validate "Edit" action is NOT visible for any category in the list', () => {
    CategoryPage.tableRows.each(($row) => {
        // Skip empty state row
        if ($row.text().includes('No categories found')) return;
        
        cy.wrap($row).find('a[title="Edit"]').should('not.exist');
    });
});

// Delete Action Visibility
Then('Validate "Delete" action is visible for categories in the list', () => {
    CategoryPage.tableRows.each(($row) => {
        // Skip empty state row
        if ($row.text().includes('No categories found')) return;
        
        cy.wrap($row).find('button[title="Delete"]').should('be.visible');
    });
});

Then('Validate "Delete" action is NOT visible for any category in the list', () => {
    CategoryPage.tableRows.each(($row) => {
        // Skip empty state row
        if ($row.text().includes('No categories found')) return;
        
        cy.wrap($row).find('button[title="Delete"]').should('not.exist');
    });
});

// Add Category Steps
When('Admin enters category name {string}', (name) => {
    CategoryAddPage.enterCategoryName(name);
});

When('Admin enters category description {string}', (description) => {
    CategoryAddPage.enterCategoryDescription(description);
});

When('Admin clicks Save button', () => {
    CategoryAddPage.clickSave();
});

When('Admin clicks Cancel button', () => {
    CategoryAddPage.clickCancel();
});

// Add Category Validation
Then('Validate Admin is redirected to Category List page', () => {
    cy.url().should('include', '/ui/categories');
    CategoryPage.categoryTable.should('be.visible');
});

Then('Validate newly added category {string} appears in the list', (categoryName) => {
    CategoryPage.tableRows.should('contain.text', categoryName);
});

// Edit Category Steps
When('Admin clicks Edit action for category {string}', (categoryName) => {
    CategoryPage.clickEdit(categoryName);
});

When('Admin updates category name to {string}', (newName) => {
    CategoryAddPage.updateCategoryName(newName);
});

When('Admin updates category description to {string}', (newDescription) => {
    CategoryAddPage.updateCategoryDescription(newDescription);
});

Then('Validate category name is updated to {string} in the list', (categoryName) => {
    CategoryPage.tableRows.should('contain.text', categoryName);
});

// Delete Category Steps
When('Admin clicks Delete action for category {string}', (categoryName) => {
    CategoryPage.clickDelete(categoryName);
});

When('Admin confirms deletion in the dialog', () => {
    // Handle confirmation dialog/modal
    cy.on('window:confirm', () => true); // Auto-confirm
    // OR if it's a modal:
    // CategoryPage.confirmDelete();
});

Then('Validate error message is displayed', () => {
    // Check for error message in alert or toast
    cy.get('.alert-danger, .toast-error, .error-message').should('be.visible');
});

Then('Validate category {string} still exists in the list', (categoryName) => {
    CategoryPage.tableRows.should('contain.text', categoryName);
});

Then('Validate category {string} is removed from the list', (categoryName) => {
    CategoryPage.tableRows.should('not.contain.text', categoryName);
});
