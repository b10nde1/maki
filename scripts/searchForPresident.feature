Feature: search for president in the country

  Scenario: use google search to find president in the country
    Given user open google search website
    When user type president in the search bar
    And select first suggestion
    Then google search return the right result