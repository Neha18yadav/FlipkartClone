// database.js — Sets up the connection to PostgreSQL using Sequelize ORM
const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Create a new Sequelize instance to connect to our PostgreSQL database
let sequelize;

if (process.env.DATABASE_URL) {
  // Use unified connection string for production (Render/Neon)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  // Use individual components for local development
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'postgres',
      logging: false,
    }
  );
}

module.exports = sequelize;
