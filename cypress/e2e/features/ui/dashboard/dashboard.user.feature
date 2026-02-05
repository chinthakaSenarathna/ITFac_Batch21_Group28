Feature: Dashboard User UI
  As a User
  I want to access dashboard and view pages
  So that I can navigate read-only

  Background:
    Given User is logged in with username "testuser" and password "test123"

  Scenario: UI_DASH_USER_001 Dashboard loads after user login
    Then Validate Dashboard page is visible

  Scenario: UI_DASH_USER_002 User can navigate to Categories from dashboard card
    When User clicks Manage Categories button
    Then Validate user is redirected to Categories page

  Scenario: UI_DASH_USER_003 User can navigate to Plants from dashboard card
    When User clicks Manage Plants button
    Then Validate user is redirected to Plants page

  Scenario: UI_DASH_USER_004 User can navigate to Sales from dashboard card
    When User clicks View Sales button
    Then Validate user is redirected to Sales page

  Scenario: UI_DASH_USER_005 Inventory is disabled for user also
    Then Validate Inventory sidebar is disabled
