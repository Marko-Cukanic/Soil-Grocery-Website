const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'host',
  dialect: 'mysql'
});

// Import models
const User = require('./user')(sequelize, DataTypes);
const Product = require('./product')(sequelize, DataTypes);
const CartItem = require('./cart_item')(sequelize, DataTypes);
const IsLoggedIn = require('./is_logged_in')(sequelize, DataTypes);
const Review = require('./review')(sequelize, DataTypes);
const WeeklySpecial = require('./weekly_special')(sequelize, DataTypes);

// Set up associations
User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });

Product.hasMany(Review, { foreignKey: 'product_id' });
Review.belongsTo(Product, { foreignKey: 'product_id' });

User.hasOne(IsLoggedIn, { foreignKey: 'user_id' });
IsLoggedIn.belongsTo(User, { foreignKey: 'user_id' });

Product.belongsToMany(User, { through: CartItem, foreignKey: 'product_id' });
User.belongsToMany(Product, { through: CartItem, foreignKey: 'user_id' });

Product.hasMany(WeeklySpecial, { foreignKey: 'product_id' });
WeeklySpecial.belongsTo(Product, { foreignKey: 'product_id' });

// Export models and sequelize instance
module.exports = {
  sequelize,
  User,
  Product,
  CartItem,
  IsLoggedIn,
  Review,
  WeeklySpecial
};
