Feature: Category API - User Operations
  As a regular User
  I want to view categories via API
  So that I can browse available flower categories

  Background:
    Given User is authenticated with credentials "testuser" and "test123"

  @smoke @api
  Scenario: TC_CAT_API_USER_01 Verify User can view all categories
    When User sends GET request to "/api/categories"
    Then Response status code should be 200
    And Response body should be a valid JSON array

  @smoke @api
  Scenario: TC_CAT_API_USER_02 Verify User can view specific category by ID
    Given User retrieves first available category ID
    When User sends GET request to that category by ID
    Then Response status code should be 200
    And Response body should contain "name"

  @api
  Scenario: TC_CAT_API_USER_03 Verify User can view category details with all fields
    Given User retrieves first available category ID
    When User sends GET request to that category by ID
    Then Response status code should be 200
    And Response body should contain "id"
    And Response body should contain "name"

  @api @security
  Scenario: TC_CAT_API_USER_04 Verify User cannot update an existing category
    Given User retrieves first available category ID
    When User sends PUT request to that category with unauthorized data
    Then Response status code should be 403
    And Response body should contain "Forbidden"

  @api @security
  Scenario: TC_CAT_API_USER_05 Verify User cannot delete a category
    Given User retrieves first available category ID
    When User sends DELETE request to that category
    Then Response status code should be 403
    And Response body should contain "Forbidden"

  @api
  Scenario: TC_CAT_API_USER_06 Verify 404 for non-existent category
    When User sends GET request to "/api/categories/99999"
    Then Response status code should be 404
    And Response body should contain "NOT_FOUND"

  @api
  Scenario: TC_CAT_API_USER_07 Verify User can list all categories with required fields
    When User sends GET request to "/api/categories"
    Then Response status code should be 200
    And Each category should have fields "id", "name"

  @api
  Scenario: TC_CAT_API_USER_08 Verify User can view categories with parent info
    When User sends GET request to "/api/categories"
    Then Response status code should be 200
    And Each category should have fields "name", "parentName"

  @api
  Scenario: TC_CAT_API_USER_09 Verify response format is JSON
    When User sends GET request to "/api/categories"
    Then Response status code should be 200
    And Response content type should be "application/json"

  @api
  Scenario: TC_CAT_API_USER_10 Verify search with non-existent name returns empty result
    When User sends GET request to "/api/categories?name=NonExistentCategory12345"
    Then Response status code should be 200
    And Response body should be an empty array
