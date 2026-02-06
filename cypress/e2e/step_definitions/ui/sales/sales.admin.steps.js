import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import SalesPage from "../../../pages/sales/SalesPage";

// Navigation
Given('Admin is on Sales page', () => {
    SalesPage.visit();
});

// Click Sell Plant button
When('Admin clicks Sell Plant button', () => {
    SalesPage.sellPlantButton.click();
});

// Select plant from dropdown
When('Admin selects a plant from dropdown', () => {
    SalesPage.selectFirstPlant();
});

// Do not select any plant
When('Admin does not select any plant', () => {
    SalesPage.selectPlantByValue(''); // select empty value
});

// Enter sale quantity
When('Admin enters sale quantity {string}', (qty) => {
    SalesPage.enterQuantity(qty);
});

// Confirm sale
When('Admin clicks Confirm Sale button', () => {
    SalesPage.confirmSale();
});

// NOTE: "Validate Admin is redirected to Sales page" step is defined in dashboard.admin.steps.js

// Validate sale created successfully
Then('Validate sale is created successfully', () => {
    SalesPage.salesTable
        .should('exist')
        .and('be.visible')
        .and('contain.text', 'plant1')
        .and('contain.text', '5');
});

// Validate Sales table is visible
Then('Validate Sales table is visible', () => {
    SalesPage.salesTable.should('be.visible');
});

// Validate quantity validation message
Then('Validate quantity validation message is displayed', () => {
    cy.get('#quantity')
      .should('have.prop', 'validity')
      .then(validity => {
          expect(validity.valid).to.be.false;
          expect(validity.rangeUnderflow).to.be.true;
      });

    cy.get('#quantity')
      .then($input => {
          expect($input[0].validationMessage.toLowerCase())
            .to.contain('value must be greater than or equal to 1');
      });
});

// Validate plant selection validation message
Then('Validate plant selection validation message is displayed', () => {
    SalesPage.errorAlert
        .should('be.visible')
        .and('contain.text', 'Plant is required');
});

// Clear Quantity field
When('Admin clears Quantity field', () => {
    SalesPage.clearQuantity();
});

// Validate quantity required validation message
Then('Validate quantity required validation message is displayed', () => {
    SalesPage.errorAlert
        .should('be.visible')
        .and('contain.text', 'Failed to convert property value')
});

// Validate stock error message
Then('Validate stock error message is displayed', () => {
    cy.get('.alert.alert-danger')
      .should('be.visible')
      .invoke('text')
      .then((text) => {
          // Check format, ignore the actual number
          expect(text).to.match(/plant1 has only \d+ items available in stock/);
      });
});

Then('Validate stock validation message is displayed', () => {
    SalesPage.stockErrorAlert
      .should('be.visible')
      .invoke('text')
      .then((text) => {
          expect(text).to.match(/plant1 has only \d+ items available in stock/);
      });
});

// Trigger stock error alert (this step should reuse your existing steps)
When('Admin triggers a stock error alert (e.g., enters quantity more than stock)', () => {
    SalesPage.selectFirstPlant();         // select plant
    SalesPage.enterQuantity('1000');      // enter very high quantity to trigger stock alert
    SalesPage.confirmSale();              // click Sell
});

// Click alert close button
When('Admin clicks the alert close button', () => {
    SalesPage.stockAlertCloseButton.click();
});

// Validate alert disappears
Then('Validate the alert disappears', () => {
    SalesPage.stockErrorAlert.should('not.exist');
});

// Step: delete first sale
When('Admin deletes the first sale', () => {
    // Click the first delete button
    cy.get('table tbody tr:first-child form button').click();

    // Handle confirmation alert (OK)
    cy.on('window:confirm', (text) => {
        expect(text).to.eq('Are you sure you want to delete this sale?');
        return true; // click OK
    });
});

// Step: validate success alert
Then('Validate success alert message is displayed', () => {
    cy.get('.alert.alert-success')
      .should('be.visible')
      .and('contain.text', 'Sale deleted successfully');
});