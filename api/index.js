'use strict';

const api = require('./api');
const port = process.argv[2] || process.env.API_PORT || 3000;

api.listen(port);
console.log(`Listening on port ${port}`);
