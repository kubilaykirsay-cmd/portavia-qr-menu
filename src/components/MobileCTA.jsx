import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const MobileCTA = () => {
  const { totalItems, totalPrice, toggleCart } = useCart();

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] p-3 px-4 pb-safe flex md:hidden"
        >
          <button
            onClick={toggleCart}
            className="w-full flex items-center justify-between bg-porta-red hover:bg-red-700 text-white py-3.5 px-5 rounded-2xl font-bold shadow-lg shadow-porta-red/15 transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} />
              <span>Sepeti Gör ({totalItems})</span>
            </div>
            <span className="text-lg font-bold">₺{totalPrice}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileCTA;
