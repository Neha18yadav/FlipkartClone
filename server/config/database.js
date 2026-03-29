// database.js — Sets up the connection to PostgreSQL using Sequelize ORM
const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Create a new Sequelize instance to connect to our PostgreSQL database
const sequelize = new Sequelize(
  process.env.DB_NAME,     // Database name: flipkart_clone
  process.env.DB_USER,     // Your Mac username
  process.env.DB_PASSWORD, // Password (empty for local dev)
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false, // Set to console.log to see SQL queries during debugging
  }
);

module.exports = sequelize;
