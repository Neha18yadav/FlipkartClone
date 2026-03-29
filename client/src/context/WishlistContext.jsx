import { createContext, useContext, useState, useEffect } from 'react';
import { getWishlist, toggleWishlist as toggleWishlistApi } from '../services/api';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchWishlist = async () => {
    if (!user) {
      setWishlist([]);
      return;
    }
    setLoading(true);
    try {
      const data = await getWishlist();
      // DEFENSIVE: Ensure data is an array before setting state
      setWishlist(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setWishlist([]); // Reset to empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const toggleWishlist = async (productId) => {
    if (!user) {
      alert('Please login to add items to wishlist');
      return;
    }
    try {
      const response = await toggleWishlistApi(productId);
      // Refresh wishlist after toggle
      await fetchWishlist();
      return response.isFavorite;
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      throw error;
    }
  };

  const isInWishlist = (productId) => {
    // SAFE CHECK: Ensure wishlist is an array
    if (!Array.isArray(wishlist)) return false;
    return wishlist.some(item => item.product_id === productId || item.Product?.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, loading, toggleWishlist, isInWishlist, fetchWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
