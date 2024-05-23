module.exports = (sequelize, DataTypes) =>
    sequelize.define("cart_item", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    }, {
      timestamps: false
    });
  