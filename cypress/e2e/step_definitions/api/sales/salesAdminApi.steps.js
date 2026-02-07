import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import SalesApi from "../../../pages/sales/SalesApi";
import PlantApi from "../../../pages/plants/PlantApi";

// Background: admin is authenticated via the API
Given("the admin is authenticated via the API", () => {
  SalesApi.login("admin", "admin123").then((token) => {
    // Save token as alias for reuse in other steps
    cy.wrap(token).as("adminToken");
    
    // Restore plant 1 inventory for sale tests
    PlantApi.updatePlant(1, {
      name: "plant1",
      price: 1000,
      quantity: 100,
    }, token);
  });
});

// Explicit login scenario steps
When(
  "the admin sends a login request with username {string} and password {string}",
  (username, password) => {
    SalesApi.loginRequest(username, password).as("loginResponse");
  }
);

Then("the login response status should be 200", () => {
  cy.get("@loginResponse").its("status").should("eq", 200);
});

Then("the login response should contain a bearer token", () => {
  cy.get("@loginResponse").then((response) => {
    expect(response.body).to.have.property("token");
    expect(response.body).to.have.property("tokenType", "Bearer");
  });
});

// ===== Get all sales =====
When("the admin requests all sales", () => {
  cy.get("@adminToken").then((token) => {
    SalesApi.getAllSales(token).as("getAllSalesResponse");
  });
});

Then("the get all sales response status should be 200", () => {
  cy.get("@getAllSalesResponse").its("status").should("eq", 200);
});

Then("the sales list should contain at least one sale", () => {
  cy.get("@getAllSalesResponse")
    .its("body")
    .should("be.an", "array")
    .and("have.length.greaterThan", 0);
});

Then("the first sale should have valid plant and pricing data", () => {
  cy.get("@getAllSalesResponse")
    .its("body[0]")
    .then((sale) => {
      expect(sale).to.have.property("id");
      expect(sale).to.have.property("quantity");
      expect(sale).to.have.property("totalPrice");
      expect(sale).to.have.property("soldAt");
      expect(sale).to.have.property("plant");

      expect(sale.plant).to.have.property("id");
      expect(sale.plant).to.have.property("name");
      expect(sale.plant).to.have.property("price");
      expect(sale.plant).to.have.property("quantity");
      expect(sale.plant).to.have.property("category");

      // Optional stronger checks based on your current data
      expect(sale.plant.name).to.eq("plant1");
      expect(sale.totalPrice).to.eq(sale.quantity * sale.plant.price);
    });
});

// ===== Get all sales unauthorized (no token) =====
When("a client requests all sales without authentication", () => {
  // Direct cy.request without Authorization header
  cy.request({
    method: "GET",
    url: "/api/sales",
    failOnStatusCode: false, // don't fail test on non-2xx
  }).as("unauthorizedGetAllSalesResponse");
});

Then("the unauthorized get all sales response status should be 401", () => {
  cy.get("@unauthorizedGetAllSalesResponse").its("status").should("eq", 401);
});

// ===== Get all sales pricing validation =====
Then("each sale should have correct total price", () => {
  cy.get("@getAllSalesResponse")
    .its("body")
    .then((sales) => {
      expect(sales).to.be.an("array");

      sales.forEach((sale) => {
        expect(sale).to.have.property("quantity");
        expect(sale).to.have.property("totalPrice");
        expect(sale).to.have.property("plant");
        expect(sale.plant).to.have.property("price");

        expect(sale.totalPrice).to.eq(sale.quantity * sale.plant.price);
      });
    });
});

// ===== Get sale by id =====
When("the admin requests sale by id {string}", (id) => {
  cy.get("@adminToken").then((token) => {
    SalesApi.getSaleById(id, token).as("getSaleByIdResponse");
  });
});

Then("the get sale by id response status should be 200", () => {
  cy.get("@getSaleByIdResponse").its("status").should("eq", 200);
});

Then(
  "the sale details should match the expected data for id {string}",
  (expectedId) => {
    cy.get("@getSaleByIdResponse")
      .its("body")
      .then((sale) => {
        // Basic identity checks
        expect(String(sale.id)).to.eq(expectedId);

        // Structure checks
        expect(sale).to.have.property("quantity");
        expect(sale).to.have.property("totalPrice");
        expect(sale).to.have.property("soldAt");
        expect(sale).to.have.property("plant");

        expect(sale.plant).to.have.property("id");
        expect(sale.plant).to.have.property("name");
        expect(sale.plant).to.have.property("price");
        expect(sale.plant).to.have.property("quantity");
        expect(sale.plant).to.have.property("category");

        // Optional: stronger checks based on your Swagger example
        // Adjust if your data changes in future:
        expect(sale.plant.name).to.eq("plant1");
        expect(sale.plant.price).to.eq(1000);
        expect(sale.quantity).to.eq(5);
        expect(sale.totalPrice).to.eq(5000);
      });
  }
);

