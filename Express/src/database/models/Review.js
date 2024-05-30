module.exports = (sequelize, DataTypes) =>
    sequelize.define("reviews", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      text: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      stars: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      timestamps: false
    });
  