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
db.User = require('./models/User')(sequelize, DataTypes);
db.Review = require('./models/Review')(sequelize, DataTypes);
db.Product = require('./models/Product')(sequelize, DataTypes);
db.isLoggedIn = require('./models/isLoggedIn')(sequelize, DataTypes);
db.CartItems = require('./models/CartItem')(sequelize, DataTypes);
db.WeeklySpecial = require('./models/WeeklySpecial')(sequelize, DataTypes);

// Define associations
db.User.hasMany(db.Review, { foreignKey: 'user_id' });
db.Review.belongsTo(db.User, { foreignKey: 'user_id' });

db.Product.hasMany(db.Review, { foreignKey: 'product_id' });
db.Review.belongsTo(db.Product, { foreignKey: 'product_id' });

db.User.hasOne(db.isLoggedIn, { foreignKey: 'user_id' });
db.isLoggedIn.belongsTo(db.User, { foreignKey: 'user_id' });

db.Product.belongsToMany(db.User, { through: db.CartItems, foreignKey: 'product_id' });
db.User.belongsToMany(db.Product, { through: db.CartItems, foreignKey: 'user_id' });

db.Product.hasMany(db.WeeklySpecial, { foreignKey: 'product_id' });
db.WeeklySpecial.belongsTo(db.Product, { foreignKey: 'product_id' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
