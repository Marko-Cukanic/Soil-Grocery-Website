module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define("CartItems", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });

  CartItem.associate = function(models) {
    CartItem.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    CartItem.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  };

  return CartItem;
};
