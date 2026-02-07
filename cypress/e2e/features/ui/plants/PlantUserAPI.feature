Feature: Plant User API Tests
  As a Regular User
  I want to access the Plants API
  So that I can retrieve plant information and verify security restrictions

  Background:
    Given User "testuser" is authenticated with password "test123"

  Scenario: TC_PLT_API_USER_01 Verify that regular User can retrieve paginated list of plants via API
    Given At least 4 plants exist in the database
    When I send a GET request to "/api/plants/paged" with parameters:
      | page | 0  |
      | size | 10 |
    Then The response status code should be 200
    And The response body should contain an array of plants
    And The response should include pagination metadata:
      | totalPages    |
      | pageNumber    |
      | totalElements |
      | offset        |
      | sort          |
      | size          |
    And Each plant object should contain "id", "name", "category", "price", "quantity"

  Scenario: TC_PLT_API_USER_02 Verify that regular User can search plants by name via API
    Given Plants "Rose Red", "Rose Pink", and "Tulip" exist in the database
    When I send a GET request to "/api/plants/paged" with parameters:
      | name | Rose |
      | page | 0    |
      | size | 10   |
    Then The response status code should be 200
    And The response body should contain plants with "Rose" in the name
    And The response should contain "Rose Red"
    And The response should contain "Rose Pink"
    But The response should NOT contain "Tulip"

  Scenario: TC_PLT_API_USER_03 Verify that regular User can filter plants by category via API
    Given Plants exist in category "Flowering" with ID 3
    And Plants exist in category "Succulent" with ID 4
    When I send a GET request to "/api/plants/paged" with parameters:
      | categoryId | 2  |
      | page       | 0  |
      | size       | 10 |
    Then The response status code should be 200
    And All returned plants should belong to category ID 2 and name "xyz"
    And No plants from category "Succulent" should be returned

  Scenario: TC_PLT_API_USER_04 Verify that a user is not allowed to create a new plant using the API
    Given I prepared a valid plant payload with category ID 3
    When I send a POST request to "/api/plants/category/3" with the payload
    Then The response status code should be 403
    And The response should contain error "Forbidden"

  Scenario: TC_PLT_API_USER_05 Verify that a user is not allowed to delete plants using the API
    Given A plant with ID 1 exists
    When I send a DELETE request to "/api/plants/1"
    Then The response status code should be 403
    And The response should contain error "Forbidden"
