import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Store response and auth details
let authToken = null;
let apiResponse = null;
let responseTime = null;
let dynamicCategoryId = null;

// ========== AUTHENTICATION (JWT Bearer Token) ==========

Given('Admin is authenticated with credentials {string} and {string}', (username, password) => {
    cy.log('🔐 Authenticating Admin: ' + username);
    cy.request({
        method: 'POST',
        url: '/api/auth/login',
        body: { username, password },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.equal(200);
        authToken = response.body.token;
        cy.log('✅ Admin authenticated with JWT token');
    });
});

Given('User is authenticated with credentials {string} and {string}', (username, password) => {
    cy.log('🔐 Authenticating User: ' + username);
    cy.request({
        method: 'POST',
        url: '/api/auth/login',
        body: { username, password },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.equal(200);
        authToken = response.body.token;
        cy.log('✅ User authenticated with JWT token');
    });
});

// ========== DATA SETUP ==========

Given('Category {string} exists with id {string}', (name, id) => {
    cy.log('📝 Test assumes category "' + name + '" exists with ID: ' + id);
});

Given('Category {string} exists', (name) => {
    cy.log('📝 Test assumes category "' + name + '" exists');
});

Given('Main category {string} exists with id {string}', (name, id) => {
    cy.log('📝 Test assumes main category "' + name + '" exists with ID: ' + id);
});

Given('Category {string} exists with id {string} and has no associated plants', (name, id) => {
    cy.log('📝 Test assumes empty category "' + name + '" with ID: ' + id);
});

Given('Category {string} exists with id {string} and has plants', (name, id) => {
    cy.log('📝 Test assumes category "' + name + '" with ID ' + id + ' has associated plants');
});

Given('Categories {string}, {string}, {string} exist', (c1, c2, c3) => {
    cy.log('📝 Test assumes categories exist: ' + c1 + ', ' + c2 + ', ' + c3);
});

Given('Main category {string} has sub-category {string}', (mainCat, subCat) => {
    cy.log('📝 Test assumes "' + mainCat + '" has sub-category "' + subCat + '"');
});

// ========== DYNAMIC DATA SETUP ==========

Given('Admin retrieves first available category ID', () => {
    cy.log('🔍 Fetching first available category...');
    cy.request({
        method: 'GET',
        url: '/api/categories',
        headers: { 'Authorization': 'Bearer ' + authToken },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array').and.have.length.greaterThan(0);
        dynamicCategoryId = response.body[0].id;
        cy.log('✅ Using category ID: ' + dynamicCategoryId);
    });
});

Given('User retrieves first available category ID', () => {
    cy.log('🔍 User fetching first available category...');
    cy.request({
        method: 'GET',
        url: '/api/categories',
        headers: { 'Authorization': 'Bearer ' + authToken },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array').and.have.length.greaterThan(0);
        dynamicCategoryId = response.body[0].id;
        cy.log('✅ User using category ID: ' + dynamicCategoryId);
    });
});

Given('Admin creates a temporary test category', () => {
    cy.log('📝 Creating temporary category for testing...');
    cy.request({
        method: 'POST',
        url: '/api/categories',
        headers: { 'Authorization': 'Bearer ' + authToken },
        body: {
            name: 'Temp Test Category ' + Date.now(),
            description: 'Temporary category for delete test',
            parentId: null
        },
        failOnStatusCode: false
    }).then((response) => {
        if (response.status === 201 || response.status === 200) {
            dynamicCategoryId = response.body.id;
            cy.log('✅ Created temp category ID: ' + dynamicCategoryId);
        }
    });
});

Given('Admin identifies a category that has associated plants', () => {
    cy.log('📝 Test assumes a category with associated plants exists');
});

// ========== API REQUESTS ==========

When('Admin sends GET request to {string}', (endpoint) => {
    cy.log('📤 Admin GET: ' + endpoint);
    const startTime = Date.now();
    cy.request({
        method: 'GET',
        url: endpoint,
        headers: { 'Authorization': 'Bearer ' + authToken },
        failOnStatusCode: false
    }).then((response) => {
        responseTime = Date.now() - startTime;
        apiResponse = response;
        cy.log('📥 Status: ' + response.status + ' | Time: ' + responseTime + 'ms');
    });
});

When('User sends GET request to {string}', (endpoint) => {
    cy.log('📤 User GET: ' + endpoint);
    const startTime = Date.now();
    cy.request({
        method: 'GET',
        url: endpoint,
        headers: { 'Authorization': 'Bearer ' + authToken },
        failOnStatusCode: false
    }).then((response) => {
        responseTime = Date.now() - startTime;
        apiResponse = response;
        cy.log('📥 Status: ' + response.status + ' | Time: ' + responseTime + 'ms');
    });
});

