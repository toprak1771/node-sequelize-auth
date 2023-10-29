const  Sequelize  = require('sequelize');

const sequelize = new Sequelize('node-sequelize-auth', 'root', 'toprak1735.', {
    host: 'localhost',
    dialect: 'mysql'
  });

  module.exports = sequelize;