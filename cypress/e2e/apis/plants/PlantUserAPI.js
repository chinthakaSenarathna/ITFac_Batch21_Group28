class PlantUserAPI {

    constructor() {
        this.authToken = null;
        this.lastResponse = null;
    }

    /**
     * Authenticate user and store token
     * @param {string} username 
     * @param {string} password 
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

    /**
     * Get plants with pagination and filtering
     * @param {Object} queryParams - { page, size, name, categoryId }
     */
    getPlantsPaged(queryParams = {}) {
        return cy.request({
            method: 'GET',
            url: '/api/plants/paged',
            qs: queryParams,
            auth: {
                bearer: this.authToken
            },
            failOnStatusCode: false
        }).then((response) => {
            this.lastResponse = response;
            return response;
        });
    }

    /**
     * Create a new plant (Expected to be restricted for User)
     * @param {number} categoryId 
     * @param {Object} plantData 
     */
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

    /**
     * Delete a plant (Expected to be restricted for User)
     * @param {number} plantId 
     */
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

    /**
     * Get the last response object
     */
    getLastResponse() {
        return this.lastResponse;
    }
}

export default new PlantUserAPI();
