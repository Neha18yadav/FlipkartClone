// Header.jsx — Flipkart-style blue navigation bar
// Contains: Logo, Search bar, Cart icon with badge

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  // When user submits search, navigate to home with search query
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <span className="logo-text">Flipkart</span>
          <span className="logo-tagline">
            Explore <span className="logo-plus">Plus</span>
            <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/header/img_plusYellow-c498bc.svg" alt="" className="plus-icon" />
          </span>
        </Link>

        {/* Search Bar */}
        <form className="header-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            id="search-input"
          />
          <button type="submit" className="search-btn" id="search-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
        </form>

        {/* Right side actions */}
        <div className="header-actions">
          {user ? (
            <div 
              className="header-user-nav"
              onMouseEnter={() => setShowUserMenu(true)}
              onMouseLeave={() => setShowUserMenu(false)}
            >
              <div className="user-login-info">
                <span className="user-name-display">{user.name}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="dropdown-arrow">
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </div>
              {showUserMenu && (
                <div className="user-dropdown">
                  <Link to="/orders" className="dropdown-item">My Orders</Link>
                  <Link to="/wishlist" className="dropdown-item">Wishlist</Link>
                  <div className="dropdown-divider"></div>
                  <button onClick={logout} className="dropdown-item logout-btn">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-btn">Login</Link>
          )}
          <Link to="/cart" className="header-cart" id="cart-link">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="cart-text">Cart</span>
            {cartCount > 0 && (
              <span className="cart-badge" id="cart-badge">{cartCount}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
