Feature: open Website

  Scenario: google search website load correctly
    Given user use ~browserInterface~ to ~startBrowser~
    When use ~browserInterface~ to ~verifyTitle~ is 'Google'
    Then use ~browserInterface~ to ~closeBrowser~