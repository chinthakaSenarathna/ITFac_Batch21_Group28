Feature: Plant List User UI
  As a User
  I want to view and search plants
  So that I can find products to buy

  Background:
    Given User is logged in with username "testuser" and password "test123"

  Scenario: TC_PLT_UI_USER_01 Verify that User can use search functionality to find plants by name
    Given User is on Plant List page
    And Plants like "Rose", "Tulip", and "Cactus" exist in the system
    When User enters "Rose" in the search field
    And Click Search button
    Then Validate search results display only plants with "Rose" in name
    And Validate other plants like "Tulip" and "Cactus" are not displayed
    When User clears search field
    And Click Search button
    Then Validate all plants are displayed again

  Scenario: TC_PLT_UI_USER_02 Verify that the system displays "No plants found" message when no plants match the search criteria
    Given User is on Plant List page
    When User enters "NonExistentPlant" in the search field
    And Click Search button
    Then Validate search results displays no records
    And Validate system displays the message "No plants found"
    When User clears search field
    And Click Search button
    Then Validate all plants are displayed again

  Scenario: TC_PLT_UI_USER_03 Verify that User can filter plants by category and see filtered results
    Given User is on Plant List page
    When User selects "Flowering Plants" from category dropdown
    And Click Search button
    Then Validate only plants from "Pink Rose" category are displayed
    When User selects "All Categories" from category dropdown
    And Click Search button
    Then Validate all plants from all categories are displayed

  Scenario: TC_PLT_UI_USER_04 Verify that the system displays "No plants found" message when no plants exist for the selected category
    Given User is on Plant List page
    When User selects "NonExistentCategory" from category dropdown
    And Click Search button
    Then Validate search results displays no records
    And Validate system displays the message "No plants found"
    When User selects "All Categories" from category dropdown
    And Click Search button
    Then Validate all plants from all categories are displayed again

  Scenario: TC_PLT_UI_USER_05 Verify that User can see "Low" badge for plants with quantity below 5
    Given User is on Plant List page
    When Plant "Orchid" exists with Quantity "2"
    Then Validate "Low" badge is visible near the quantity for "Orchid"
    And Validate badge is styled distinctly
    And Validate badge text reads "Low"
