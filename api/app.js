'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const extras = require('./resources/extras.resource');
const roasts = require('./resources/roasts.resource');
const orders = require('./resources/order.resource');

// enable cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.use('/roasts', roasts);
app.use('/extras', extras);
app.use('/orders', orders);

module.exports = app;
