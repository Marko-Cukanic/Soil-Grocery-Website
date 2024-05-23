module.exports = (sequelize, DataTypes) =>
    sequelize.define("is_logged_in", {
      user_id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true
      },
      is_logged_in: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 0
      }
    }, {
      timestamps: false
    });
  