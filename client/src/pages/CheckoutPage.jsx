// CheckoutPage.jsx — Shipping address form + order summary
// User fills in address details and confirms the order

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, placeOrder } from '../services/api';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { refreshCart } = useCart();
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');

  // Form state for shipping details
  const [form, setForm] = useState({
    shipping_name: '',
    shipping_address: '',
    shipping_city: '',
    shipping_state: '',
    shipping_pincode: '',
    shipping_phone: '',
  });

  // Format price in INR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Fetch cart data to show order summary
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const data = await getCart();
        if (!data || data.items.length === 0) {
          navigate('/cart'); // Redirect if cart is empty
          return;
        }
        setCartData(data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
      setLoading(false);
    };
    fetchCartData();
  }, [navigate]);

  // Update form fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit order
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPlacing(true);

    // Basic validation
    for (const [key, value] of Object.entries(form)) {
      if (!value.trim()) {
        setError('Please fill in all fields');
        setPlacing(false);
        return;
      }
    }

    // Validate phone (10 digits)
    if (!/^\d{10}$/.test(form.shipping_phone)) {
      setError('Please enter a valid 10-digit phone number');
      setPlacing(false);
      return;
    }

    // Validate pincode (6 digits)
    if (!/^\d{6}$/.test(form.shipping_pincode)) {
      setError('Please enter a valid 6-digit pincode');
      setPlacing(false);
      return;
    }

    try {
      const result = await placeOrder(form);
      if (result.order_id) {
        await refreshCart(); // Reset cart badge to 0
        navigate(`/order-confirmation/${result.order_id}`);
      } else {
        setError(result.error || 'Failed to place order');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
      console.error('Error placing order:', error);
    }
    setPlacing(false);
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading checkout...</p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Left: Shipping Form */}
        <div className="checkout-form-section">
          <div className="checkout-step">
            <div className="step-header">
              <span className="step-number">1</span>
              <h2>DELIVERY ADDRESS</h2>
            </div>

            <form onSubmit={handleSubmit} className="shipping-form" id="checkout-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="shipping_name">Full Name</label>
                  <input
                    type="text"
                    id="shipping_name"
                    name="shipping_name"
                    value={form.shipping_name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="shipping_phone">Phone Number</label>
                  <input
                    type="tel"
                    id="shipping_phone"
                    name="shipping_phone"
                    value={form.shipping_phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    maxLength="10"
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="shipping_address">Address</label>
                <textarea
                  id="shipping_address"
                  name="shipping_address"
                  value={form.shipping_address}
                  onChange={handleChange}
                  placeholder="House No., Building, Street, Area"
                  rows="3"
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="shipping_city">City</label>
                  <input
                    type="text"
                    id="shipping_city"
                    name="shipping_city"
                    value={form.shipping_city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="shipping_state">State</label>
                  <input
                    type="text"
                    id="shipping_state"
                    name="shipping_state"
                    value={form.shipping_state}
                    onChange={handleChange}
                    placeholder="State"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="shipping_pincode">Pincode</label>
                  <input
                    type="text"
                    id="shipping_pincode"
                    name="shipping_pincode"
                    value={form.shipping_pincode}
                    onChange={handleChange}
                    placeholder="6-digit pincode"
                    maxLength="6"
                  />
                </div>
              </div>

              {error && <div className="form-error">{error}</div>}

              <button
                type="submit"
                className="btn-confirm-order"
                disabled={placing}
                id="confirm-order-btn"
              >
                {placing ? 'PLACING ORDER...' : 'CONFIRM ORDER'}
              </button>
            </form>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="checkout-summary-section">
          <div className="price-summary">
            <h3 className="summary-title">ORDER SUMMARY</h3>
            <div className="summary-divider"></div>

            {/* Item list preview */}
            <div className="checkout-items-preview">
              {cartData?.items.map((item) => (
                <div key={item.id} className="checkout-item-row">
                  <span className="checkout-item-name">
                    {item.Product.name} × {item.quantity}
                  </span>
                  <span>{formatPrice(item.Product.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row">
              <span>Price ({cartData?.totalItems} items)</span>
              <span>{formatPrice(cartData?.totalOriginalPrice)}</span>
            </div>

            <div className="summary-row discount">
              <span>Discount</span>
              <span className="discount-amount">− {formatPrice(cartData?.totalDiscount)}</span>
            </div>

            <div className="summary-row">
              <span>Delivery Charges</span>
              <span className="free-delivery">FREE</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total">
              <span>Total Amount</span>
              <span>{formatPrice(cartData?.totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
