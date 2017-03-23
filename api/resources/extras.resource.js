'use strict';

const express = require('express');
const router = express.Router();
const extrasService = require('../services/extras.service');

router.get('/', (req, res) => {
  res.send(extrasService.getExtras());
});

module.exports = router;
