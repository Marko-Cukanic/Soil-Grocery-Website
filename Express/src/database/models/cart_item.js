module.exports = (sequelize, DataTypes) =>
    sequelize.define("cart_item", {
      id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
      },
      product_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      quantity: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      }
    }, {
      timestamps: false
    });
  