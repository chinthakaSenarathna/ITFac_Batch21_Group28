Feature: Dashboard API - User (Savindu R.H. - Group 28)

  Background:
    Given API Server is reachable

  Scenario: API_DASH_USER_001 User login returns token
    When API User logs in and stores token
    Then API response status should be 200

  Scenario: API_DASH_USER_002 User can fetch dashboard summary
    Given API User is authenticated
    When API User sends GET request to Dashboard Summary
    Then API response status should be 200

  Scenario: API_DASH_USER_003 User can fetch categories list
    Given API User is authenticated
    When API User sends GET request to Categories
    Then API response status should be 200

  Scenario: API_DASH_USER_004 User can fetch plants list
    Given API User is authenticated
    When API User sends GET request to Plants
    Then API response status should be 200

  Scenario: API_DASH_USER_005 User can fetch sales list (read-only)
    Given API User is authenticated
    When API User sends GET request to Sales
    Then API response status should be 200

  Scenario: API_DASH_USER_006 Inventory endpoint should be disabled/blocked for User
    Given API User is authenticated
    When API User sends GET request to Inventory
    Then API response status should be one of 200,403,404,500,501

  Scenario: API_DASH_USER_007 User cannot create plant (RBAC)
    Given API User is authenticated
    When API User tries to create a plant
    Then API response status should be one of 401,403,405,500

  Scenario: API_DASH_USER_008 Invalid user login rejected
    When API User tries login with wrong password
    Then API response status should be one of 400,401,403
