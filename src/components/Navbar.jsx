import { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [tableNumber, setTableNumber] = useState('');

  useEffect(() => {
    const handleTableUpdate = () => {
      setTableNumber(localStorage.getItem('portavia_table_number') || '');
    };

    handleTableUpdate();

    // Listen for storage events (e.g. table number added/updated)
    window.addEventListener('storage', handleTableUpdate);
    window.addEventListener('portavia_waiter_calls_updated', handleTableUpdate);

    // Also poll every 2 seconds just in case
    const interval = setInterval(handleTableUpdate, 2000);

    return () => {
      window.removeEventListener('storage', handleTableUpdate);
      window.removeEventListener('portavia_waiter_calls_updated', handleTableUpdate);
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-porta-cream/95 backdrop-blur-md shadow-sm py-3.5 border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Left: Logo + Table Number */}
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2">
            <span className="font-heading font-bold text-2xl tracking-tighter text-porta-dark">
              Porta Via<span className="text-porta-red">.</span>
            </span>
          </a>
          {tableNumber && (
            <span className="bg-porta-red/10 text-porta-red text-xs px-2.5 py-1 rounded-full font-bold">
              Masa {tableNumber}
            </span>
          )}
        </div>

        {/* Right: Cart Button */}
        <div className="flex items-center gap-3">
          <CartButton />
        </div>
      </div>
    </header>
  );
};

// Cart button with badge
const CartButton = () => {
  const { totalItems, toggleCart } = useCart();
  return (
    <button
      onClick={toggleCart}
      className="relative p-2.5 rounded-full transition-all hover:scale-110 text-porta-dark hover:bg-gray-100 cursor-pointer"
      aria-label="Sepeti Aç"
    >
      <ShoppingBag size={22} />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-porta-red text-white text-[11px] font-bold rounded-full flex items-center justify-center animate-bounce">
          {totalItems}
        </span>
      )}
    </button>
  );
};

export default Navbar;
