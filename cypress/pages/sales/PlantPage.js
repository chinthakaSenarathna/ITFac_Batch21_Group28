class PlantPage {
    // Locators
    // plants.html

    get searchInput() {
        return cy.get('input[name="name"]');
    }

    get categorySelect() {
        return cy.get('select[name="categoryId"]');
    }

    get searchButton() {
        // Form button
        return cy.contains('button', 'Search');
    }

    get resetButton() {
        return cy.contains('a', 'Reset');
    }

    get plantTable() {
        return cy.get('table');
    }

    get tableRows() {
        return cy.get('table tbody tr');
    }

    get noPlantsMessage() {
        return cy.contains('td', 'No plants found');
    }

    // Methods
    visit() {
        cy.visit('/ui/plants');
    }

    searchPlant(name) {
        this.searchInput.clear();
        if (name) {
            this.searchInput.type(name);
        }
    }

    selectCategory(categoryText) {
        // If categoryText is "All Categories", value is ""
        // Otherwise finding option by text
        if (categoryText === 'All Categories') {
            this.categorySelect.select('');
        } else {
            // Check if option exists first?
            // Assuming data exists
            this.categorySelect.select(categoryText);
        }
    }

    clickSearch() {
        this.searchButton.click();
    }

    clickReset() {
        this.resetButton.click();
    }

    getPlantRow(plantName) {
        return this.tableRows.contains('td', plantName).parent();
    }
}

export default new PlantPage();
