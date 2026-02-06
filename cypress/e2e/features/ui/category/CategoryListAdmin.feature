Feature: Deprecated - Category List Admin
  # Deprecated. See CategoryUI.feature

  Scenario: TC_CAT_UI_ADMIN_01 Verify that an Admin can view the Actions column and Add Category button is visible
    Given Admin is on Category List page
    Then Validate "Add Category" button is visible
    When Admin logs out
    And User is logged in with username "testuser" and password "test123"
    And User is on Category List page
    Then Validate "Add Category" button is NOT visible

  Scenario: TC_CAT_UI_ADMIN_02 Verify that Edit action is only visible to admin
    Given Admin is on Category List page
    And At least one category exists in the system
    Then Validate "Edit" action is visible for categories in the list
    When Admin logs out
    And User is logged in with username "testuser" and password "test123"
    And User is on Category List page
    Then Validate "Edit" action is NOT visible for any category in the list

  Scenario: TC_CAT_UI_ADMIN_03 Verify that Delete action is only visible to admin
    Given Admin is on Category List page
    And At least one category exists in the system
    Then Validate "Delete" action is visible for categories in the list
    When Admin logs out
    And User is logged in with username "testuser" and password "test123"
    And User is on Category List page
    Then Validate "Delete" action is NOT visible for any category in the list

  Scenario: TC_CAT_UI_ADMIN_04 Verify that Admin can successfully add new category with valid inputs
    Given Admin is on Category List page
    And Admin is on Add Category page
    When Admin enters category name "Indoor Plants"
    And Admin enters category description "Plants suitable for indoor spaces"
    And Admin clicks Save button
    Then Validate Admin is redirected to Category List page
    And Validate newly added category "Indoor Plants" appears in the list

  Scenario: TC_CAT_UI_ADMIN_05 Verify that the Admin is redirected to Category List page when clicking Cancel button
    Given Admin is on Category List page
    And Admin is on Add Category page
    When Admin clicks Cancel button
    Then Validate Admin is redirected to Category List page

  Scenario: TC_CAT_UI_ADMIN_06 Verify that Admin can successfully edit an existing category
    Given Admin is on Category List page
    And Category "Flowering Plants" exists in the system
    When Admin clicks Edit action for category "Flowering Plants"
    And Admin updates category name to "Blooming Flowers"
    And Admin updates category description to "Beautiful flowering plants"
    And Admin clicks Save button
    Then Validate Admin is redirected to Category List page
    And Validate category name is updated to "Blooming Flowers" in the list

  Scenario: TC_CAT_UI_ADMIN_07 Verify that Admin cannot delete category with associated plants
    Given Admin is on Category List page
    And Category "Herbs" has plants associated with it
    When Admin clicks Delete action for category "Herbs"
    And Admin confirms deletion in the dialog
    Then Validate error message is displayed
    And Validate category "Herbs" still exists in the list

  Scenario: TC_CAT_UI_ADMIN_08 Verify that Admin can successfully delete empty category
    Given Admin is on Category List page
    And Category "Test Category" exists with no plants
    When Admin clicks Delete action for category "Test Category"
    And Admin confirms deletion in the dialog
    Then Validate category "Test Category" is removed from the list
