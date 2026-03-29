// OrderConfirmPage.jsx — Order confirmation page shown after successful order placement
// Displays order ID, items, shipping address, and success animation

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrder } from '../services/api';

const OrderConfirmPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Format price in INR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrder(id);
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
      setLoading(false);
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return <div className="no-results"><h2>Order not found</h2></div>;
  }

  return (
    <div className="order-confirm-page">
      <div className="order-confirm-container">
        {/* Success Icon with animation */}
        <div className="order-success-icon">
          <svg viewBox="0 0 52 52" className="checkmark-svg">
            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>

        <h1 className="order-success-title">Order Placed Successfully!</h1>
        <p className="order-id-display">
          Order ID: <strong>#{order.id}</strong>
        </p>

        {/* Order Details Card */}
        <div className="order-details-card">
          {/* Items */}
          <div className="order-section">
            <h3>Order Items</h3>
            <div className="order-items-list">
              {order.items?.map((item) => (
                <div key={item.id} className="order-confirm-item">
                  <div className="order-item-image">
                    {item.Product?.images?.[0] && (
                      <img src={item.Product.images[0].image_url} alt={item.Product?.name} />
                    )}
                  </div>
                  <div className="order-item-info">
                    <span className="order-item-name">{item.Product?.name}</span>
                    <span className="order-item-qty">Qty: {item.quantity}</span>
                  </div>
                  <span className="order-item-price">{formatPrice(item.price_at_purchase * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="order-section">
            <h3>Delivery Address</h3>
            <div className="order-address">
              <p className="address-name">{order.shipping_name}</p>
              <p>{order.shipping_address}</p>
              <p>{order.shipping_city}, {order.shipping_state} - {order.shipping_pincode}</p>
              <p>Phone: {order.shipping_phone}</p>
            </div>
          </div>

          {/* Total */}
          <div className="order-total-section">
            <span>Total Amount Paid:</span>
            <span className="order-total-amount">{formatPrice(order.total_amount)}</span>
          </div>
        </div>

          <div className="order-confirm-actions">
            <button
              className="btn-continue-shopping"
              onClick={() => navigate('/')}
              id="continue-shopping-btn"
            >
              Continue Shopping
            </button>
            <button
              className="btn-view-orders"
              onClick={() => navigate('/orders')}
              id="view-orders-btn"
            >
              My Orders
            </button>
          </div>
      </div>
    </div>
  );
};

export default OrderConfirmPage;
