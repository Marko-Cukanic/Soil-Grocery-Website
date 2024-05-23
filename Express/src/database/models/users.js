module.exports = (sequelize, DataTypes) =>
    sequelize.define("users", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      weight: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
      },
      height: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
      },
      activityLevel: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        allowNull: true
      },
      dietaryPreferences: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      healthGoals: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    }, {
      timestamps: false
    });
  