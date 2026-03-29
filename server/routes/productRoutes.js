// productRoutes.js — API routes for products and categories
const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, getAllCategories } = require('../controllers/productController');

// GET /api/products         → Get all products (with optional ?search= and ?category= filters)
// GET /api/products/:id     → Get a single product by ID
// GET /api/categories       → Get all categories
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.get('/categories', getAllCategories);

module.exports = router;
