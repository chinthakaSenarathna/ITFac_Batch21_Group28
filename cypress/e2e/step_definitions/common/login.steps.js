import { Given } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../pages/plants/LoginPage";
import DashboardPage from "../../pages/dashboard/DashboardPage";

// Admin login with session caching
Given('Admin is logged in with username {string} and password {string}', (username, password) => {
  cy.session([username, password], () => {
    LoginPage.visit();
    LoginPage.login(username, password);
    // Verify successful login
    cy.url().should('include', '/ui/dashboard', { timeout: 10000 });
  }, {
    validate() {
      // Validate session by visiting dashboard and checking we're not redirected to login
      cy.visit('/ui/dashboard');
      cy.url().should('include', '/ui/dashboard');
    }
  });
  
  // Visit dashboard after session restoration
  DashboardPage.visit();
});

// User login with session caching
Given('User is logged in with username {string} and password {string}', (username, password) => {
  cy.session([username, password], () => {
    LoginPage.visit();
    LoginPage.login(username, password);
    // Verify successful login
    cy.url().should('include', '/ui/dashboard', { timeout: 10000 });
  }, {
    validate() {
      // Validate session by visiting dashboard and checking we're not redirected to login
      cy.visit('/ui/dashboard');
      cy.url().should('include', '/ui/dashboard');
    }
  });
  
  // Visit dashboard after session restoration
  DashboardPage.visit();
});
