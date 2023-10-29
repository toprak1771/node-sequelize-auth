const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const UserPoolRole = sequelize.define("user-pool-role", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
});

module.exports = UserPoolRole;