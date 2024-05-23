const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = {};

// Import models
db.User = require('./models/user')(sequelize, DataTypes);
db.Review = require('./models/review')(sequelize, DataTypes);
db.Product = require('./models/product')(sequelize, DataTypes);
db.IsLoggedIn = require('./models/isLoggedIn')(sequelize, DataTypes);
db.CartItem = require('./models/cartItem')(sequelize, DataTypes);
db.WeeklySpecial = require('./models/weeklySpecial')(sequelize, DataTypes);



db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;