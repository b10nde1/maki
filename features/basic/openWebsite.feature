Feature: open Website

  Scenario: google search website load correctly
    Given user open google search website
    When user veriry google search UI
    Then google logo is present