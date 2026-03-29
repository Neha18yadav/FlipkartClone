// Cart.js — Represents a user's shopping cart
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,  // We use user_id = 1 as the default user (no auth)
    allowNull: false,
    defaultValue: 1,
  },
}, {
  tableName: 'carts',
  timestamps: true,
  underscored: true,
});

module.exports = Cart;
