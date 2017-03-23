'use strict';

let createOrder = (order) => {
  order.id = Math.floor(Math.random() * (1000 - 1)) + 1;
  order.isFulfilled = true;
  return order;
};

module.exports = {
  create: createOrder
};
