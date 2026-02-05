// cypress/e2e/step_definitions/api/dashboard/dashboard.user.api.steps.js
import { Given, When } from "@badeball/cypress-cucumber-preprocessor";
import { API, apiRequest } from "../../../../support/api/apiClient";
import { setResponse } from "./dashboard.common.api.steps";
import { loginAndGetToken } from "../../../../support/api/auth";
import { expectStatus, expectStatusOneOf } from "../../../../support/api/validators";

let token;
let res;

// NOTE: "API Server is reachable" step is in dashboard.common.api.steps.js

When("API User logs in and stores token", () => {
  apiRequest({
    method: "POST",
    url: API.LOGIN,
    body: { username: "testuser", password: "test123" },
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

Given("API User is authenticated", () => {
  loginAndGetToken("user").then((t) => {
    token = t;
  });
});

When("API User sends GET request to Dashboard Summary", () => {
  apiRequest({ method: "GET", url: API.DASH_SUMMARY, token, failOnStatusCode: false }).then((r) => (res = r));
});

When("API User sends GET request to Categories", () => {
  apiRequest({ method: "GET", url: API.CATEGORIES, token, failOnStatusCode: false }).then((r) => { res = r; setResponse(r); });
});

When("API User sends GET request to Plants", () => {
  apiRequest({ method: "GET", url: API.PLANTS, token, failOnStatusCode: false }).then((r) => (res = r));
});

When("API User sends GET request to Sales", () => {
  apiRequest({ method: "GET", url: API.SALES, token, failOnStatusCode: false }).then((r) => (res = r));
});

When("API User sends GET request to Inventory", () => {
  apiRequest({ method: "GET", url: API.INVENTORY, token, failOnStatusCode: false }).then((r) => (res = r));
});

When("API User tries to create a plant", () => {
  const body = {
    name: "TestPlant_API",
    categoryId: 1,
    price: 10.0,
    quantity: 10,
    stock: 10,
  };

  apiRequest({
    method: "POST",
    url: API.PLANTS,
    token,
    body,
    failOnStatusCode: false,
  }).then((r) => { res = r; setResponse(r); });
});

When("API User tries login with wrong password", () => {
  apiRequest({
    method: "POST",
    url: API.LOGIN,
    body: { username: "testuser", password: "wrongpass" },
    failOnStatusCode: false,
  }).then((r) => { res = r; setResponse(r); });
});

// NOTE: Shared assertion steps (Then) are now in dashboard.common.api.steps.js:
// - "API response status should be {int}"
// - "API response status should be one of {int},{int},{int}"
// - "API response status should be one of {int},{int}"
// Cucumber automatically uses these shared steps - NO DUPLICATION!
