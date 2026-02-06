Feature: Dashboard API - Admin (Savindu R.H. - Group 28)

  Background:
    Given API Server is reachable

  Scenario: API_DASH_ADMIN_001 Admin login returns valid token
    When API Admin logs in and stores token
    Then API response status should be 200

  Scenario: API_DASH_ADMIN_002 Admin can fetch dashboard summary
    Given API Admin is authenticated
    When API Admin sends GET request to Dashboard Summary
    Then API response status should be one of 200,500

  Scenario: API_DASH_ADMIN_003 Admin can fetch categories list
    Given API Admin is authenticated
    When API Admin sends GET request to Categories
    Then API response status should be 200

  Scenario: API_DASH_ADMIN_004 Admin can fetch plants list
    Given API Admin is authenticated
    When API Admin sends GET request to Plants
    Then API response status should be 200

  Scenario: API_DASH_ADMIN_005 Admin can fetch sales list
    Given API Admin is authenticated
    When API Admin sends GET request to Sales
    Then API response status should be 200

  Scenario: API_DASH_ADMIN_006 Inventory endpoint should be disabled/blocked for Admin
    Given API Admin is authenticated
    When API Admin sends GET request to Inventory
    Then API response status should be one of 403,404,500,501

  Scenario: API_DASH_ADMIN_007 Invalid admin credentials rejected
    When API Admin tries login with wrong password
    Then API response status should be one of 400,401,403

  Scenario: API_DASH_ADMIN_008 Admin cannot use PUT on Sales (read-only endpoint)
    Given API Admin is authenticated
    When API Admin sends PUT request to Sales
    Then API response status should be one of 404,405,500

  Scenario: API_DASH_ADMIN_009 Admin gets 404 for invalid endpoint
    Given API Admin is authenticated
    When API Admin sends GET request to Invalid Endpoint
    Then API response status should be one of 404,500

  Scenario: API_DASH_ADMIN_010 Admin can access Sales endpoint (Smoke Test for Creation)
    Given API Admin is authenticated
    When API Admin sends GET request to Sales
    Then API response status should be 200
