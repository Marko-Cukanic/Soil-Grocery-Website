// models/follow.js
module.exports = (sequelize, DataTypes) => {
    const Follow = sequelize.define('Follow', {
      follower_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      following_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  
    return Follow;
  };
  