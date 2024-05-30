module.exports = (sequelize, DataTypes) => {
  const weekly_specials = sequelize.define('weekly_specials', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    discounted_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    }
  });

  return weekly_specials;
};
