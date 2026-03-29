// index.js — Defines how all models relate to each other
// This is the central place for database relationships

const Category = require('./Category');
const Product = require('./Product');
const ProductImage = require('./ProductImage');
const Cart = require('./Cart');
const CartItem = require('./CartItem');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const User = require('./User');
const Wishlist = require('./Wishlist');

// --- Category ↔ Product ---
// A category has many products, a product belongs to one category
Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

// --- Product ↔ ProductImage ---
// A product has many images (for the image carousel)
Product.hasMany(ProductImage, { foreignKey: 'product_id', as: 'images' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id' });

// --- Cart ↔ CartItem ---
// A cart has many cart items
Cart.hasMany(CartItem, { foreignKey: 'cart_id', as: 'items' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });

// --- CartItem ↔ Product ---
// Each cart item references a product
CartItem.belongsTo(Product, { foreignKey: 'product_id' });
Product.hasMany(CartItem, { foreignKey: 'product_id' });

// --- Order ↔ OrderItem ---
// An order has many order items
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

// --- OrderItem ↔ Product ---
// Each order item references a product
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

// --- User ↔ Order ---
// A user has many orders
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

// --- User ↔ Wishlist ---
// A user has many products in their wishlist
User.belongsToMany(Product, { through: Wishlist, foreignKey: 'user_id', as: 'wishlist_products' });
Product.belongsToMany(User, { through: Wishlist, foreignKey: 'product_id', as: 'favorited_by' });

// Also define direct associations for the Wishlist model itself
Wishlist.belongsTo(Product, { foreignKey: 'product_id' });
Product.hasMany(Wishlist, { foreignKey: 'product_id' });
Wishlist.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Wishlist, { foreignKey: 'user_id' });

module.exports = {
  Category,
  Product,
  ProductImage,
  Cart,
  CartItem,
  Order,
  OrderItem,
  User,
  Wishlist,
};
