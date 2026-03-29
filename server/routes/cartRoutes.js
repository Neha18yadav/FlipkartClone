// cartRoutes.js — API routes for shopping cart
const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeFromCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

// All cart routes are protected
router.use(protect);

// GET    /api/cart                → Get cart with all items
// POST   /api/cart/add            → Add product to cart
// PUT    /api/cart/update/:itemId → Update item quantity
// DELETE /api/cart/remove/:itemId → Remove item from cart
router.get('/', getCart);
router.post('/add', addToCart);
router.put('/update/:itemId', updateCartItem);
router.delete('/remove/:itemId', removeFromCart);

module.exports = router;
