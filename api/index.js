'use strict';

const app = require('./app');
const port = process.argv[2] || process.env.APP_PORT || 3000;

app.listen(port);
console.log(`Listening on port ${port}`);
