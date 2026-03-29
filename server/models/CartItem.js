// CartItem.js — Each item in a user's cart (links a product to a cart with quantity)
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CartItem = sequelize.define('CartItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cart_id: {
    type: DataTypes.INTEGER,  // Foreign key to carts table
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,  // Foreign key to products table
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,  // How many of this product
    allowNull: false,
    defaultValue: 1,
  },
}, {
  tableName: 'cart_items',
  timestamps: false,
  underscored: true,
});

module.exports = CartItem;
