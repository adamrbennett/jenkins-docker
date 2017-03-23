'use strict';

const express = require('express');
const router = express.Router();
const orderService = require('../services/order.service');

router.post('/', (req, res) => {
  let order = orderService.create(req.body);
  res.send(order);
});

module.exports = router;
