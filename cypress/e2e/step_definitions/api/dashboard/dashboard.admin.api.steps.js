// cypress/e2e/step_definitions/api/dashboard/dashboard.admin.api.steps.js
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { API, apiRequest } from "../../../../support/api/apiClient";
import { setResponse } from "./dashboard.common.api.steps";
import { loginAndGetToken } from "../../../../support/api/auth";
import {
  expectStatus,
  expectStatusOneOf,
  expectBodyHasKeys,
  extractNumberField
} from "../../../../support/api/validators";

let token;
let res;
let prevStock;

// NOTE: "API Server is reachable" step is now in dashboard.common.api.steps.js

When("API Admin logs in and stores token", () => {
  apiRequest({
    method: "POST",
    url: API.LOGIN,
    body: { username: "admin", password: "admin123" },
    failOnStatusCode: false,
  }).then((r) => {
    setResponse(r);
    res = r;
    token =
      r.body.token ||
      r.body.accessToken ||
      r.body.jwt ||
      r.body?.data?.token ||
      r.body?.data?.accessToken;
  });
});

Given("API Admin is authenticated", () => {
  loginAndGetToken("admin").then((t) => {
    token = t;
  });
});

When("API Admin sends GET request to Dashboard Summary", () => {
  apiRequest({ method: "GET", url: API.DASH_SUMMARY, token, failOnStatusCode: false }).then((r) => { res = r; setResponse(r); });
});

When("API Admin sends GET request to Categories", () => {
  apiRequest({ method: "GET", url: API.CATEGORIES, token, failOnStatusCode: false }).then((r) => { res = r; setResponse(r); });
});

When("API Admin sends GET request to Plants", () => {
  apiRequest({ method: "GET", url: API.PLANTS, token, failOnStatusCode: false }).then((r) => { res = r; setResponse(r); });
});

When("API Admin sends GET request to Sales", () => {
  apiRequest({ method: "GET", url: API.SALES, token, failOnStatusCode: false }).then((r) => { res = r; setResponse(r); });
});

When("API Admin sends GET request to Inventory", () => {
  apiRequest({ method: "GET", url: API.INVENTORY, token, failOnStatusCode: false }).then((r) => { res = r; setResponse(r); });
});

When("API Admin sends PUT request to Sales", () => {
  apiRequest({ method: "PUT", url: API.SALES, token, failOnStatusCode: false }).then((r) => { res = r; setResponse(r); });
});

When("API Admin sends GET request to Invalid Endpoint", () => {
  apiRequest({ method: "GET", url: "/api/invalid-endpoint", token, failOnStatusCode: false }).then((r) => { res = r; setResponse(r); });
});

When("API Admin tries login with wrong password", () => {
  apiRequest({
    method: "POST",
    url: API.LOGIN,
    body: { username: "admin", password: "wrongpass" },
    failOnStatusCode: false,
  }).then((r) => { res = r; setResponse(r); });
});

// NOTE: Assertion steps (Then) are now in dashboard.common.api.steps.js

// --- Stock check (optional, depends on your backend) ---
When('API Admin stores current stock of plant "{string}"', (plantId) => {
  apiRequest({
    method: "GET",
    url: `${API.PLANTS}/${plantId}`,
    token,
    failOnStatusCode: false,
  }).then((r) => {
    expect(r.status).to.eq(200);
    const s = extractNumberField(r.body, ["stock", "quantity", "qty"]);
    expect(s, "Stock field not found in plant response").to.be.a("number");
    prevStock = s;
  });
});

When('API Admin creates a sale for plant "{string}" qty "{string}"', (plantId, qty) => {
  cy.log(`Creating sale: plant=${plantId}, qty=${qty}`);
  const body = {
    plantId: Number(plantId),
    quantity: Number(qty),
    qty: Number(qty), // Send both if unsure of backend requirement
  };

  apiRequest({
    method: "POST",
    url: API.SALES,
    token,
    body,
    failOnStatusCode: false,
  }).then((r) => { 
    cy.log(`Sale creation response status: ${r.status}`);
    res = r; 
    setResponse(r); 
  }).catch((e) => {
    // Handle network errors or backend crashes by simulating a 500 response
    // This allows the test to continue to the assertion step instead of crashing
    cy.log(`Sale creation failed with error: ${e.message}`);
    const errorResponse = { status: 500, body: { error: e.message } };
    res = errorResponse;
    setResponse(errorResponse);
  });
});

Then('API plant "{string}" stock should be reduced by {int}', (plantId, diff) => {
  apiRequest({
    method: "GET",
    url: `${API.PLANTS}/${plantId}`,
    token,
    failOnStatusCode: false,
  }).then((r) => {
    expect(r.status).to.eq(200);
    const newStock = extractNumberField(r.body, ["stock", "quantity", "qty"]);
    expect(newStock, "Stock field missing after sale").to.be.a("number");
    expect(newStock).to.eq(prevStock - diff);
  });
});
