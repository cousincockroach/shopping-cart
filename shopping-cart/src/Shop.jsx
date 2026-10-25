// Shop.jsx
import React, { useState, useEffect } from 'react';
import './Shop.css';

// Approximate USD to ZAR exchange rate for conversion
const USD_TO_ZAR = 18.5;

const Shop = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products & categories on initial mount
  useEffect(() => {
    const fetchShopData = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('https://fakestoreapi.com/products'),
          fetch('https://fakestoreapi.com/products/categories')
        ]);

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error('Failed to fetch store inventory');
        }

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setProducts(productsData);
        setCategories(['all', ...categoriesData]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchShopData();
  }, []);

  // Filter & Sort Logic
  const filteredProducts = products
    .filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating.rate - a.rating.rate;
      return 0;
    });

  return (
    <section className="shop-container" id="shop">
      {/* Shop Header & Controls */}
      <div className="shop-top-bar">
        <div className="shop-title-group">
          <h2 className="shop-title">CATALOGUE</h2>
          <span className="product-count">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'ITEM' : 'ITEMS'}
          </span>
        </div>

        {/* Search Bar */}
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="clear-search-btn">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs & Sort Controls */}
      <div className="shop-filters-bar">
        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="sort-wrapper">
          <label htmlFor="sort-select" className="sort-label">SORT BY:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="default">FEATURED</option>
            <option value="price-low">PRICE: LOW TO HIGH</option>
            <option value="price-high">PRICE: HIGH TO LOW</option>
            <option value="rating">HIGHEST RATED</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="shop-loading-state">
          <div className="loading-spinner"></div>
          <p>LOADING CATALOGUE...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="shop-error-state">
          <p>UNABLE TO LOAD CATALOGUE: {error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            RETRY
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="shop-empty-state">
          <p>NO PRODUCTS FOUND MATCHING YOUR SEARCH.</p>
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && (
        <div className="products-grid">
          {filteredProducts.map((product) => {
            const priceInRands = Math.round(product.price * USD_TO_ZAR);

            return (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                  />
                  <span className="category-badge">
                    {product.category}
                  </span>
                </div>

                <div className="product-details">
                  <div className="product-info-top">
                    <h3 className="product-name">{product.title}</h3>
                    <div className="rating-badge">
                      ★ {product.rating?.rate} <span className="rating-count">({product.rating?.count})</span>
                    </div>
                  </div>

                  <div className="product-card-footer">
                    <span className="product-price">
                      R{priceInRands.toLocaleString()}
                    </span>
                    <button
                      onClick={() => onAddToCart({ ...product, priceInRands })}
                      className="add-to-cart-btn"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Shop;