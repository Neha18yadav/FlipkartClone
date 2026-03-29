// server.js — Main entry point for the backend
// Starts Express server, connects to database, and mounts all API routes

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');

// Import route files
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');

// Initialize Express app
const app = express();

// ---- Middleware ----
app.use(cors({
  origin: true, // For development, allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());      // Parse JSON request bodies

// ---- API Routes ----
app.use('/api', productRoutes);       
app.use('/api/auth', authRoutes);     
app.use('/api/cart', cartRoutes);     
app.use('/api/orders', orderRoutes);  
app.use('/api/wishlist', wishlistRoutes);

// ---- Health Check ----
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Flipkart Clone API is running' });
});

// ---- Start Server ----
const PORT = process.env.PORT || 5000;

// Connect to database, then start listening
sequelize.sync() // Creates tables if they don't exist (won't drop existing data)
  .then(() => {
    console.log('✅ Database connected and synced');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Failed to connect to database:', error);
  });
