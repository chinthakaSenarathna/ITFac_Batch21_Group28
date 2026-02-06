import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import CategoryApi from "../../../pages/category/CategoryApi";

// ===== Get all categories =====
When("the admin requests all categories", () => {
  cy.get("@adminToken").then((token) => {
    CategoryApi.getAllCategories(token).as("getAllCategoriesResponse");
  });
});

Then("the get all categories response status should be 200", () => {
  cy.get("@getAllCategoriesResponse").its("status").should("eq", 200);
});

Then("the categories list should contain at least one category", () => {
  cy.get("@getAllCategoriesResponse")
    .its("body")
    .should("be.an", "array")
    .and("have.length.greaterThan", 0);
});

Then("the first category should contain keys:", (dataTable) => {
  const keys = dataTable.raw().flat();
  cy.get("@getAllCategoriesResponse")
    .its("body[0]")
    .then((first) => {
      keys.forEach((k) => expect(first, `Missing key ${k} in first item`).to.have.property(k));
    });
});

// ===== Get category summary =====
When("the admin requests category summary", () => {
  cy.get("@adminToken").then((token) => {
    CategoryApi.getCategorySummary(token).as("getCategorySummaryResponse");
  });
});

Then("the get category summary response status should be {int}", (statusCode) => {
  cy.get("@getCategorySummaryResponse").its("status").should("eq", statusCode);
});

Then("the category summary should contain keys:", (dataTable) => {
  const keys = dataTable.raw().flat();
  cy.get("@getCategorySummaryResponse").its("body").then((body) => {
    keys.forEach((k) => expect(body, `Missing key ${k} in summary`).to.have.property(k));
  });
});

// ===== Get sub-categories =====
When("the admin requests sub-categories", () => {
  cy.get("@adminToken").then((token) => {
    CategoryApi.getSubCategories(token).as("getSubCategoriesResponse");
  });
});

Then("the get sub-categories response status should be {int}", (statusCode) => {
  cy.get("@getSubCategoriesResponse").its("status").should("eq", statusCode);
});

Then("the sub-categories list should contain at least one item", () => {
  cy.get("@getSubCategoriesResponse")
    .its("body")
    .should("be.an", "array")
    .and("have.length.greaterThan", 0);
});

Then("the first sub-category should contain keys:", (dataTable) => {
  const keys = dataTable.raw().flat();
  cy.get("@getSubCategoriesResponse")
    .its("body[0]")
    .then((first) => {
      keys.forEach((k) => expect(first, `Missing key ${k} in first sub-category`).to.have.property(k));
    });
});

// ===== Get all categories unauthorized (no token) =====
When("a client requests all categories without authentication", () => {
  cy.request({ method: "GET", url: "/api/categories", failOnStatusCode: false }).as("unauthorizedGetAllCategoriesResponse");
});

Then("the unauthorized get all categories response status should be 401", () => {
  cy.get("@unauthorizedGetAllCategoriesResponse").its("status").should("eq", 401);
});

// ===== Get main categories =====
When("the admin requests main categories", () => {
  cy.get("@adminToken").then((token) => {
    CategoryApi.getMainCategories(token).as("getMainCategoriesResponse");
  });
});

Then("the get main categories response status should be {int}", (statusCode) => {
  cy.get("@getMainCategoriesResponse").its("status").should("eq", statusCode);
});

Then("the main categories list should contain at least one item", () => {
  cy.get("@getMainCategoriesResponse")
    .its("body")
    .should("be.an", "array")
    .and("have.length.greaterThan", 0);
});

Then("the first main category should contain keys:", (dataTable) => {
  const keys = dataTable.raw().flat();
  cy.get("@getMainCategoriesResponse")
    .its("body[0]")
    .then((first) => {
      keys.forEach((k) => expect(first, `Missing key ${k} in first main category`).to.have.property(k));
    });
});

// ===== Search categories with pagination =====
When("the admin searches categories with page {string} size {string} sortField {string} sortDir {string}", (page, size, sortField, sortDir) => {
  cy.get("@adminToken").then((token) => {
    CategoryApi.getCategoriesPage(Number(page), Number(size), sortField, sortDir, token).as("getCategoriesPageResponse");
  });
});

Then("the categories page response status should be {int}", (statusCode) => {
  cy.get("@getCategoriesPageResponse").its("status").should("eq", statusCode);
});

Then("the categories page should contain keys:", (dataTable) => {
  const keys = dataTable.raw().flat();
  cy.get("@getCategoriesPageResponse").its("body").then((body) => {
    keys.forEach((k) => expect(body, `Missing key ${k} in page response`).to.have.property(k));
  });
});

Then("the page content should contain at least one item", () => {
  cy.get("@getCategoriesPageResponse")
    .its("body.content")
    .should("be.an", "array")
    .and("have.length.greaterThan", 0);
});

// ===== Search categories with invalid pagination =====
When("the admin searches categories with invalid page {string} size {string} sortField {string} sortDir {string}", (page, size, sortField, sortDir) => {
  cy.get("@adminToken").then((token) => {
    CategoryApi.getCategoriesPage(Number(page), Number(size), sortField, sortDir, token).as("invalidCategoriesPageResponse");
  });
});

Then("the invalid categories page response status should be {int}", (statusCode) => {
  cy.get("@invalidCategoriesPageResponse").its("status").should("eq", statusCode);
});

// ===== Get all categories unauthorized (no token) =====
When("the admin requests category by id {string}", (id) => {
  cy.get("@adminToken").then((token) => {
    CategoryApi.getCategoryById(id, token).as("getCategoryByIdResponse");
  });
});

Then("the get category by id response status should be {int}", (statusCode) => {
  cy.get("@getCategoryByIdResponse").its("status").should("eq", statusCode);
});

Then("the category details should contain keys:", (dataTable) => {
  const keys = dataTable.raw().flat();
  cy.get("@getCategoryByIdResponse").its("body").then((body) => {
    keys.forEach((k) => expect(body, `Missing key ${k} in category`).to.have.property(k));
  });
});

// Get category by id - not found (non-existing id)
Then("the get category by id response status should be 404", () => {
  cy.get("@getCategoryByIdResponse").its("status").should("eq", 404);
});

// ===== Get category by id - unauthorized (no token) =====
When("a client requests category by id {string} without authentication", (id) => {
  cy.request({ method: "GET", url: `/api/categories/${id}`, failOnStatusCode: false }).as("unauthorizedGetCategoryByIdResponse");
});

Then("the unauthorized get category by id response status should be 401", () => {
  cy.get("@unauthorizedGetCategoryByIdResponse").its("status").should("eq", 401);
});

// ===== Create category =====
When("the admin attempts to create a category with name {string} and parentId {string}", (name, parentId) => {
  cy.get("@adminToken").then((token) => {
    const body = {
      name,
      parentId: Number(parentId),
    };
    CategoryApi.createCategory(body, token).as("createCategoryResponse");
  });
});

Then("the create category response status should be {int}", (statusCode) => {
  cy.get("@createCategoryResponse").its("status").should("eq", statusCode);
});

// ===== Update category =====
When("the admin attempts to update category with id {string} with name {string} and parentId {string}", (id, name, parentId) => {
  cy.get("@adminToken").then((token) => {
    const body = {
      name,
      parentId: Number(parentId),
    };
    CategoryApi.updateCategory(id, body, token).as("updateCategoryResponse");
  });
});

Then("the update category response status should be {int}", (statusCode) => {
  cy.get("@updateCategoryResponse").its("status").should("eq", statusCode);
});
