const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql' // Specify your dialect here
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./models/user')(sequelize, DataTypes);
// Import other models similarly

// Set up associations
db.User.hasMany(db.Review, { foreignKey: 'user_id' });
db.Review.belongsTo(db.User, { foreignKey: 'user_id' });

db.Product.hasMany(db.Review, { foreignKey: 'product_id' });
db.Review.belongsTo(db.Product, { foreignKey: 'product_id' });

db.User.hasOne(db.IsLoggedIn, { foreignKey: 'user_id' });
db.IsLoggedIn.belongsTo(db.User, { foreignKey: 'user_id' });

db.Product.belongsToMany(db.User, { through: db.CartItem, foreignKey: 'product_id' });
db.User.belongsToMany(db.Product, { through: db.CartItem, foreignKey: 'user_id' });

db.Product.hasMany(db.WeeklySpecial, { foreignKey: 'product_id' });
db.WeeklySpecial.belongsTo(db.Product, { foreignKey: 'product_id' });

module.exports = db;
