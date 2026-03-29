// productController.js — Handles all product-related API requests

const { Product, Category, ProductImage } = require('../models');
const { Op } = require('sequelize');

// GET /api/products — Get all products with optional search and category filter
const getAllProducts = async (req, res) => {
  try {
    // Extract query parameters for filtering
    const { search, category } = req.query;

    // Build filter conditions dynamically
    const whereClause = {};

    // If search query provided, filter by product name (case-insensitive)
    if (search) {
      whereClause.name = { [Op.iLike]: `%${search}%` };
    }

    // If category ID provided, filter by category
    if (category) {
      whereClause.category_id = category;
    }

    // Fetch products with their category and first image
    const products = await Product.findAll({
      where: whereClause,
      include: [
        { model: Category, attributes: ['id', 'name'] },
        { model: ProductImage, as: 'images', attributes: ['image_url', 'display_order'], order: [['display_order', 'ASC']] },
      ],
      order: [['created_at', 'DESC']], // Newest products first
    });

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// GET /api/products/:id — Get a single product with all details
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Category, attributes: ['id', 'name'] },
        { model: ProductImage, as: 'images', attributes: ['image_url', 'display_order'], order: [['display_order', 'ASC']] },
      ],
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// GET /api/categories — Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [['name', 'ASC']], // Alphabetical order
    });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

module.exports = { getAllProducts, getProductById, getAllCategories };
