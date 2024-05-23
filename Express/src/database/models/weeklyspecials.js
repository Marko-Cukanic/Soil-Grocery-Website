module.exports = (sequelize, DataTypes) =>
    sequelize.define("weekly_special", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      discounted_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
      }
    }, {
      timestamps: false
    });
  