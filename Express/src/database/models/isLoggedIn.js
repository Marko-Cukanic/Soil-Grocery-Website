module.exports = (sequelize, DataTypes) => {
  const IsLoggedIn = sequelize.define("IsLoggedIn", {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Users', // 'Users' refers to table name
        key: 'id'
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
