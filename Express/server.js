const express = require('express');
const { sequelize } = require('./models');

const app = express();
const port = 3000;

// Middleware and routes setup

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`App running on port ${port}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
