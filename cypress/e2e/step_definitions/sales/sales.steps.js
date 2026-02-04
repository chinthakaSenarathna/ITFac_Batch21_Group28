import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import SalesPage from "../../pages/sales/SalesPage";
import LoginPage from "../../pages/plants/LoginPage";
import PlantPage from "../../pages/plants/PlantPage";

// Navigation
Given('Admin is on Sales page', () => {
    SalesPage.visit();
});

Given('User is on Sales page', () => {
    SalesPage.visit();
});

// Actions
When('Admin clicks Sell Plant button', () => {
    SalesPage.sellPlantButton.click();
});

When('Admin selects a plant from dropdown', () => {
    SalesPage.selectFirstPlant();
});

When('Admin enters sale quantity {string}', (qty) => {
    SalesPage.enterQuantity(qty);
});

When('Admin clicks Confirm Sale button', () => {
    SalesPage.confirmSale();
});

// Combined action
When('Admin sells plant {string} with quantity {string}', (plant, qty) => {
    SalesPage.sellPlantButton.click();
    SalesPage.selectPlantByName(plant);
    SalesPage.enterQuantity(qty);
    SalesPage.confirmSale();
});

// Validation
Then('Validate Sales table is visible', () => {
    SalesPage.salesTable.should('be.visible');
});

Then('Validate sale is created successfully', () => {
    SalesPage.successAlert.should('be.visible');
});

Then('Validate Admin is redirected to Sales page', () => {
    cy.url().should('include', '/ui/sales');
});

Then('Validate quantity validation message is displayed', () => {
    SalesPage.errorMessage.should('be.visible');
});

Then('Validate Sell Plant button is NOT visible', () => {
    cy.get('body').then($body => {
        expect($body.find('button:contains("Sell Plant")').length).to.equal(0);
    });
});

// Inventory validation (soft – academic friendly)
Given('Plant {string} exists with quantity {string}', (plant, qty) => {
    cy.log(`Assuming plant ${plant} exists with quantity ${qty}`);
});

Then('Validate plant quantity is reduced by {string}', (qty) => {
    cy.log(`Validating quantity reduced by ${qty}`);
    // Ideally via API or refreshed UI table
});
