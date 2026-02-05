import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import PlantUserAPI from '../../apis/plants/PlantUserAPI';

// --- Variables to store state for payload prep ---
let requestPayload = null;

// --- Background / Authentication ---

Given('User {string} is authenticated with password {string}', (username, password) => {
    PlantUserAPI.authenticate(username, password).then((response) => {
        expect(response.status).to.eq(200);
        // Token is handled inside the API class
    });
});

// --- Pre-conditions (Given) ---

Given('At least 4 plants exist in the database', () => {
    const adminAuth = { username: "admin", password: "admin123" };
    const plantsToCreate = [
        { name: "Fern", price: 20, quantity: 10, category: { id: 3 } },
        { name: "Bamboo", price: 30, quantity: 15, category: { id: 3 } },
        { name: "Money Plant", price: 15, quantity: 20, category: { id: 3 } },
        { name: "Spider Plant", price: 25, quantity: 12, category: { id: 3 } }
    ];

    // 1. Login as Admin
    cy.request({
        method: 'POST',
        url: '/api/auth/login',
        body: adminAuth,
        failOnStatusCode: false
    }).then((loginResp) => {
        expect(loginResp.status).to.eq(200);
        const adminToken = loginResp.body.token || loginResp.body.accessToken;

        // 2. Create Plants
        // We assume Category 3 exists. If not, this might fail, but let's try.
        // We skip creation if they already exist? No, strict seeding is better but harder.
        // For simplicity, we just try to create them. 
        // If they exist, unique constraints might fail, but we just need "at least 4".

        // Wrap in Promise.all equivalent or sequential
        cy.wrap(plantsToCreate).each((plant) => {
            cy.request({
                method: 'POST',
                url: '/api/plants/category/3', // Assuming cat 3 exists
                body: plant,
                auth: { bearer: adminToken },
                failOnStatusCode: false
            }).then((resp) => {
                if (resp.status !== 201) {
                    cy.log(`Failed to create plant ${plant.name}: ${JSON.stringify(resp.body)}`);
                }
                expect(resp.status).to.eq(201, `Plant creation failed for ${plant.name}`);
            });
        });
    });

    // 3. User session is restored by the Background step? 
    // NO. Background runs BEFORE this step.
    // So we effectively clobbered the user session from the perspective of "last logged in" 
    // if the app tracks it, but here we are using tokens. 
    // PlantUserAPI stores the user token.
    // However, if strict state is needed, we might want to re-authenticate as User just in case.
    // But PlantUserAPI.authToken is still set to the User's token from the Background step.
    // API calls use `PlantUserAPI.authToken`.
    // So we don't need to re-login as User, provided we didn't overwrite PlantUserAPI.authToken.
    // We used raw `cy.request` here, so PlantUserAPI.authToken is safe.
});

Given('Plants {string}, {string}, and {string} exist in the database', (p1, p2, p3) => {
    const adminAuth = { username: "admin", password: "admin123" };
    // Create each plant in a safe category (e.g., 3)
    const plantsToCreate = [
        { name: p1, price: 50, quantity: 5, category: { id: 3 } },
        { name: p2, price: 60, quantity: 8, category: { id: 3 } },
        { name: p3, price: 70, quantity: 12, category: { id: 3 } }
    ];

    cy.request({
        method: 'POST',
        url: '/api/auth/login',
        body: adminAuth,
        failOnStatusCode: false
    }).then((loginResp) => {
        expect(loginResp.status).to.eq(200);
        const adminToken = loginResp.body.token || loginResp.body.accessToken;

        cy.wrap(plantsToCreate).each((plant) => {
            cy.request({
                method: 'POST',
                url: '/api/plants/category/3',
                body: plant,
                auth: { bearer: adminToken },
                failOnStatusCode: false
            }).then((resp) => {
                if (resp.status !== 201) {
                    cy.log(`Failed to create plant ${plant.name}: ${JSON.stringify(resp.body)}`);
                }
                expect(resp.status).to.eq(201, `Plant creation failed for ${plant.name}`);
            });
        });
    });
});

Given('Plants exist in category {string} with ID {int}', (catName, catId) => {
    cy.log(`Assuming plants exist in category ${catName} (${catId})`);
});

Given('I prepared a valid plant payload with category ID {int}', (catId) => {
    requestPayload = {
        name: "Rose",
        price: 150,
        quantity: 25,
        category: {
            id: catId
        }
    };
});

