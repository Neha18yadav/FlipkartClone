import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const WishlistPage = () => {
  const { wishlist, loading, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleRemove = async (productId) => {
    try {
      await toggleWishlist(productId);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const moveToCart = async (product) => {
    try {
      await addToCart(product.id, 1);
      await handleRemove(product.id);
    } catch (error) {
      console.error('Error moving to cart:', error);
    }
  };

  if (loading) return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Fetching your wishlist...</p>
    </div>
  );

  return (
    <div className="wishlist-page">
      <div className="container">
        <div className="wishlist-header-card">
          <h1 className="page-title">My Wishlist ({wishlist.length})</h1>
        </div>
        
        {wishlist.length === 0 ? (
          <div className="empty-wishlist-card">
            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/mywishlist-empty_39746d.png" alt="Empty Wishlist" />
            <h3>Your wishlist is empty!</h3>
            <p>Explore more and shortlist some items.</p>
            <Link to="/" className="btn-shop-now">Explore Store</Link>
          </div>
        ) : (
          <div className="wishlist-list-container">
            {wishlist.map(item => (
              <div key={item.id} className="wishlist-item-row">
                <div className="wishlist-item-img">
                  <img src={item.Product.images[0]?.image_url} alt={item.Product.name} />
                </div>
                <div className="wishlist-item-details">
                  <div className="wishlist-item-main">
                    <Link to={`/product/${item.Product.id}`} className="wishlist-item-name">
                      {item.Product.name}
                    </Link>
                    <div className="product-card-rating">
                      <span className="rating-badge">4.4 ★</span>
                      <span className="rating-count">(8,921)</span>
                    </div>
                    <div className="wishlist-item-price-row">
                      <span className="current-price">₹{item.Product.price.toLocaleString()}</span>
                      <span className="original-price">₹{item.Product.original_price.toLocaleString()}</span>
                      <span className="discount-badge">
                        {Math.round(((item.Product.original_price - item.Product.price) / item.Product.original_price) * 100)}% Off
                      </span>
                    </div>
                  </div>
                  <div className="wishlist-item-actions">
                    <button 
                      onClick={() => moveToCart(item.Product)} 
                      className="btn-move-to-cart"
                    >
                      ADD TO CART
                    </button>
                    <button 
                      onClick={() => handleRemove(item.Product.id)} 
                      className="btn-remove-wishlist"
                      title="Remove from wishlist"
                    >
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                      </svg>
                    </button>
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

export default WishlistPage;
