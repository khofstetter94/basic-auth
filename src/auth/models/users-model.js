'use strict';

require('dotenv').config();
const { DataTypes } = require('sequelize');

const getUserModel = (sequelizeDatabase) => {
  const UsersModel = sequelizeDatabase.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  UsersModel.beforeCreate((user) => {
    console.log('our user', user);
  });

  return UsersModel;
};

module.exports = getUserModel;
