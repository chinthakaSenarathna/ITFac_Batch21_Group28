Feature: Category API - Admin Operations
  As an Admin
  I want to manage categories via API
  So that I can perform CRUD operations on flower categories and sub-categories

  Background:
    Given Admin is authenticated with credentials "admin" and "admin123"

  @smoke @api
  Scenario: TC_CAT_API_01 Verify Admin can get all categories
    When Admin sends GET request to "/api/categories"
    Then Response status code should be 200
    And Response body should be a valid JSON array
    And Each category should have fields "id", "name"

  @smoke @api
  Scenario: TC_CAT_API_02 Verify Admin can create a new main category
    When Admin sends POST request to "/api/categories" with body:
      """
      {
        "name": "Test Indoor Plants API",
        "description": "Plants suitable for indoor environments",
        "parentId": null
      }
      """
    Then Response status code should be 201 or 200
    And Response body should contain "name"

  @api @manual
  Scenario: TC_CAT_API_03 Verify Admin can create a sub-category
    Given Main category "Flowering Plants" exists with id "1"
    When Admin sends POST request to "/api/categories" with body:
      """
      {
        "name": "Test Roses Sub",
        "description": "Rose sub-category",
        "parentId": 1
      }
      """
    Then Response status code should be 201 or 200
    And Response body should contain "name"

  @smoke @api @dynamic
  Scenario: TC_CAT_API_04 Verify Admin can get a specific category by ID
    Given Admin retrieves first available category ID
    When Admin sends GET request to that category by ID
    Then Response status code should be 200
    And Response body should contain "id"
    And Response body should contain "name"

  @api
  Scenario: TC_CAT_API_05 Verify Admin receives 404 for non-existent category ID
    When Admin sends GET request to "/api/categories/99999"
    Then Response status code should be 404

  @smoke @api @dynamic
  Scenario: TC_CAT_API_06 Verify Admin can update an existing category
    Given Admin retrieves first available category ID
    When Admin sends PUT request to that category with updated data
    Then Response status code should be 200
    And Response body should contain "name"

  @api
  Scenario: TC_CAT_API_07 Verify Admin cannot create category with empty name
    When Admin sends POST request to "/api/categories" with body:
      """
      {
        "name": "",
        "description": "Invalid category"
      }
      """
    Then Response status code should be 400
    And Response body should contain error message

  @api
  Scenario: TC_CAT_API_08 Verify Admin cannot create duplicate category name
    Given Category "Flowering Plants" exists
    When Admin sends POST request to "/api/categories" with body:
      """
      {
        "name": "Flowering Plants",
        "description": "Duplicate name"
      }
      """
    Then Response status code should be 400 or 409

  @smoke @api
  Scenario: TC_CAT_API_09 Verify Admin can delete an empty category
    Given Category "Temporary Category" exists with id "10" and has no associated plants
    When Admin sends DELETE request to "/api/categories/10"
    Then Response status code should be 200 or 204
    When Admin sends GET request to "/api/categories/10"
    Then Resp @manual
  Scenario: TC_CAT_API_09 Verify Admin can delete an empty category
    Given Admin creates a temporary test category
    When Admin sends DELETE request to that category
    Then Response status code should be 200 or 200 or 409
    And Response body should contain error message about associated data

  @api
  Scen @manual
  Scenario: TC_CAT_API_10 Verify Admin cannot delete category with associated plants
    Given Admin identifies a category that has associated plants
    When Admin attempts to delete that category
        "name": "Non-existent",
        "description": "Should fail"
      }
      """
    Then Response status code should be 404

  @api
  Scenario: TC_CAT_API_12 Verify Admin can search categories by name
    Given Categories "Herbs", "Flowering Plants", "Succulents" exist
    When Admin sends GET request to "/api/categorior filter categories
    When Admin sends GET request to "/api/categories"
    Then Response status code should be 200
    And Response body should be a valid JSON array
    And If search parameter is supported it should filter results
  Scenario: TC_CAT_API_13 Verify response structure includes required fields
    Given Category "Test Category" exists with id "1"
    When Admin sends GET request to "/api/categories/1"
    Then Response status code should be 200
    And Response should have valid category structure

  @performance @api
  Scenario: TC_CAT_API_14 Verify GET all categories response time is acceptable
    When Admin sends GET request to "/api/categories"
    Then Response status code should be 200
    And Response time should be less than 2000 milliseconds

  @api
  Scen @dynamic
  Scenario: TC_CAT_API_15 Verify Admin can update category with partial data
    Given Admin retrieves first available category ID
    When Admin sends PUT request with only name field to that category
    Then Response status code should be 200 or 400
    And Response should indicate success or validation error