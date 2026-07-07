import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = useCallback((item) => {
    setItems(prev => {
      const isOptionsEqual = (a, b) => {
        if (!a && !b) return true;
        if (!a || !b) return false;
        return JSON.stringify(a) === JSON.stringify(b);
      };

      const existingIndex = prev.findIndex(i => 
        i.name === item.name && isOptionsEqual(i.selectedOptions, item.selectedOptions)
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = { 
          ...updated[existingIndex], 
          quantity: updated[existingIndex].quantity + (item.quantity || 1) 
        };
        return updated;
      }

      const cartItemId = item.cartItemId || (item.name + '_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6));
      return [...prev, { ...item, cartItemId, quantity: item.quantity || 1 }];
    });
  }, []);

  const removeItem = useCallback((cartItemId) => {
    setItems(prev => prev.filter(i => i.cartItemId !== cartItemId));
  }, []);

  const updateQuantity = useCallback((cartItemId, quantity) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.cartItemId !== cartItemId));
      return;
    }
    setItems(prev => prev.map(i => i.cartItemId === cartItemId ? { ...i, quantity } : i));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[^\d]/g, '')) || 0;
    return sum + price * item.quantity;
  }, 0);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen(prev => !prev), []);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
