class PlantPage {
    // Locators
    // Priority: ID > Name > CSS
    // plants.html

    // Search and Filter
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

    // Admin Actions
    get addPlantButton() {
        return cy.contains('a', 'Add a Plant');
    }

    // Table
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
        if (categoryText === 'All Categories') {
            this.categorySelect.select('');
        } else {
            // Check if option exists before selecting to avoid error if data is missing
            this.categorySelect.find('option').then($options => {
                const optionExists = [...$options].some(opt => opt.text === categoryText);
                if (optionExists) {
                    this.categorySelect.select(categoryText);
                } else {
                    cy.log(`Category "${categoryText}" not found. Skipping selection.`);
                }
            });
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

    // Admin Methods
    clickAddPlant() {
        this.addPlantButton.click();
    }

    isAddPlantButtonVisible() {
        return cy.get('body').then($body => {
            return $body.find('a:contains("Add a Plant")').length > 0;
        });
    }

    getEditButtonForPlant(plantName) {
        return this.getPlantRow(plantName).within(() => {
            cy.get('a[title="Edit"]');
        });
    }

    getDeleteButtonForPlant(plantName) {
        return this.getPlantRow(plantName).within(() => {
            cy.get('button[title="Delete"]');
        });
    }

    isEditActionVisible(plantName) {
        return cy.get('body').then($body => {
            const row = $body.find('td:contains("' + plantName + '")').closest('tr');
            return row.find('a[title="Edit"]').length > 0;
        });
    }

    isDeleteActionVisible(plantName) {
        return cy.get('body').then($body => {
            const row = $body.find('td:contains("' + plantName + '")').closest('tr');
            return row.find('button[title="Delete"]').length > 0;
        });
    }
}

export default new PlantPage();
