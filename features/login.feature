@ui @smoke
Feature: Customer authentication
  As a customer
  I want clear and secure sign-in behaviour
  So that I can access a protected account area

  Background:
    Given the customer opens the login page

  Scenario Outline: Customer login attempts
    When the customer signs in with username "<username>" and password "<password>"
    Then <expected_result>

    Examples:
      | username      | password              | expected_result                               |
      | tomsmith      | SuperSecretPassword! | the secure account area should be displayed   |
      | invalid_user  | wrong_password        | an invalid username error should be displayed |
      | tomsmith      | wrong_password        | a password error should be displayed         |

  Scenario: Customer signs out from the secure area
    When the customer signs in with username "tomsmith" and password "SuperSecretPassword!"
    Then the secure account area should be displayed
    When the customer logs out
    Then the customer should be redirected to the login page
