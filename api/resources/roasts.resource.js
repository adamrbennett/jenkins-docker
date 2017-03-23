'use strict';

const express = require('express');
const router = express.Router();
const roastsService = require('../services/roasts.service');

router.get('/', (req, res) => {
  res.send(roastsService.getRoasts());
});

module.exports = router;
