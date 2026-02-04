Feature: Sales Management Admin UI
  As an Admin
  I want to sell plants and view sales
  So that I can manage plant sales and inventory

  Background:
    Given Admin is logged in with username "admin" and password "admin123"

  Scenario: TC_SALES_UI_ADMIN_01 Verify Admin can view Sales page
    Given Admin is on Sales page
    Then Validate Sales table is visible

  Scenario: TC_SALES_UI_ADMIN_02 Verify Admin can sell a plant with valid quantity
    Given Admin is on Sales page
    When Admin clicks Sell Plant button
    And Admin selects a plant from dropdown
    And Admin enters sale quantity "5"
    And Admin clicks Confirm Sale button
    Then Validate sale is created successfully
    And Validate Admin is redirected to Sales page

  Scenario: TC_SALES_UI_ADMIN_03 Verify validation error for invalid quantity
    Given Admin is on Sales page
    When Admin clicks Sell Plant button
    And Admin enters sale quantity "0"
    And Admin clicks Confirm Sale button
    Then Validate quantity validation message is displayed

  Scenario: TC_SALES_UI_ADMIN_04 Verify inventory is reduced after successful sale
    Given Admin is on Sales page
    And Plant "Rose" exists with quantity "100"
    When Admin sells plant "Rose" with quantity "10"
    Then Validate plant quantity is reduced by "10"

  Scenario: TC_SALES_UI_USER_01 Verify Sell Plant button is hidden for normal user
    Given Admin logs out
    And User is logged in with username "testuser" and password "test123"
    And User is on Sales page
    Then Validate Sell Plant button is NOT visible
