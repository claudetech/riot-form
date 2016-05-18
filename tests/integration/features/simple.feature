Feature: Simple Feature

  Background:
    Given I visit the simple test page

  Scenario: I view the page
    Then I should see username "Daniel"
    And I should see profile "My name is Daniel"

  Scenario: I enter information
    When I enter username "Bob"
    And I enter profile "I like to fish"
    Then I should see username "Bob"
    And I should see profile "I like to fish"
    When I press reset button
    Then I should see empty form