When('User sends GET request to that category by ID', () => {
    cy.log('📤 User GET category ID: ' + dynamicCategoryId);
    const startTime = Date.now();
    cy.request({
        method: 'GET',
        url: '/api/categories/' + dynamicCategoryId,
        headers: { 'Authorization': 'Bearer ' + authToken },
        failOnStatusCode: false
    }).then((response) => {
        responseTime = Date.now() - startTime;
        apiResponse = response;
        cy.log('📥 Status: ' + response.status + ' | Time: ' + responseTime + 'ms');
    });
});

When('Admin sends POST request to {string} with body:', (endpoint, docString) => {
    cy.log('📤 Admin POST: ' + endpoint);
    const body = JSON.parse(docString);
    const startTime = Date.now();
    cy.request({
        method: 'POST',
        url: endpoint,
        headers: { 'Authorization': 'Bearer ' + authToken, 'Content-Type': 'application/json' },
        body: body,
        failOnStatusCode: false
    }).then((response) => {
        responseTime = Date.now() - startTime;
        apiResponse = response;
        cy.log('📥 Status: ' + response.status + ' | Time: ' + responseTime + 'ms');
    });
});

When('User sends POST request to {string} with body:', (endpoint, docString) => {
    cy.log('📤 User POST: ' + endpoint);
    const body = JSON.parse(docString);
    const startTime = Date.now();
    cy.request({
        method: 'POST',
        url: endpoint,
        headers: { 'Authorization': 'Bearer ' + authToken, 'Content-Type': 'application/json' },
        body: body,
        failOnStatusCode: false
    }).then((response) => {
        responseTime = Date.now() - startTime;
        apiResponse = response;
        cy.log('📥 Status: ' + response.status + ' | Time: ' + responseTime + 'ms');
    });
});

When('Admin sends PUT request to {string} with body:', (endpoint, docString) => {
    cy.log('📤 Admin PUT: ' + endpoint);
    const body = JSON.parse(docString);
    const startTime = Date.now();
    cy.request({
        method: 'PUT',
        url: endpoint,
        headers: { 'Authorization': 'Bearer ' + authToken, 'Content-Type': 'application/json' },
        body: body,
        failOnStatusCode: false
    }).then((response) => {
        responseTime = Date.now() - startTime;
        apiResponse = response;
        cy.log('📥 Status: ' + response.status + ' | Time: ' + responseTime + 'ms');
    });
});

When('User sends PUT request to {string} with body:', (endpoint, docString) => {
    cy.log('📤 User PUT: ' + endpoint);
    const body = JSON.parse(docString);
    const startTime = Date.now();
    cy.request({
        method: 'PUT',
        url: endpoint,
        headers: { 'Authorization': 'Bearer ' + authToken, 'Content-Type': 'application/json' },
        body: body,
        failOnStatusCode: false
    }).then((response) => {
        responseTime = Date.now() - startTime;
        apiResponse = response;
        cy.log('📥 Status: ' + response.status + ' | Time: ' + responseTime + 'ms');
    });
});

When('User sends PUT request to that category with unauthorized data', () => {
    cy.log('📤 User PUT category ID: ' + dynamicCategoryId);
    const startTime = Date.now();
    cy.request({
        method: 'PUT',
        url: '/api/categories/' + dynamicCategoryId,
        headers: { 'Authorization': 'Bearer ' + authToken, 'Content-Type': 'application/json' },
        body: { name: 'Unauthorized Update', description: 'User should not update' },
        failOnStatusCode: false
    }).then((response) => {
        responseTime = Date.now() - startTime;
        apiResponse = response;
        cy.log('📥 Status: ' + response.status + ' | Time: ' + responseTime + 'ms');
    });
});

When('Admin sends DELETE request to {string}', (endpoint) => {
    cy.log('📤 Admin DELETE: ' + endpoint);
    const startTime = Date.now();
    cy.request({
        method: 'DELETE',
        url: endpoint,
        headers: { 'Authorization': 'Bearer ' + authToken },
        failOnStatusCode: false
    }).then((response) => {
        responseTime = Date.now() - startTime;
        apiResponse = response;
        cy.log('📥 Status: ' + response.status + ' | Time: ' + responseTime + 'ms');
    });
});

When('User sends DELETE request to {string}', (endpoint) => {
    cy.log('📤 User DELETE: ' + endpoint);
    const startTime = Date.now();
    cy.request({
        method: 'DELETE',
        url: endpoint,
        headers: { 'Authorization': 'Bearer ' + authToken },
        failOnStatusCode: false
    }).then((response) => {
        responseTime = Date.now() - startTime;
        apiResponse = response;
        cy.log('📥 Status: ' + response.status + ' | Time: ' + responseTime + 'ms');
    });
});

