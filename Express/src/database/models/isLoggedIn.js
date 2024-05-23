module.exports = (sequelize, DataTypes) =>
    sequelize.define("is_logged_in", {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      is_logged_in: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      }
    },
    loggedIn: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    timestamps: false
  });

  return IsLoggedIn;
};
