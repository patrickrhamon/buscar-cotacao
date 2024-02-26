const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  `${process.env.DB_BASE}`,
  `${process.env.DB_USER}`,
  `${process.env.DB_PASS}`,
  {
    host: `${process.env.DB_HOST}`,
    port: process.env.DB_PORT ? `${process.env.DB_PORT}` : 5432,
    dialect: 'postgres',
  }
);

module.exports = sequelize;
