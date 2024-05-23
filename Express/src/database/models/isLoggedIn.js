module.exports = (sequelize, DataTypes) => {
  const isLoggedIn = sequelize.define('isLoggedIn', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    is_logged_in: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return isLoggedIn;
};
