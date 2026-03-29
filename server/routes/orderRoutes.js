// orderRoutes.js — API routes for orders
const express = require('express');
const router = express.Router();
const { placeOrder, getOrder, getUserOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// All order routes are protected
router.use(protect);

// POST /api/orders      → Place a new order
// GET  /api/orders      → Get order history
// GET  /api/orders/:id  → Get order details
router.post('/', placeOrder);
router.get('/', getUserOrders);
router.get('/:id', getOrder);

module.exports = router;
