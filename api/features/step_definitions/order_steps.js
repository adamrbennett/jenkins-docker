const orderService = require('../../services/order.service');
const assert = require('chai').assert;
const {defineSupportCode} = require('cucumber');

let order = {};

defineSupportCode(({Before, Given, When, Then}) => {
  Given('An order name of {string}', (name) => {
    order.name = name;
  });

  Given('I request a {string}', (brewType) => {
    order.type = brewType;
  });

  Given('I request {string} roast', (roastType) => {
    order.roast = roastType;
  });

  Given('I request {string} extra', (extraType) => {
    order.extras = [extraType];
  });

  When('The order is placed', () => {
    order = orderService.create(order);
  });

  Then('The order should be fulfilled', () => {
    assert(order.isFulfilled, 'Order was not fulfilled');
    assert.isOk(order.id, 'Missing order id');
    assert(!isNaN(order.id), 'Invalid order id');
  });

  Then('It should be a {string} roast {string} with {string} for {string}', (roastType, brewType, extraType, name) => {
    assert.equal(order.roast, roastType, 'Incorrect roast');
    assert.equal(order.type, brewType, 'Incorrect brew type');
    assert.deepEqual(order.extras, [extraType], 'Incorrect extras');
    assert.equal(order.name, name, 'Incorrect name');
  });

  Then('I should have a coffee stain on my shirt', () => {
    let shirt = {
      isStained: true
    };
    assert(shirt.isStained, 'Suspicious');
  });
});
