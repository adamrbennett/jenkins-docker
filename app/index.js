'use strict';

const express = require('express');
const app = express();

app.use(express.static('.'));

const port = process.argv[2] || process.env.APP_PORT || 3000;

app.listen(port);
console.log(`Listening on port ${port}`);
