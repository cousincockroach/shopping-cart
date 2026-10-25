
import React, { useState } from 'react';
import { Link } from 'react-router'; 
import './Header.css';

const Header = ({ cartCount = 0, onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-container">

        <Link to="/" className="brand-logo" style={{ textDecoration: 'none' }}>
          STORE
        </Link>


        <nav className="desktop-nav">
          <Link to="/shop" className="nav-link">Shop</Link>
          <Link to="/about" className="nav-link">About</Link>
          <div className="dropdown">
            <button className="nav-link dropdown-toggle">
              More <span className="chevron">∨</span>
            </button>
          </div>
        </nav>


        <div className="header-actions">
          <button 
            onClick={onOpenCart} 
            className="cart-icon-btn" 
            aria-label="Shopping Cart"
          >
            <svg className="bag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="mobile-toggle"
            aria-label="Toggle Menu"
          >
            <svg className="bag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>


      {mobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/shop" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
          <Link to="/about" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link to="/more" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>More</Link>
        </div>
      )}
    </header>
  );
};

export default Header;