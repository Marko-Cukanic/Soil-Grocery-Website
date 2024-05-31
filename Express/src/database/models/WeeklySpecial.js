module.exports = (sequelize, DataTypes) => {
  const WeeklySpecial = sequelize.define('WeeklySpecial', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    originalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    discountedPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  return WeeklySpecial;
};
