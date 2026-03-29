// CartPage.jsx — Shopping cart page
// Shows all cart items with quantity controls and price summary

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, updateCartItem, removeFromCart } from '../services/api';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { refreshCart } = useCart();

  // Format price in INR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Fetch cart data
  const fetchCartData = async () => {
    try {
      const data = await getCart();
      setCartData(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  // Handle quantity update
  const handleUpdateQuantity = async (itemId, newQuantity) => {
    await updateCartItem(itemId, newQuantity);
    await fetchCartData();    // Refresh cart data
    await refreshCart();      // Update header badge
  };

  // Handle item removal
  const handleRemove = async (itemId) => {
    await removeFromCart(itemId);
    await fetchCartData();
    await refreshCart();
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading cart...</p>
      </div>
    );
  }

  // Empty cart state
  if (!cartData || cartData.items.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-content">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#e0e0e0" strokeWidth="1">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <h2>Your cart is empty!</h2>
          <p>Add items to it now.</p>
          <button className="btn-shop-now" onClick={() => navigate('/')}>
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* Left: Cart Items */}
        <div className="cart-items-section">
          <div className="cart-header-bar">
            <h2>My Cart ({cartData.totalItems})</h2>
          </div>

          {/* List of cart items */}
          <div className="cart-items-list">
            {cartData.items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemove}
              />
            ))}
          </div>

          {/* Place Order Button (bottom of items) */}
          <div className="cart-place-order">
            <button
              className="btn-place-order"
              onClick={() => navigate('/checkout')}
              id="place-order-btn"
            >
              PLACE ORDER
            </button>
          </div>
        </div>

        {/* Right: Price Summary */}
        <div className="cart-summary-section">
          <div className="price-summary">
            <h3 className="summary-title">PRICE DETAILS</h3>
            <div className="summary-divider"></div>

            <div className="summary-row">
              <span>Price ({cartData.totalItems} items)</span>
              <span>{formatPrice(cartData.totalOriginalPrice)}</span>
            </div>

            <div className="summary-row discount">
              <span>Discount</span>
              <span className="discount-amount">− {formatPrice(cartData.totalDiscount)}</span>
            </div>

            <div className="summary-row">
              <span>Delivery Charges</span>
              <span className="free-delivery">FREE</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total">
              <span>Total Amount</span>
              <span>{formatPrice(cartData.totalPrice)}</span>
            </div>

            <div className="summary-divider"></div>

            <p className="summary-savings">
              You will save {formatPrice(cartData.totalDiscount)} on this order
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
