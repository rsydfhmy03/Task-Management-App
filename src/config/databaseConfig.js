/**
 * Database Configuration Module
 *
 * Sets up the connection to the Cloud SQL MySQL database using Sequelize.
 *
 * @module config/dbConfig
 */

const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,           // Nama database
  process.env.DB_USER,           // User database
  process.env.DB_PASSWORD,       // Password database
  {
    host: process.env.DB_HOST,   // IP publik instance Cloud SQL
    dialect: process.env.DB_DIALECT || 'mysql',  // Dialek database (MySQL)
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
  }
);

module.exports = sequelize;
