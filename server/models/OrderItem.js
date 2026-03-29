// OrderItem.js — Each product in an order (captures price at time of purchase)
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_id: {
    type: DataTypes.INTEGER,  // Foreign key to orders table
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,  // Foreign key to products table
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price_at_purchase: {
    type: DataTypes.FLOAT,    // Price when the order was placed (products can change price later)
    allowNull: false,
  },
}, {
  tableName: 'order_items',
  timestamps: false,
  underscored: true,
});

module.exports = OrderItem;
