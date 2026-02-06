Feature: Deprecated - Category List User
  # Deprecated. See CategoryUI.feature

  Scenario: TC_CAT_UI_USER_01 Verify that User can use search functionality to find categories by name
    Given User is on Category List page
    And Categories like "Flowering Plants", "Herbs", and "Succulents" exist in the system
    When User enters "Flowering" in the search field
    And Click Search button
    Then Validate search results display only categories with "Flowering" in name
    And Validate other categories like "Herbs" and "Succulents" are not displayed
    When User clears search field
    And Click Search button
    Then Validate all categories are displayed again

  Scenario: TC_CAT_UI_USER_02 Verify that the system displays "No categories found" message when no categories match the search criteria
    Given User is on Category List page
    When User enters "NonExistentCategory" in the search field
    And Click Search button
    Then Validate search results displays no records
    And Validate system displays the message "No categories found"
    When User clears search field
    And Click Search button
    Then Validate all categories are displayed again

  Scenario: TC_CAT_UI_USER_03 Verify that User can view category details including plant count
    Given User is on Category List page
    And Category "Flowering Plants" exists with "5" plants
    Then Validate category "Flowering Plants" displays plant count
    And Validate plant count shows "5" plants

  Scenario: TC_CAT_UI_USER_04 Verify that User can view all categories in a table format
    Given User is on Category List page
    Then Validate category table is displayed
    And Validate table contains columns "Name", "Description", and "Plant Count"
    And Validate at least one category is displayed

  Scenario: TC_CAT_UI_USER_05 Verify that User cannot access Add Category functionality
    Given User is on Category List page
    Then Validate "Add Category" button is NOT visible
    And Validate navigation to add category page is restricted
