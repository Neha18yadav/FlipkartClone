// ProductImage.js — Stores multiple images for each product (used in image carousel)
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductImage = sequelize.define('ProductImage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_id: {
    type: DataTypes.INTEGER,  // Foreign key to products table
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,   // URL of the product image
    allowNull: false,
  },
  display_order: {
    type: DataTypes.INTEGER,  // Order in which images appear (1st, 2nd, etc.)
    allowNull: false,
    defaultValue: 1,
  },
}, {
  tableName: 'product_images',
  timestamps: false,          // No need for timestamps on images
  underscored: true,
});

module.exports = ProductImage;
