// App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router';
import Header from './Header.jsx';
import Body from './Body.jsx';
import Shop from './Shop.jsx';
import About from './About.jsx'; // 👈 Import About component
import CartDrawer from './CartDrawer.jsx';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="app-container">
      <Header 
        cartCount={totalCartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
      />

      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} />} />
        <Route path="/about" element={<About />} /> {/* 👈 Add About route */}
      </Routes>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}

export default App;