@ui
Feature: Customer authentication
  As a customer
  I want clear sign-in feedback
  So that I know whether I can access my account

  Background:
    Given the customer opens the login page

  @smoke
  Scenario: Customer signs in successfully
    When the customer signs in with valid credentials
    Then the secure account area should be displayed

  Scenario Outline: Invalid login attempts show the correct message
    When the customer signs in with username "<username>" and password "<password>"
    Then <expected_result>

    Examples:
      | username     | password       | expected_result                               |
      | invalid_user | wrong_password | an invalid username error should be displayed |
      | tomsmith     | wrong_password | a password error should be displayed          |

  @smoke
  Scenario: Customer signs out from the secure area
    When the customer signs in with valid credentials
    Then the secure account area should be displayed
    When the customer logs out
    Then the customer should be redirected to the login page
