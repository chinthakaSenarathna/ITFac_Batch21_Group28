Feature: Category Admin API
  As an admin user
  I want to authenticate via the API
  So that I can call protected Category endpoints

  Background:
    Given the admin is authenticated via the API

  @login
  Scenario: Successful admin login via API
    When the admin sends a login request with username "admin" and password "admin123"
    Then the login response status should be 200
    And the login response should contain a bearer token

  @getSummary
  Scenario: Get category summary successfully
    When the admin requests category summary
    Then the get category summary response status should be 200
    And the category summary should contain keys:
      | mainCategories |
      | subCategories |

  @getSubCategories
  Scenario: Get sub-categories successfully
    When the admin requests sub-categories
    Then the get sub-categories response status should be 200
    And the sub-categories list should contain at least one item
    And the first sub-category should contain keys:
      | id |
      | name |
      | subCategories |

  @getMainCategories
  Scenario: Get main categories successfully
    When the admin requests main categories
    Then the get main categories response status should be 200
    And the main categories list should contain at least one item
    And the first main category should contain keys:
      | id |
      | name |
      | subCategories |

  @searchCategoriesPaged
  Scenario: Search categories with pagination successfully
    When the admin searches categories with page "0" size "10" sortField "id" sortDir "asc"
    Then the categories page response status should be 200
    And the categories page should contain keys:
      | content |
      | pageable |
      | totalElements |
    And the page content should contain at least one item

  @searchCategoriesInvalidPaged
  Scenario: Search categories with invalid pagination returns bad request
    When the admin searches categories with invalid page "0" size "0" sortField "id" sortDir "asc"
    Then the invalid categories page response status should be 400

  @createCategoryForbidden
  Scenario: Create category returns bad request
    When the admin attempts to create a category with name "Test Category" and parentId "0"
    Then the create category response status should be 400

  @updateCategoryForbidden
  Scenario: Update category returns not found
    When the admin attempts to update category with id "1" with name "Updated Name" and parentId "0"
    Then the update category response status should be 404
