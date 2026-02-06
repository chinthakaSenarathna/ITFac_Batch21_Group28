class PlantAdminAPI {

    constructor() {
        this.authToken = null;
        this.lastResponse = null;
    }

    /**
     * Authenticate admin and store token
     */
    authenticate(username, password) {
        return cy.request({
            method: 'POST',
            url: '/api/auth/login',
            body: {
                username: username,
                password: password
            },
            failOnStatusCode: false
        }).then((response) => {
            this.lastResponse = response;
            if (response.status === 200) {
                this.authToken = response.body.token || response.body.accessToken || response.body.jwt;
            }
            return response;
        });
    }

    createPlant(categoryId, plantData) {
        return cy.request({
            method: 'POST',
            url: `/api/plants/category/${categoryId}`,
            body: plantData,
            auth: {
                bearer: this.authToken
            },
            failOnStatusCode: false
        }).then((response) => {
            this.lastResponse = response;
            return response;
        });
    }

    updatePlant(plantId, plantData) {
        return cy.request({
            method: 'PUT',
            url: `/api/plants/${plantId}`,
            body: plantData,
            auth: {
                bearer: this.authToken
            },
            failOnStatusCode: false
        }).then((response) => {
            this.lastResponse = response;
            return response;
        });
    }

    deletePlant(plantId) {
        return cy.request({
            method: 'DELETE',
            url: `/api/plants/${plantId}`,
            auth: {
                bearer: this.authToken
            },
            failOnStatusCode: false
        }).then((response) => {
            this.lastResponse = response;
            return response;
        });
    }

    getPlant(plantId) {
        return cy.request({
            method: 'GET',
            url: `/api/plants/${plantId}`,
            auth: {
                bearer: this.authToken
            },
            failOnStatusCode: false
        }).then((response) => {
            this.lastResponse = response;
            return response;
        });
    }

    createCategory(categoryData) {
        return cy.request({
            method: 'POST',
            url: '/api/categories',
            body: categoryData,
            auth: {
                bearer: this.authToken
            },
            failOnStatusCode: false
        }).then((response) => {
            this.lastResponse = response;
            return response;
        });
    }

    getAllCategories() {
        return cy.request({
            method: 'GET',
            url: '/api/categories',
            auth: {
                bearer: this.authToken
            },
            failOnStatusCode: false
        }).then((response) => {
            this.lastResponse = response;
            return response;
        });
    }

    getLastResponse() {
        return this.lastResponse;
    }
}

export default new PlantAdminAPI();
