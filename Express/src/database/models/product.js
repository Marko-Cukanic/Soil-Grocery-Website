module.exports = (sequelize, DataTypes) =>
    sequelize.define("product", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      timestamps: false
    });
  