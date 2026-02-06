Feature: Deprecated - Category Diagnostic
  # Deprecated. See CategoryUI.feature
    
  Scenario: Check if login works
    Given I can login as admin successfully
    
  Scenario: Check if categories page exists
    Given I can login as admin successfully
    When I visit categories page directly
    Then I should see categories page content