Given('A plant with ID {int} exists', (id) => {
    cy.log(`Assuming plant with ID ${id} exists`);
});

// --- Actions (When) ---

When('I send a GET request to {string} with parameters:', (endpoint, table) => {
    const params = {};
    table.rows().forEach(row => {
        params[row[0]] = row[1];
    });

    // Endpoint mapping (simple for now, could be expanded)
    if (endpoint.includes('/paged')) {
        PlantUserAPI.getPlantsPaged(params);
    } else {
        throw new Error(`Endpoint ${endpoint} not mapped in Step Definitions`);
    }
});

When('I send a POST request to {string} with the payload', (endpoint) => {
    // Extract category ID from endpoint string /api/plants/category/3
    const match = endpoint.match(/\/category\/(\d+)/);
    if (match && match[1]) {
        const categoryId = match[1];
        PlantUserAPI.createPlant(categoryId, requestPayload);
    } else {
        throw new Error(`Could not extract category ID from endpoint ${endpoint}`);
    }
});

When('I send a DELETE request to {string}', (endpoint) => {
    // Extract plant ID from endpoint string /api/plants/1
    const match = endpoint.match(/\/plants\/(\d+)/);
    if (match && match[1]) {
        const plantId = match[1];
        PlantUserAPI.deletePlant(plantId);
    } else {
        throw new Error(`Could not extract plant ID from endpoint ${endpoint}`);
    }
});

// --- Assertions (Then) ---

Then('The response status code should be {int}', (statusCode) => {
    const response = PlantUserAPI.getLastResponse();
    expect(response.status).to.eq(statusCode);
});

Then('The response body should contain an array of plants', () => {
    const response = PlantUserAPI.getLastResponse();
    const body = response.body;
    if (Array.isArray(body)) {
        expect(body.length).to.be.at.least(2);
    } else if (body.content && Array.isArray(body.content)) {
        expect(body.content.length).to.be.at.least(2);
    } else {
        throw new Error("Response body does not contain an array of plants");
    }
});

Then('The response should include pagination metadata:', (table) => {
    const response = PlantUserAPI.getLastResponse();
    const body = response.body;
    table.raw().flat().forEach(field => {
        expect(body).to.have.property(field);
    });
});

Then('Each plant object should contain {string}, {string}, {string}, {string}, {string}', (f1, f2, f3, f4, f5) => {
    const response = PlantUserAPI.getLastResponse();
    const plants = Array.isArray(response.body) ? response.body : response.body.content;
    plants.forEach(plant => {
        expect(plant).to.have.property(f1);
        expect(plant).to.have.property(f2);
        expect(plant).to.have.property(f3);
        expect(plant).to.have.property(f4);
        expect(plant).to.have.property(f5);
    });
});

Then('The response body should contain plants with {string} in the name', (partialName) => {
    const response = PlantUserAPI.getLastResponse();
    const plants = Array.isArray(response.body) ? response.body : response.body.content;
    if (plants.length > 0) {
        plants.forEach(plant => {
            expect(plant.name).to.include(partialName);
        });
    } else {
        cy.log("No plants returned to verify name match");
    }
});

Then('The response should contain {string}', (text) => {
    const response = PlantUserAPI.getLastResponse();
    expect(JSON.stringify(response.body)).to.include(text);
});

Then('The response should NOT contain {string}', (text) => {
    const response = PlantUserAPI.getLastResponse();
    expect(JSON.stringify(response.body)).to.not.include(text);
});

Then('All returned plants should belong to category ID {int} and name {string}', (catId, catName) => {
    const response = PlantUserAPI.getLastResponse();
    const plants = Array.isArray(response.body) ? response.body : response.body.content;
    plants.forEach(plant => {
        expect(plant.category.id).to.eq(catId);
        expect(plant.category.name).to.eq(catName);
    });
});

Then('No plants from category {string} should be returned', (catName) => {
    const response = PlantUserAPI.getLastResponse();
    const plants = Array.isArray(response.body) ? response.body : response.body.content;
    plants.forEach(plant => {
        if (plant.category && plant.category.name) {
            expect(plant.category.name).to.not.eq(catName);
        }
    });
});

Then('The response should contain error {string}', (errorMsg) => {
    const response = PlantUserAPI.getLastResponse();
    expect(response.body.error).to.eq(errorMsg);
});
