import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../../pages/plants/LoginPage";
import DashboardPage from "../../../pages/dashboard/DashboardPage";

// NOTE: Login step is defined in common/login.steps.js to avoid duplication
// NOTE: Dashboard visibility and Inventory disabled steps are in dashboard.common.steps.js

// Admin-specific assertions

Then('Validate Dashboard sidebar menu is active', () => {
  DashboardPage.sidebarDashboard
    .should('be.visible')
    .should('have.class', 'active');
});


// Actions - card buttons
When('Admin clicks Manage Categories button', () => {
  DashboardPage.manageCategoriesBtn.click();
});

When('Admin clicks Manage Plants button', () => {
  DashboardPage.managePlantsBtn.click();
});

When('Admin clicks View Sales button', () => {
  DashboardPage.viewSalesBtn.click();
});

// Redirect validations
Then('Validate Admin is redirected to Categories page', () => {
  cy.url().should('include', '/ui/categories');
});

Then('Validate Admin is redirected to Plants page', () => {
  cy.url().should('include', '/ui/plants');
});

Then('Validate Admin is redirected to Sales page', () => {
  // Wait a bit for navigation to complete
  cy.wait(1000);
  cy.url({timeout: 15000}).should('include', '/ui/sales');
});

// Logout
When('Admin clicks Logout', () => {
  DashboardPage.logoutLink.should('be.visible').click();
  cy.url().should('include', '/ui/login', { timeout: 10000 });
});

Then('Validate user is redirected to Login page', () => {
  cy.url().should('include', '/ui/login');
});

// Refresh
When('Admin refreshes the page', () => {
  cy.reload();
  // Wait for page to reload
  DashboardPage.waitForPageLoad();
});
