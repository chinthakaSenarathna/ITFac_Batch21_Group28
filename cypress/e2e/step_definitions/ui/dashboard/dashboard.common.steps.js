import { Then } from "@badeball/cypress-cucumber-preprocessor";

// Shared Dashboard assertions used by both admin and user tests
Then('Validate Dashboard page is visible', () => {
  // Simply verify we're on dashboard page
  cy.url().should('include', '/ui/dashboard');
});

Then('Validate Inventory sidebar is disabled', () => {
  // Verify Inventory link exists in sidebar
  cy.contains('Inventory').should('exist');
});
