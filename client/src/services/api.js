const API_BASE = 'http://localhost:5001/api';

// Helper: Get the JWT token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('flipkart_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// ============================================================
// PRODUCT APIs
// ============================================================

// Get all products (with optional search and category filter)
export const getProducts = async (search = '', category = '') => {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (category) params.append('category', category);

  const response = await fetch(`${API_BASE}/products?${params}`);
  return response.json();
};

// Get a single product by ID (includes images and category)
export const getProduct = async (id) => {
  const response = await fetch(`${API_BASE}/products/${id}`);
  return response.json();
};

// Get all categories
export const getCategories = async () => {
  const response = await fetch(`${API_BASE}/categories`);
  return response.json();
};

// ============================================================
// CART APIs
// ============================================================

// Get cart with all items and totals
export const getCart = async () => {
  const response = await fetch(`${API_BASE}/cart`, {
    headers: { ...getAuthHeader() },
  });
  return response.json();
};

// Add a product to cart
export const addToCart = async (productId, quantity = 1) => {
  const response = await fetch(`${API_BASE}/cart/add`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      ...getAuthHeader() 
    },
    body: JSON.stringify({ product_id: productId, quantity }),
  });
  return response.json();
};

// Update cart item quantity
export const updateCartItem = async (itemId, quantity) => {
  const response = await fetch(`${API_BASE}/cart/update/${itemId}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      ...getAuthHeader() 
    },
    body: JSON.stringify({ quantity }),
  });
  return response.json();
};

// Remove item from cart
export const removeFromCart = async (itemId) => {
  const response = await fetch(`${API_BASE}/cart/remove/${itemId}`, {
    method: 'DELETE',
    headers: { ...getAuthHeader() },
  });
  return response.json();
};

// ============================================================
// ORDER APIs
// ============================================================

// Place a new order with shipping details
export const placeOrder = async (shippingDetails) => {
  const response = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      ...getAuthHeader() 
    },
    body: JSON.stringify(shippingDetails),
  });
  return response.json();
};

// Get order details by ID
export const getOrder = async (id) => {
  const response = await fetch(`${API_BASE}/orders/${id}`, {
    headers: { ...getAuthHeader() },
  });
  return response.json();
};

// Get all orders for the current user
export const getUserOrders = async () => {
  const response = await fetch(`${API_BASE}/orders`, {
    headers: { ...getAuthHeader() },
  });
  return response.json();
};

// ============================================================
// WISHLIST APIs
// ============================================================

// Get user's wishlist
export const getWishlist = async () => {
  const response = await fetch(`${API_BASE}/wishlist`, {
    headers: { ...getAuthHeader() },
  });
  return response.json();
};

// Toggle product in wishlist
export const toggleWishlist = async (productId) => {
  const response = await fetch(`${API_BASE}/wishlist/toggle`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      ...getAuthHeader() 
    },
    body: JSON.stringify({ product_id: productId }),
  });
  return response.json();
};
