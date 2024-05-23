module.exports = (sequelize, DataTypes) => {
  const IsLoggedIn = sequelize.define('IsLoggedIn', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    is_logged_in: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return IsLoggedIn;
};
