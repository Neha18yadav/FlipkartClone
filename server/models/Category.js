// Category.js — Represents product categories (e.g., Electronics, Fashion)
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  image_url: {
    type: DataTypes.STRING, // URL of the category icon/image
    allowNull: true,
  },
}, {
  tableName: 'categories',
  timestamps: true,         // Adds createdAt and updatedAt columns
  underscored: true,        // Uses snake_case for column names
});

module.exports = Category;