// Request the sale that was just created in the scenario
When("the admin requests the last created sale by id", () => {
  cy.get("@adminToken").then((token) => {
    cy.get("@sellPlantResponse")
      .its("body.id")
      .then((id) => {
        SalesApi.getSaleById(id, token).as("getSaleByIdResponse");
      });
  });
});

Then("the sale details should match the expected data for quantity {string}", (expectedQty) => {
  const qty = Number(expectedQty);

  cy.get("@getSaleByIdResponse")
    .its("body")
    .then((sale) => {
      expect(sale).to.have.property("quantity", qty);
      expect(sale).to.have.property("totalPrice");
      expect(sale).to.have.property("soldAt");
      expect(sale).to.have.property("plant");

      expect(sale.plant).to.have.property("id");
      expect(sale.plant).to.have.property("name");
      expect(sale.plant).to.have.property("price");

      expect(sale.totalPrice).to.eq(qty * sale.plant.price);
    });
});

// ===== Get sale by id - not found (non-existing id) =====
Then("the get sale by id response status should be 404", () => {
  cy.get("@getSaleByIdResponse").its("status").should("eq", 404);
});

Then(
  "the get sale by id response body should indicate not found",
  () => {
    cy.get("@getSaleByIdResponse")
      .its("body")
      .then((body) => {
        // Adjust these expectations to match your actual API error format
        if (typeof body === "string") {
          expect(body.toLowerCase()).to.include("not found");
          return;
        }

        // e.g. { message: "Sale not found" }
        if (body && typeof body.message === "string") {
          expect(body.message.toLowerCase()).to.include("not found");
        }
      });
  }
);

// ===== Get sale by id - unauthorized (no token) =====
When("a client requests sale by id {string} without authentication", (id) => {
  cy.request({
    method: "GET",
    url: `/api/sales/${id}`,
    failOnStatusCode: false,
  }).as("unauthorizedGetSaleByIdResponse");
});

Then("the unauthorized get sale by id response status should be 401", () => {
  cy.get("@unauthorizedGetSaleByIdResponse").its("status").should("eq", 401);
});

// ===== Sell plant =====
When(
  "the admin sells plant with id {string} and quantity {string}",
  (plantId, quantity) => {
    cy.get("@adminToken").then((token) => {
      SalesApi.sellPlant(plantId, quantity, token).as("sellPlantResponse");
    });
  }
);

// Unauthenticated sell attempt
When(
  "a client sells plant with id {string} and quantity {string} without authentication",
  (plantId, quantity) => {
    cy.request({
      method: "POST",
      url: `/api/sales/plant/${plantId}?quantity=${quantity}`,
      body: "",
      failOnStatusCode: false,
    }).as("sellPlantResponse");
  }
);

// ===== Delete sale =====
When("the admin deletes sale with id {string}", (id) => {
  cy.get("@adminToken").then((token) => {
    SalesApi.deleteSale(id, token).as("deleteSaleResponse");
  });
});

When("a client deletes sale with id {string} without authentication", (id) => {
  cy.request({
    method: "DELETE",
    url: `/api/sales/${id}`,
    failOnStatusCode: false,
  }).as("deleteSaleResponse");
});

Then("the delete sale response status should be {int}", (statusCode) => {
  cy.get("@deleteSaleResponse").its("status").should("eq", statusCode);
});

// Delete the sale created earlier in scenario
When("the admin deletes the last created sale", () => {
  cy.get("@adminToken").then((token) => {
    cy.get("@sellPlantResponse")
      .its("body.id")
      .then((id) => {
        SalesApi.deleteSale(id, token).as("deleteSaleResponse");
      });
  });
});

Then("the sell plant response status should be {int}", (statusCode) => {
    cy.get("@sellPlantResponse").its("status").should("eq", statusCode);
});  

Then(
  "the sell plant response should have correct sale details for quantity {string}",
  (expectedQty) => {
    const qty = Number(expectedQty);

    cy.get("@sellPlantResponse")
      .its("body")
      .then((sale) => {
        expect(sale).to.have.property("id");
        expect(sale).to.have.property("quantity", qty);
        expect(sale).to.have.property("totalPrice");
        expect(sale).to.have.property("soldAt");
        expect(sale).to.have.property("plant");

        expect(sale.plant).to.have.property("id", 1);
        expect(sale.plant).to.have.property("name", "plant1");
        expect(sale.plant).to.have.property("price", 1000);

        // Check pricing logic: totalPrice = quantity * price
        expect(sale.totalPrice).to.eq(qty * sale.plant.price);
      });
  }
);
