Feature: Sales Management User UI
  As a User
  I want to view available plants and my sales
  So that I can understand plant availability

  Background:
    Given User is logged in with username "testuser" and password "test123"

  Scenario: TC_SALES_UI_USER_01 Verify User can view Sales page
    Given User is on Sales page
    Then Validate Sales table is visible for User

  Scenario: TC_SALES_UI_USER_02 Verify User cannot see Sell Plant button
    Given User is on Sales page
    Then Validate Sell Plant button is not visible

  Scenario: TC_SALES_UI_USER_03 Verify User cannot delete sales
    Given User is on Sales page
    Then Validate delete option is not visible
