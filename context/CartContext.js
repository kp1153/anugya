'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // localStorage से cart load करें
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // cart में बदलाव होने पर localStorage में save करें
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Cart में item जोड़ें
  function addToCart(book) {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === book.id);
      
      if (existingItem) {
        // अगर item पहले से है तो quantity बढ़ाएं
        return prevCart.map(item =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // नया item जोड़ें
        return [...prevCart, { ...book, quantity: 1 }];
      }
    });
  }

  // Cart से item हटाएं
  function removeFromCart(bookId) {
    setCart(prevCart => prevCart.filter(item => item.id !== bookId));
  }

  // Quantity अपडेट करें
  function updateQuantity(bookId, newQuantity) {
    if (newQuantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === bookId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }

  // Cart खाली करें
  function clearCart() {
    setCart([]);
  }

  // Total items
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Total price
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}