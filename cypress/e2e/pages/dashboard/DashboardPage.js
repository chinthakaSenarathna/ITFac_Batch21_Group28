class DashboardPage {
  visit() {
    cy.visit('/ui/dashboard');
    // Wait for URL confirmation
    cy.url().should('include', '/ui/dashboard', { timeout: 10000 });
  }

  // Helper method to ensure page is fully loaded
  waitForPageLoad() {
    // Just wait for URL to be correct
    cy.url().should('include', '/ui/dashboard', { timeout: 10000 });
  }

  // Title
  get pageTitle() {
    return cy.contains('h3', 'Dashboard', { timeout: 10000 });
  }

  // Sidebar links - with explicit waits
  get sidebarDashboard() {
    return cy.get('.sidebar').find('a.nav-link').contains('Dashboard', { timeout: 5000 });
  }

  get sidebarCategories() {
    return cy.get('.sidebar').find('a.nav-link').contains('Categories', { timeout: 5000 });
  }

  get sidebarPlants() {
    return cy.get('.sidebar').find('a.nav-link').contains('Plants', { timeout: 5000 });
  }

  get sidebarSales() {
    return cy.get('.sidebar').find('a.nav-link').contains('Sales', { timeout: 5000 });
  }

  get sidebarInventory() {
    return cy.get('.sidebar').find('a.nav-link').contains('Inventory', { timeout: 5000 });
  }

  // Card buttons (Dashboard main cards) - with explicit waits
  get manageCategoriesBtn() {
    return cy.contains('a.btn', 'Manage Categories', { timeout: 5000 }).should('be.visible');
  }

  get managePlantsBtn() {
    return cy.contains('a.btn', 'Manage Plants', { timeout: 5000 }).should('be.visible');
  }

  get viewSalesBtn() {
    return cy.contains('a.btn', 'View Sales', { timeout: 5000 }).should('be.visible');
  }

  get openInventoryLink() {
    return cy.contains('a', 'Open Inventory', { timeout: 5000 });
  }

  // Logout
  get logoutLink() {
    return cy.get('.sidebar').find('a.nav-link').contains('Logout', { timeout: 5000 });
  }
}

export default new DashboardPage();
