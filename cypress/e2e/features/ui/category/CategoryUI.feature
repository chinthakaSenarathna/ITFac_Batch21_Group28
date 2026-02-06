Feature: Category Management UI - Admin
  As an Admin
  I want to manage categories via UI
  So that I can organize plant categories

  Background:
    Given Admin is logged in with username "admin" and password "admin123"
    And Admin navigates to Categories page

  @ui
  Scenario: TC_CAT_UI_01 Verify Categories page loads with table visible
    Then Categories table should be visible
    And Table should have columns "ID", "Name", "Parent", "Actions"

  @ui
  Scenario: TC_CAT_UI_02 Verify Add A Category button is visible for Admin
    Then "Add A Category" button should be visible

  @ui
  Scenario: TC_CAT_UI_03 Verify categories are displayed in the table
    Then At least one category should be displayed in the table
    And Category "Roses" should be visible in the table

  @ui
  Scenario: TC_CAT_UI_04 Verify category levender is displayed in the table
    Then Category "levender" should be visible in the table
    And At least one category should be displayed in the table

  @ui
  Scenario: TC_CAT_UI_05 Verify Search functionality works
    When Admin types "Roses" in the search field
    And Admin clicks the Search button
    Then Category "Roses" should be visible in the table

  @ui
  Scenario: TC_CAT_UI_06 Verify Reset button clears search and shows all categories
    When Admin types "Roses" in the search field
    And Admin clicks the Search button
    And Admin clicks the Reset button
    Then Categories table should be visible
    And At least one category should be displayed in the table

  @ui
  Scenario: TC_CAT_UI_07 Verify search with non-existent name shows no results
    When Admin types "NonExistentXYZ123" in the search field
    And Admin clicks the Search button
    Then No category found message should be displayed

  @ui
  Scenario: TC_CAT_UI_08 Verify Parent dropdown filter is available
    Then Parent dropdown should be visible
    And Parent dropdown should have "All Parents" as default option

  @ui
  Scenario: TC_CAT_UI_09 Verify ID column sorting works
    When Admin clicks the ID column header
    Then Categories table should be visible

  @ui
  Scenario: TC_CAT_UI_10 Verify sidebar navigation links are visible
    Then Sidebar should contain "Dashboard" link
    And Sidebar should contain "Categories" link
    And Sidebar should contain "Plants" link
