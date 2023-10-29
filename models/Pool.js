const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const Pool = sequelize.define("pool", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name:{
        type:Sequelize.STRING,
    },
    description:{
        type:Sequelize.STRING,
    },
});

module.exports = Pool;