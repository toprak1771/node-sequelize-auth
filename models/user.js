const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
  },
  surname: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mail: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = User;
