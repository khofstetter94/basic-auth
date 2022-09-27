'use strict';

const { Sequelize } = require('sequelize');
const getUsersModel = require('./users-model');

const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite::memory'
  : process.env.DATABASE_URL;

let options = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: true,
    rejectUnauthorized: false,
  },
} : {};

// instantiate database
const sequelizeDatabase = new Sequelize(DATABASE_URL, options);

const UsersModel = getUsersModel(sequelizeDatabase);

module.exports = {
  sequelizeDatabase,
  UsersModel,
};
