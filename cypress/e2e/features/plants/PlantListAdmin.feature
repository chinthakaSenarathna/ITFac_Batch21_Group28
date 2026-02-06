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

  Scenario: TC_PLT_UI_ADMIN_04 Verify that Admin can successfully add new plants with valid inputs
    Given Admin is on Plant List page
    And Admin is on Add a Plant page
    When Admin enters plant name "Rose"
    And Admin selects a category from dropdown
    And Admin enters price "25.99"
    And Admin enters quantity "100"
    And Admin clicks Save button
    Then Validate Admin is redirected to Plant List page
    And Validate newly added plant "Rose" appears in the list

  Scenario: TC_PLT_UI_ADMIN_05 Verify that the Admin is redirected to Plant List page when clicking Cancel button
    Given Admin is on Plant List page
    And Admin is on Add a Plant page
    When Admin clicks Cancel button
    Then Validate Admin is redirected to Plant List page
