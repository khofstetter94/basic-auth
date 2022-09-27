'use strict';

// 3rd party requirements
const express = require('express');
const { sequelizeDatabase } = require('./auth/models');
const router = require('./auth/router');

const app = express();
const PORT = process.env.PORT || 3002;

// Allow us to access request body json
app.use(express.json());

// Process FORM input and add to request body
app.use(express.urlencoded({ extended: true }));

app.use(router);

// export app for testing, start ability to run app, and our db with ORM
module.exports = {
  server: app,
  start: () => app.listen(PORT, console.log('server running on', PORT)),
  sequelizeDatabase,
};
