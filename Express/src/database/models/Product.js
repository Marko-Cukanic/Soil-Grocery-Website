module.exports = (sequelize, DataTypes) =>
    sequelize.define("products", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      specialPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: false
      }
    }, {
      timestamps: false
    });
  