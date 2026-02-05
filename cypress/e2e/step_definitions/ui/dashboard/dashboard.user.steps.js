import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../../pages/plants/LoginPage";
import DashboardPage from "../../../pages/dashboard/DashboardPage";

// NOTE: Login step is defined in common/login.steps.js to avoid duplication
// NOTE: Dashboard visibility and Inventory disabled steps are in dashboard.common.steps.js

// User-specific card clicks

// Card clicks (User)
When('User clicks Manage Categories button', () => {
  DashboardPage.manageCategoriesBtn.click();
});

When('User clicks Manage Plants button', () => {
  DashboardPage.managePlantsBtn.click();
});

When('User clicks View Sales button', () => {
  DashboardPage.viewSalesBtn.click();
});

// Redirect validations (user)
Then('Validate user is redirected to Categories page', () => {
  cy.url().should('include', '/ui/categories');
});

Then('Validate user is redirected to Plants page', () => {
  cy.url().should('include', '/ui/plants');
});

Then('Validate user is redirected to Sales page', () => {
  cy.url().should('include', '/ui/sales');
});
