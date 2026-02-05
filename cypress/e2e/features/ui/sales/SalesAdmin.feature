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
    Then Validate Admin is redirected to Sales page
    And Validate sale is created successfully

  Scenario: TC_SALES_UI_ADMIN_03 Verify validation error for invalid quantity
    Given Admin is on Sales page
    When Admin clicks Sell Plant button
    And Admin enters sale quantity "0"
    And Admin clicks Confirm Sale button
    Then Validate quantity validation message is displayed

  Scenario: TC_SALES_UI_ADMIN_04 Verify validation error when Plant is not selected
    Given Admin is on Sales page
    When Admin clicks Sell Plant button
    And Admin does not select any plant
    And Admin enters sale quantity "5"
    And Admin clicks Confirm Sale button
    Then Validate plant selection validation message is displayed

  Scenario: TC_SALES_UI_ADMIN_05 Verify validation error when Quantity is empty
    Given Admin is on Sales page
    When Admin clicks Sell Plant button
    And Admin selects a plant from dropdown
    And Admin clears Quantity field
    And Admin clicks Confirm Sale button
    Then Validate quantity required validation message is displayed

  Scenario: TC_SALES_UI_ADMIN_06 Verify validation error when selling more than available stock
    Given Admin is on Sales page
    When Admin clicks Sell Plant button
    And Admin selects a plant from dropdown
    And Admin enters sale quantity "100"
    And Admin clicks Confirm Sale button
    Then Validate stock error message is displayed

  Scenario: TC_SALES_UI_ADMIN_07 Verify alert disappears when close button is clicked
    Given Admin is on Sales page
    When Admin triggers a stock error alert (e.g., enters quantity more than stock)
    And Admin clicks the alert close button
    Then Validate the alert disappears

  Scenario: TC_SALES_UI_ADMIN_08 Verify sale can be deleted successfully
    Given Admin is on Sales page
    When Admin deletes the first sale
    Then Validate success alert message is displayed
