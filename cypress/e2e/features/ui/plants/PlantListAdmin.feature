Feature: Plant List Admin UI
  As an Admin
  I want to manage plants (view, add, edit, delete)
  So that I can control the plant inventory

  Background:
    Given Admin is logged in with username "admin" and password "admin123"

  Scenario: TC_PLT_UI_ADMIN_01 Verify that an Admin can view the Actions column and Add a Plant button is visible
    Given Admin is on Plant List page
    Then Validate "Add a Plant" button is visible
    When Admin logs out
    And User is logged in with username "testuser" and password "test123"
    And User is on Plant List page
    Then Validate "Add a Plant" button is NOT visible

  Scenario: TC_PLT_UI_ADMIN_02 Verify that Edit action is only visible to admin
    Given Admin is on Plant List page
    And At least one plant exists in the system
    Then Validate "Edit" action is visible for plants in the list
    When Admin logs out
    And User is logged in with username "testuser" and password "test123"
    And User is on Plant List page
    Then Validate "Edit" action is NOT visible for any plant in the list

  Scenario: TC_PLT_UI_ADMIN_03 Verify that Delete action is only visible to admin
    Given Admin is on Plant List page
    And At least one plant exists in the system
    Then Validate "Delete" action is visible for plants in the list
    When Admin logs out
    And User is logged in with username "testuser" and password "test123"
    And User is on Plant List page
    Then Validate "Delete" action is NOT visible for any plant in the list

  Scenario: TC_PLT_UI_ADMIN_05 Verify that the Admin is redirected to Plant List page when clicking Cancel button
    Given Admin is on Plant List page
    And Admin is on Add a Plant page
    When Admin clicks Cancel button
    Then Validate Admin is redirected to Plant List page

  Scenario: TC-Admin-Plants-04 Search plants by invalid plant name
    Given Admin is on Plant List page
    When User enters "NonExistentPlant" in the search field
    And Click Search button
    Then Validate search results displays no records
    And Validate system displays the message "No plants found"

  Scenario: TC-Admin-Plants-05 Verify All Categories Filtering
    Given Admin is on Plant List page
    When User selects "Pink Rose" from category dropdown
    And Click Search button
    Then Validate only plants from "Pink Rose" category are displayed

  Scenario: TC-Admin-Plants-06 Verify reset button functionality
    Given Admin is on Plant List page
    When User enters "Rose" in the search field
    And Click Search button
    When Click Reset button
    Then Validate all plants are displayed again

  Scenario: TC-Admin-Plants-07 Sort plants by Name
    Given Admin is on Plant List page
    When Click on the Name column heading once
    And Click on the Name column heading a second time
    Then Validate column "Name" sort toggles

  Scenario: TC-Admin-Plants-09 Sort plants by Price
    Given Admin is on Plant List page
    When Click on the Price column heading once
    And Click on the Price column heading a second time
    Then Validate column "Price" sort toggles

  Scenario: TC-Admin-Plants-10 Sort plants by Stock
    Given Admin is on Plant List page
    When Click on the Stock column heading once
    And Click on the Stock column heading a second time
    Then Validate column "Stock" sort toggles
