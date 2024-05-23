module.exports = (sequelize, DataTypes) =>
    sequelize.define("review", {
      id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      product_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      text: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      stars: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      }
    }, {
      timestamps: false
    });
  