const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Ou config/db si vous utilisez MySQL

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "student",
  },
});

module.exports = User;