import { useCart } from '../context/CartContext';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const { items, isCartOpen, closeCart, updateQuantity, removeItem, totalItems, totalPrice } = useCart();

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] transition-transform duration-300 ease-out flex flex-col ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <ShoppingBag size={22} className="text-porta-red" />
            <h2 className="text-xl font-heading font-bold text-porta-dark">
              Sepetim
              {totalItems > 0 && (
                <span className="ml-2 text-sm font-body font-normal text-gray-500">
                  ({totalItems} ürün)
                </span>
              )}
            </h2>
          </div>
          <button 
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                <ShoppingBag size={32} className="text-gray-300" />
              </div>
              <p className="text-gray-400 font-medium mb-2">Sepetiniz boş</p>
              <p className="text-sm text-gray-400">Menüden lezzetli ürünler ekleyin!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.cartItemId} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                  {/* Item Image Placeholder */}
                  <div className="w-16 h-16 rounded-lg bg-white border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                    ) : (
                      <span className="text-2xl">🍕</span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-porta-dark text-sm leading-tight truncate">
                      {item.name}
                    </h4>
                    {item.selectedOptions && item.selectedOptions.length > 0 && (
                      <div className="text-[10px] text-gray-400 mt-0.5 leading-tight truncate">
                        {item.selectedOptions.join(', ')}
                      </div>
                    )}
                    <p className="text-porta-green font-semibold text-sm mt-1">{item.price}</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-0.5">
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-50 hover:text-porta-red transition-colors text-gray-500"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-bold text-porta-dark w-5 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-green-50 hover:text-porta-green transition-colors text-gray-500"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.cartItemId)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-porta-red transition-colors cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-5 space-y-4 bg-white">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Toplam</span>
              <span className="text-2xl font-bold text-porta-dark">₺{totalPrice}</span>
            </div>
            <Link
              to="/checkout"
              onClick={closeCart}
              className="block w-full bg-porta-red hover:bg-red-700 text-white text-center py-4 rounded-xl font-semibold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-200"
            >
              Siparişi Tamamla
            </Link>
          </div>
        )}

      </div>
    </>
  );
};

export default CartDrawer;