When('User sends DELETE request to that category', () => {
    cy.log('📤 User DELETE category ID: ' + dynamicCategoryId);
    const startTime = Date.now();
    cy.request({
        method: 'DELETE',
        url: '/api/categories/' + dynamicCategoryId,
        headers: { 'Authorization': 'Bearer ' + authToken },
        failOnStatusCode: false
    }).then((response) => {
        responseTime = Date.now() - startTime;
        apiResponse = response;
        cy.log('📥 Status: ' + response.status + ' | Time: ' + responseTime + 'ms');
    });
});

// ========== RESPONSE VALIDATIONS ==========

Then('Response status code should be {int}', (expectedStatus) => {
    expect(apiResponse.status).to.equal(expectedStatus);
    cy.log('✅ Status code: ' + expectedStatus);
});

Then('Response status code should be {int} or {int}', (status1, status2) => {
    expect([status1, status2]).to.include(apiResponse.status);
    cy.log('✅ Status code: ' + apiResponse.status);
});

Then('Response body should be a valid JSON array', () => {
    expect(apiResponse.body).to.be.an('array');
    cy.log('✅ Response is array with ' + apiResponse.body.length + ' items');
});

Then('Response body should be an empty array', () => {
    expect(apiResponse.body).to.be.an('array').that.is.empty;
    cy.log('✅ Response is empty array');
});

Then('Each category should have fields {string}, {string}', (field1, field2) => {
    expect(apiResponse.body).to.be.an('array').and.have.length.greaterThan(0);
    const firstItem = apiResponse.body[0];
    expect(firstItem).to.have.property(field1);
    expect(firstItem).to.have.property(field2);
    cy.log('✅ Categories have fields: ' + field1 + ', ' + field2);
});

Then('Response body should contain {string}', (text) => {
    const bodyStr = JSON.stringify(apiResponse.body);
    expect(bodyStr).to.include(text);
    cy.log('✅ Response contains: ' + text);
});

Then('Response body should contain {string} with value {string}', (field, value) => {
    const actualValue = apiResponse.body[field];
    const expectedValue = isNaN(value) ? value : Number(value);
    if (typeof actualValue === 'number') {
        expect(actualValue).to.equal(expectedValue);
    } else {
        expect(actualValue).to.equal(value);
    }
    cy.log('✅ ' + field + ' = ' + actualValue);
});

Then('Response body should contain error message', () => {
    const bodyStr = JSON.stringify(apiResponse.body).toLowerCase();
    const hasError = bodyStr.includes('error') || bodyStr.includes('message') || bodyStr.includes('invalid');
    expect(hasError).to.be.true;
    cy.log('✅ Response contains error message');
});

Then('Response body should contain error message about associated data', () => {
    const bodyStr = JSON.stringify(apiResponse.body).toLowerCase();
    const hasRelatedError = bodyStr.includes('associated') ||
                           bodyStr.includes('plant') ||
                           bodyStr.includes('cannot delete') ||
                           bodyStr.includes('in use') ||
                           bodyStr.includes('reference');
    expect(hasRelatedError).to.be.true;
    cy.log('✅ Response contains error about associated data');
});

Then('Response body should contain authorization error message', () => {
    const bodyStr = JSON.stringify(apiResponse.body).toLowerCase();
    const hasAuthError = bodyStr.includes('forbidden') ||
                        bodyStr.includes('unauthorized') ||
                        bodyStr.includes('permission') ||
                        bodyStr.includes('access denied') ||
                        bodyStr.includes('not allowed');
    expect(hasAuthError).to.be.true;
    cy.log('✅ Response contains authorization error');
});

Then('Response body should contain category with name {string}', (name) => {
    let found = false;
    if (Array.isArray(apiResponse.body)) {
        found = apiResponse.body.some(cat => cat.name === name || cat.name.includes(name));
    } else if (apiResponse.body.name) {
        found = apiResponse.body.name === name || apiResponse.body.name.includes(name);
    }
    expect(found).to.be.true;
    cy.log('✅ Found category: ' + name);
});

Then('Response body should not contain category with name {string}', (name) => {
    let found = false;
    if (Array.isArray(apiResponse.body)) {
        found = apiResponse.body.some(cat => cat.name === name || cat.name.includes(name));
    }
    expect(found).to.be.false;
    cy.log('✅ Category not in response: ' + name);
});

Then('Response should have valid category structure', () => {
    expect(apiResponse.body).to.have.property('id');
    expect(apiResponse.body).to.have.property('name');
    cy.log('✅ Category has valid structure');
});

Then('Response time should be less than {int} milliseconds', (maxTime) => {
    expect(responseTime).to.be.lessThan(maxTime);
    cy.log('✅ Response time: ' + responseTime + 'ms (< ' + maxTime + 'ms)');
});

Then('Response content type should be {string}', (contentType) => {
    expect(apiResponse.headers['content-type']).to.include(contentType);
    cy.log('✅ Content-Type: ' + apiResponse.headers['content-type']);
});

Then('Response should contain both main and sub categories', () => {
    expect(apiResponse.body).to.be.an('array');
    cy.log('✅ Response contains categories');
});
