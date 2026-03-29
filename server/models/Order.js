// Order.js — Represents a placed order with shipping details
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'placed',  // Order status: placed, shipped, delivered
  },
  total_amount: {
    type: DataTypes.FLOAT,   // Total order value
    allowNull: false,
  },
  // Shipping address fields
  shipping_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shipping_address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  shipping_city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shipping_state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shipping_pincode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shipping_phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'orders',
  timestamps: true,
  underscored: true,
});

module.exports = Order;
