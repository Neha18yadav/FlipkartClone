// Product.js — Represents a product in the store
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,     // Long product description
    allowNull: true,
  },
  specifications: {
    type: DataTypes.TEXT,     // Stored as JSON string (e.g., '{"RAM":"8GB","Storage":"128GB"}')
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,   // Current selling price
    allowNull: false,
  },
  original_price: {
    type: DataTypes.FLOAT,   // MRP / original price (shown crossed out)
    allowNull: true,
  },
  discount_percent: {
    type: DataTypes.INTEGER,  // e.g., 25 means 25% off
    allowNull: true,
    defaultValue: 0,
  },
  stock: {
    type: DataTypes.INTEGER,  // Number of items available
    allowNull: false,
    defaultValue: 0,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rating: {
    type: DataTypes.FLOAT,    // Average rating out of 5
    allowNull: true,
    defaultValue: 0,
  },
  review_count: {
    type: DataTypes.INTEGER,  // Total number of reviews
    allowNull: true,
    defaultValue: 0,
  },
  category_id: {
    type: DataTypes.INTEGER,  // Foreign key to categories table
    allowNull: false,
  },
}, {
  tableName: 'products',
  timestamps: true,
  underscored: true,
});

module.exports = Product;
