Feature: Order a coffee
  As a coffee addict
  I want to place an order for a coffee
  So that I can guzzle it

  Scenario: Reasonable coffee request
    Given An order name of Adam
    And I request a Pour Over
    And I request Light roast
    And I request Cinnamon extra
    When The order is placed
    Then The order should be fulfilled
    And It should be a Light roast Pour Over with Cinnamon for Adam
    And I should have a coffee stain on my shirt
