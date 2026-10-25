
import React from 'react';
import './CartDrawer.css';

const CartDrawer = ({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem }) => {
  if (!isOpen) return null;


  const subtotal = cart.reduce((acc, item) => acc + item.priceInRands * item.quantity, 0);

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        

        <div className="cart-header">
          <h2 className="cart-title">YOUR CART ({cart.reduce((acc, item) => acc + item.quantity, 0)})</h2>
          <button onClick={onClose} className="close-drawer-btn" aria-label="Close cart">
            ✕
          </button>
        </div>


        <div className="cart-items-list">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>YOUR CART IS EMPTY</p>
              <span>Explore the catalogue to add items.</span>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img-wrapper">
                  <img src={item.image} alt={item.title} className="cart-item-img" />
                </div>
                
                <div className="cart-item-details">
                  <h4 className="cart-item-name">{item.title}</h4>
                  <p className="cart-item-price">R{item.priceInRands.toLocaleString()}</p>
                  
                  <div className="cart-item-controls">
                    <div className="quantity-selector">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="qty-btn"
                      >
                        -
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="qty-btn"
                      >
                        +
                      </button>
                    </div>

                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="remove-item-btn"
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>


        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="subtotal-row">
              <span>SUBTOTAL</span>
              <span className="subtotal-amount">R{subtotal.toLocaleString()}</span>
            </div>
            <p className="shipping-notice">Shipping & taxes calculated at checkout.</p>
            
            <button 
              onClick={() => alert('Proceeding to secure checkout!')} 
              className="checkout-btn"
            >
              PROCEED TO CHECKOUT ↗
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CartDrawer;