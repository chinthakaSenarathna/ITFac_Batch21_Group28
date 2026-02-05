Feature: Dashboard Admin UI
  As an Admin
  I want to use dashboard navigation
  So that I can access key pages quickly

  Background:
    Given Admin is logged in with username "admin" and password "admin123"

  Scenario: UI_DASH_ADMIN_001 Dashboard loads after admin login
    Then Validate Dashboard page is visible

  Scenario: UI_DASH_ADMIN_002 Dashboard card - Manage Categories redirects correctly
    When Admin clicks Manage Categories button
    Then Validate Admin is redirected to Categories page

  Scenario: UI_DASH_ADMIN_003 Dashboard card - Manage Plants redirects correctly
    When Admin clicks Manage Plants button
    Then Validate Admin is redirected to Plants page

  Scenario: UI_DASH_ADMIN_004 Dashboard card - View Sales redirects correctly
    When Admin clicks View Sales button
    Then Validate Admin is redirected to Sales page

  Scenario: UI_DASH_ADMIN_005 Sidebar highlights Dashboard as active
    Then Validate Dashboard sidebar menu is active

  Scenario: UI_DASH_ADMIN_006 Inventory is disabled in sidebar
    Then Validate Inventory sidebar is disabled

  Scenario: UI_DASH_ADMIN_007 Logout redirects to login page
    When Admin clicks Logout
    Then Validate user is redirected to Login page

  Scenario: UI_DASH_ADMIN_008 Refresh keeps session
    When Admin refreshes the page
    Then Validate Dashboard page is visible
