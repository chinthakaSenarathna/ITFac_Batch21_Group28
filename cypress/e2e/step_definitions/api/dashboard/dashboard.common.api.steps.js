// cypress/e2e/step_definitions/api/dashboard/dashboard.common.api.steps.js
// Shared API step definitions used by both Admin and User API tests

import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import { apiRequest } from "../../../../support/api/apiClient";
import { expectStatus, expectStatusOneOf, expectBodyHasKeys, expectArrayBody } from "../../../../support/api/validators";

// This variable will be set by admin/user tests and read here
// Using a shared context object that both files can access
const sharedContext = {
  response: null
};

// Export so admin and user files can set the response
export function setResponse(res) {
  sharedContext.response = res;
}

export function getResponse() {
  return sharedContext.response;
}

// Shared Background step
Given("API Server is reachable", () => {
  apiRequest({ method: "GET", url: "/api/health", failOnStatusCode: false }).then((r) => {
    // Accept 401 if health endpoint requires auth, or 200/204/404 if it doesn't
    expect([200, 204, 401, 404]).to.include(r.status);
  });
});

// Shared assertion steps
Then("API response status should be {int}", (code) => {
  expectStatus(sharedContext.response, code);
});

Then("API response status should be one of {int},{int},{int}", (a, b, c) => {
  expectStatusOneOf(sharedContext.response, [a, b, c]);
});

Then("API response status should be one of {int},{int},{int},{int}", (a, b, c, d) => {
  expectStatusOneOf(sharedContext.response, [a, b, c, d]);
});

Then("API response status should be one of {int},{int},{int},{int},{int}", (a, b, c, d, e) => {
  expectStatusOneOf(sharedContext.response, [a, b, c, d, e]);
});

Then("API response status should be one of {int},{int}", (a, b) => {
  expectStatusOneOf(sharedContext.response, [a, b]);
});

Then("API response body should contain keys:", (dataTable) => {
  const keys = dataTable.raw().flat();
  expectBodyHasKeys(sharedContext.response, keys);
});

Then("API response body should be an array", () => {
  expectArrayBody(sharedContext.response);
});
