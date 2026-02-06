Feature: Plant Admin API Tests
  As an Admin
  I want to manage plants via API
  So that I can maintain the plant inventory

  Background:
    Given Admin "admin" is authenticated with password "admin123"

  Scenario: TC_PLT_API_ADMIN_01 Verify that Admin can successfully create a new plant via API with valid data
    Given A sub-category exists with ID 3
    When I prepare a plant payload with:
      | name     | Anthurium |
      | price    | 150       |
      | quantity | 25        |
      | category | 3         |
    And I execute an admin POST request to "/api/plants/category/3" with the prepared payload
    Then The admin response status code should be 200
    And The response body should contain the created plant with name "Anthurium"
    And The admin response should contain message "Plant created successfully"
    And The new plant should be saved in the database

  Scenario: TC_PLT_API_ADMIN_02 Verify that the system validates Quantity as a mandatory field when adding a new plant via API
    Given A sub-category exists with ID 3
    When I prepare a plant payload without "quantity":
      | name     | Orchid |
      | price    | 150    |
      | category | 3      |
    And I execute an admin POST request to "/api/plants/category/3" with the prepared payload
    Then The admin response status code should be 400
    And The admin response should contain error "BAD_REQUEST"
    And The response should contain validation error for "quantity" with message "Quantity is required"
    And The plant should NOT be saved in the database

  Scenario: TC_PLT_API_ADMIN_03 Verify that Admin can successfully delete a plant via API
    Given A plant exists with ID 1
    When I execute an admin DELETE request to "/api/plants/1"
    Then The admin response status code should be 204
    And The admin response should contain message "Plant deleted successfully"
    When I execute an admin GET request to "/api/plants/1"
    Then The admin response status code should be 404
    And The admin response should contain error "NOT_FOUND"

  Scenario: TC_PLT_API_ADMIN_04 Verify that Admin can successfully update Category of an existing plant via API
    Given Sub-categories exist: "Flowering" (ID 3) and "Succulent" (ID 4)
    And A plant exists with ID 1 in category "Flowering"
    When I prepare a plant update payload for ID 1 with:
      | name     | Lily      |
      | price    | 1220      |
      | quantity | 8         |
      | category | 4         |
    And I execute an admin PUT request to "/api/plants/1" with the prepared payload
    Then The admin response status code should be 200
    And The response body should contain the updated plant with category ID 4
    And The admin response should contain message "Plant updated successfully"
    When I execute an admin GET request to "/api/plants/1"
    Then The retrieved plant should satisfy category ID 4

  Scenario: TC_PLT_API_ADMIN_05 Verify that new plant create API rejects parent categories
    Given A parent category exists with ID 1
    When I prepare a plant payload with:
      | name     | Sunflower |
      | price    | 1500      |
      | quantity | 25        |
    And I execute an admin POST request to "/api/plants/category/1" with the prepared payload
    Then The admin response status code should be 400
    And The admin response should contain error "BAD_REQUEST"
    And The admin response should contain message "Plants can only be added to sub-categories"
