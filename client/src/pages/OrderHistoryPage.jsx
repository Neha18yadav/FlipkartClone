import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserOrders } from '../services/api';
import { useAuth } from '../context/AuthContext';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'status-delivered';
      case 'processed': return 'status-processed';
      case 'shipped': return 'status-shipped';
      case 'cancelled': return 'status-cancelled';
      case 'placed': return 'status-pending';
      default: return 'status-pending';
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recent';
    const date = new Date(dateStr);
    return isNaN(date.getTime()) 
      ? 'Recent' 
      : date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  };
   
  if (loading) return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Fetching your orders...</p>
    </div>
  );

  return (
    <div className="order-history-page">
      <div className="container">
        <div className="order-history-header">
          <h1 className="page-title">My Orders</h1>
        </div>

        {orders.length === 0 ? (
          <div className="empty-orders-card">
            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/myorders-empty_82bb93.png" alt="Empty Orders" />
            <h3>You haven't placed any orders yet</h3>
            <p>Check out our latest deals and start shopping!</p>
            <Link to="/" className="btn-shop-now">Explore Store</Link>
          </div>
        ) : (
          <div className="orders-container">
            {orders.map(order => (
              <div key={order.id} className="order-card-v2">
                <div className="order-card-header">
                  <div className="order-meta">
                    <span className="order-id-label">Order ID: #{order.id}</span>
                    <span className="order-date-label">Placed on {formatDate(order.created_at || order.createdAt)}</span>
                  </div>
                  <div className={`order-status-badge ${getStatusClass(order.status)}`}>
                    <span className="dot"></span>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </div>
                </div>

                <div className="order-card-items">
                  {order.items.map(item => (
                    <div key={item.id} className="order-item-row-v2">
                      <div className="order-item-img">
                        <img 
                          src={item.Product?.images?.[0]?.image_url || 'https://via.placeholder.com/100?text=Product'} 
                          alt={item.Product?.name} 
                        />
                      </div>
                      <div className="order-item-info">
                        <Link to={`/product/${item.Product?.id}`} className="order-item-name">
                          {item.Product?.name}
                        </Link>
                        <p className="order-item-seller">Seller: Flipkart Retailer</p>
                        <p className="order-item-qty">Qty: {item.quantity}</p>
                      </div>
                      <div className="order-item-price">
                        ₹{item.price_at_purchase.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-card-footer">
                  <div className="order-total-row">
                    <span className="total-label">Order Total:</span>
                    <span className="total-value">₹{order.total_amount.toLocaleString()}</span>
                  </div>
                  <div className="order-actions">
                    <Link to={`/order-confirmation/${order.id}`} className="btn-view-details">Order Details</Link>
                    <button className="btn-need-help">Need Help?</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
