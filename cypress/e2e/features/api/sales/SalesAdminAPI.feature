Feature: Sales Admin API
  As an admin user
  I want to authenticate via the API
  So that I can call protected Sales endpoints

  Background:
    Given the admin is authenticated via the API

  @login
  Scenario: Successful admin login via API
    When the admin sends a login request with username "admin" and password "admin123"
    Then the login response status should be 200
    And the login response should contain a bearer token

  @getAllSales
  Scenario: Get all sales successfully
    When the admin requests all sales
    Then the get all sales response status should be 200
    And the sales list should contain at least one sale
    And the first sale should have valid plant and pricing data

  @getAllSalesUnauthorized
  Scenario: Get all sales without token should be unauthorized
    When a client requests all sales without authentication
    Then the unauthorized get all sales response status should be 401

  @getAllSalesPricing
  Scenario: Validate total price calculation for all sales
    When the admin requests all sales
    Then the get all sales response status should be 200
    And each sale should have correct total price

  @getSaleById
  Scenario: Get sale by id successfully
    When the admin sells plant with id "1" and quantity "5"
    Then the sell plant response status should be 201
    And the sell plant response should have correct sale details for quantity "5"
    When the admin requests the last created sale by id
    Then the get sale by id response status should be 200
    And the sale details should match the expected data for quantity "5"

  @getSaleByIdNotFound
  Scenario: Get sale by non-existing id should return 404
    When the admin requests sale by id "99999"
    Then the get sale by id response status should be 404
    And the get sale by id response body should indicate not found

  @getSaleByIdUnauthorized
  Scenario: Get sale by id without token should be unauthorized
    When a client requests sale by id "13" without authentication
    Then the unauthorized get sale by id response status should be 401

  @sellPlant
  Scenario: Sell a plant successfully via API
    When the admin sells plant with id "1" and quantity "2"
    Then the sell plant response status should be 201
    And the sell plant response should have correct sale details for quantity "2"

  @sellPlantUnauthorized
  Scenario: Sell plant without token should be unauthorized
    When a client sells plant with id "1" and quantity "1" without authentication
    Then the sell plant response status should be 401

  @sellPlantNotFound
  Scenario: Sell plant with non-existing id should return 404
    When the admin sells plant with id "99999" and quantity "1"
    Then the sell plant response status should be 404

  @sellPlantInvalidQuantity
  Scenario: Sell plant with invalid quantity should return 400
    When the admin sells plant with id "1" and quantity "0"
    Then the sell plant response status should be 400

  @deleteSale
  Scenario: Delete a sale successfully via API
    When the admin sells plant with id "1" and quantity "1"
    Then the sell plant response status should be 201
    When the admin deletes the last created sale
    Then the delete sale response status should be 204

  @deleteSaleUnauthorized
  Scenario: Delete sale without token should be unauthorized
    When a client deletes sale with id "13" without authentication
    Then the delete sale response status should be 401

  @deleteSaleNotFound
  Scenario: Delete sale with non-existing id should return 404
    When the admin deletes sale with id "99999"
    Then the delete sale response status should be 404
