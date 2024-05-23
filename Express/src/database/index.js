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
db.users = require('./models/users')(sequelize, DataTypes);
db.reviews = require('./models/reviews')(sequelize, DataTypes);
db.products = require('./models/products')(sequelize, DataTypes);
db.isLoggedIn = require('./models/isLoggedIn')(sequelize, DataTypes);
db.cart_items = require('./models/cart_items')(sequelize, DataTypes);
db.weekly_specials = require('./models/weekly_specials')(sequelize, DataTypes);

db.users.hasMany(db.reviews, { foreignKey: 'user_id' });
db.reviews.belongsTo(db.users, { foreignKey: 'user_id' });

db.products.hasMany(db.reviews, { foreignKey: 'product_id' });
db.reviews.belongsTo(db.products, { foreignKey: 'product_id' });

db.users.hasOne(db.isLoggedIn, { foreignKey: 'user_id' });
db.isLoggedIn.belongsTo(db.users, { foreignKey: 'user_id' });

db.products.belongsToMany(db.users, { through: db.cart_items, foreignKey: 'product_id' });
db.users.belongsToMany(db.products, { through: db.cart_items, foreignKey: 'user_id' });

db.products.hasMany(db.weekly_specials, { foreignKey: 'product_id' });
db.weekly_specials.belongsTo(db.products, { foreignKey: 'product_id' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;