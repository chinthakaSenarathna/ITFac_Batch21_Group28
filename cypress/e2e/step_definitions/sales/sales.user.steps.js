import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import SalesPage from "../../pages/sales/SalesPage";

// Navigation
Given('User is on Sales page', () => {
  cy.visit('/ui/sales');
});

// Assertions
Then('Validate Sales table is visible for User', () => {
  SalesPage.salesTable.should('be.visible');
});

Then('Validate Sell Plant button is not visible', () => {
  SalesPage.sellPlantButton.should('not.exist');
});

Then('Validate delete option is not visible', () => {
  cy.get('table tbody tr form button').should('not.exist');
});
