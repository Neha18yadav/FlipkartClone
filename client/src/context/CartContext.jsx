import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCart as fetchCartApi, addToCart as addToCartApi, updateCartItem as updateCartItemApi, removeFromCart as removeFromCartApi } from '../services/api';
import { useAuth } from './AuthContext';

// Create the context
const CartContext = createContext();

// Custom hook — any component can call useCart() to get cart data
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Provider component — wraps the entire app
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Fetch cart details from backend
  const refreshCart = useCallback(async () => {
    if (!user) {
      setCartItems([]);
      setCartCount(0);
      setCartTotal(0);
      return;
    }

    setLoading(true);
    try {
      const data = await fetchCartApi();
      setCartItems(Array.isArray(data.items) ? data.items : []);
      setCartCount(typeof data.totalItems === 'number' ? data.totalItems : 0);
      setCartTotal(typeof data.totalAmount === 'number' ? data.totalAmount : 0);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems([]);
      setCartCount(0);
      setCartTotal(0);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Load cart count when user changes
  useEffect(() => {
    refreshCart();
  }, [user, refreshCart]);

  // Add a product to cart
  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }
    try {
      await addToCartApi(productId, quantity);
      await refreshCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  // Update item quantity
  const updateQuantity = async (itemId, quantity) => {
    try {
      await updateCartItemApi(itemId, quantity);
      await refreshCart();
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      await removeFromCartApi(itemId);
      await refreshCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      cartCount, 
      cartTotal, 
      loading, 
      refreshCart, 
      addToCart, 
      updateQuantity, 
      removeFromCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};
