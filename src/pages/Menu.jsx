import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { Plus, Minus, X, ShoppingBag } from 'lucide-react';
import { useMenu } from '../data/mockStore';

const Menu = () => {
  const menuCategories = useMenu();
  const { addItem } = useCart();
  const [selectedItem, setSelectedItem] = useState(null);
  const { t, translateDesc, language } = useLanguage();
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('portavia_splash_shown');
  });

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        sessionStorage.setItem('portavia_splash_shown', 'true');
        setShowSplash(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] bg-[#021f15] flex items-center justify-center overflow-hidden"
          >
            <motion.img
              src="/images/splash.jpg"
              alt="Porta Via Splash"
              initial={{ scale: 1.05, opacity: 0.95 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2.5, ease: 'easeOut' }}
              className="w-full h-full object-cover md:object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-24 pb-16 bg-porta-cream min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Menu Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-porta-dark mb-4">
              {language === 'tr' ? (
                <>Lezzet <span className="text-porta-red">Menümüz</span></>
              ) : (
                <>Our <span className="text-porta-red">Menu</span></>
              )}
            </h1>
            <p className="text-lg text-gray-600 font-light">
              {t('menuHeaderSubtitle')}
            </p>
          </motion.div>
        </div>

        {/* Sticky Category Bar */}
        <div className="sticky top-[73px] z-30 bg-porta-cream/95 backdrop-blur-md py-4 -mx-4 px-4 border-b border-gray-100 mb-10 overflow-x-auto flex gap-2 whitespace-nowrap select-none scroll-smooth">
          {menuCategories.map((category, idx) => {
            const catId = category.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            return (
              <button
                key={idx}
                onClick={() => {
                  const element = document.getElementById(catId);
                  if (element) {
                    const offset = 140; // offset for sticky header + category bar
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = element.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="bg-white text-porta-dark border border-gray-200 px-4.5 py-2.5 rounded-full text-xs font-bold hover:border-porta-red hover:text-porta-red transition-all cursor-pointer shadow-sm active:scale-95"
              >
                {t(category.title)}
              </button>
            );
          })}
        </div>

        {/* Menu Categories */}
        <div className="max-w-5xl mx-auto space-y-16">
          {menuCategories.map((category, idx) => (
            <motion.div 
              key={idx}
              id={category.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-heading font-bold text-porta-dark border-b-2 border-porta-red/20 pb-4 mb-8 flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-porta-red inline-block"></span>
                {t(category.title)}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.items.map((item, itemIdx) => (
                  <div 
                    key={itemIdx} 
                    onClick={() => setSelectedItem(item)}
                    className="group flex gap-4 bg-white p-4 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 cursor-pointer select-none"
                  >
                    <div className="w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center relative mt-1">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className={`absolute inset-0 flex items-center justify-center text-gray-300 ${item.image ? 'hidden' : ''}`}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col py-1 min-w-0">
                      <div className="flex justify-between items-start mb-2 gap-4">
                        <h3 className="text-base md:text-lg font-bold text-porta-dark group-hover:text-porta-red transition-colors truncate">
                          {item.name}
                        </h3>
                        <span className="text-base font-semibold text-porta-green whitespace-nowrap bg-green-50 px-2 py-0.5 rounded-lg">
                          {item.price}
                        </span>
                      </div>
                      
                      <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed line-clamp-2 mb-3">
                        {translateDesc(item.desc)}
                      </p>
                      
                      {/* Customizable Indicator Badge */}
                      {item.options && item.options.length > 0 && (
                        <div className="mt-auto pt-2">
                          <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider">
                            {t('customizable')}
                          </span>
                        </div>
                      )}

                      {/* Sepete Ekle Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.options && item.options.length > 0) {
                            setSelectedItem(item);
                          } else {
                            addItem(item);
                          }
                        }}
                        className="mt-3 flex items-center justify-center gap-1.5 w-full bg-porta-red/10 hover:bg-porta-red text-porta-red hover:text-white py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-200 active:scale-95 cursor-pointer"
                      >
                        <Plus size={16} />
                        <span>{t('modalAddToCart')}</span>
                      </button>
                      
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <ProductModal 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
            onAdd={addItem} 
          />
        )}
      </AnimatePresence>
    </div>
    </>
  );
};

// Product details modal with customization options
const ProductModal = ({ item, onClose, onAdd }) => {
  const { t, translateDesc, translateOption, language } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [selectedOpts, setSelectedOpts] = useState({});

  useEffect(() => {
    const initial = {};
    if (item.options) {
      item.options.forEach(opt => {
        const isSingle = opt.name.includes('Seçimi') || opt.name.includes('Boy') || opt.name.includes('Sıcaklık');
        if (isSingle && opt.items && opt.items.length > 0) {
          // Default to the first option item name
          const firstItemName = opt.items[0].split(' (')[0];
          initial[opt.name] = firstItemName;
        } else {
          initial[opt.name] = [];
        }
      });
    }
    setSelectedOpts(initial);
  }, [item]);

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const match = priceStr.replace(/[^\d]/g, '');
    return parseInt(match) || 0;
  };

  const getSingleItemPrice = () => {
    let price = parsePrice(item.price);
    
    Object.entries(selectedOpts).forEach(([optName, val]) => {
      const opt = item.options?.find(o => o.name === optName);
      if (!opt) return;
      
      if (Array.isArray(val)) {
        val.forEach(selectedValName => {
          const optItem = opt.items.find(i => i.startsWith(selectedValName) || i === selectedValName);
          if (optItem && optItem.includes('+')) {
            price += parsePrice(optItem);
          }
        });
      } else if (val) {
        const optItem = opt.items.find(i => i.startsWith(val) || i === val);
        if (optName === 'Boy Seçimi' && optItem) {
          price = parsePrice(optItem);
        } else if (optItem && optItem.includes('+')) {
          price += parsePrice(optItem);
        }
      }
    });
    
    return price;
  };

  const singlePrice = getSingleItemPrice();
  const totalPrice = singlePrice * quantity;

  const handleAdd = () => {
    const selectedOptionsList = [];
    Object.entries(selectedOpts).forEach(([optName, val]) => {
      if (Array.isArray(val)) {
        val.forEach(v => {
          const opt = item.options?.find(o => o.name === optName);
          const optItem = opt?.items.find(i => i.startsWith(v) || i === v);
          selectedOptionsList.push(optItem || v);
        });
      } else if (val) {
        const opt = item.options?.find(o => o.name === optName);
        const optItem = opt?.items.find(i => i.startsWith(val) || i === val);
        selectedOptionsList.push(optItem || val);
      }
    });

    // Translate selected options list to correct target language names
    const translatedOptions = selectedOptionsList.map(optVal => {
      return translateOption(optVal);
    });

    onAdd({
      ...item,
      price: '₺' + singlePrice,
      quantity,
      selectedOptions: translatedOptions
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative border border-gray-100 z-10 flex flex-col max-h-[90vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100 p-2 rounded-full transition-all cursor-pointer z-20 shadow-sm border border-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto flex-1 pb-24">
          <div className="w-full h-56 bg-gray-50 flex items-center justify-center relative overflow-hidden shrink-0 border-b border-gray-100">
            {item.image ? (
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-6xl select-none">🍕</span>
            )}
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-porta-dark mb-2 leading-tight">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                {translateDesc(item.desc) || (language === 'tr' ? 'Bu enfes lezzeti mutlaka deneyin.' : 'Make sure to try this delicious item.')}
              </p>
            </div>

            {item.options && item.options.length > 0 && (
              <div className="space-y-6 border-t border-gray-100 pt-6">
                {item.options.map((opt, optIdx) => {
                  const isSingle = opt.name.includes('Seçimi') || opt.name.includes('Boy') || opt.name.includes('Sıcaklık');
                  
                  return (
                    <div key={optIdx} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-gray-700 uppercase tracking-wider">
                          {opt.name === 'Boy Seçimi' ? t('modalSize') : opt.name === 'Süt Seçimi' ? t('modalSut') : opt.name === 'Şurup Seçimi' ? t('modalSyrup') : opt.name}
                        </h4>
                        <span className="text-[11px] text-gray-400 font-medium">
                          {isSingle ? t('singleSelect') : t('multiSelect')}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2.5">
                        {opt.items.map((optItem, itemIdx) => {
                          const optItemName = optItem.split(' (')[0];
                          const optItemPrice = optItem.includes('(') ? optItem.substring(optItem.indexOf('(')) : '';

                          const isSelected = isSingle
                            ? selectedOpts[opt.name] === optItemName
                            : selectedOpts[opt.name]?.includes(optItemName);

                          return (
                            <button
                              key={itemIdx}
                              type="button"
                              onClick={() => {
                                if (isSingle) {
                                  setSelectedOpts(prev => ({ ...prev, [opt.name]: optItemName }));
                                } else {
                                  setSelectedOpts(prev => {
                                    const current = prev[opt.name] || [];
                                    const next = current.includes(optItemName)
                                      ? current.filter(x => x !== optItemName)
                                      : [...current, optItemName];
                                    return { ...prev, [opt.name]: next };
                                  });
                                }
                              }}
                              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 border cursor-pointer select-none ${
                                isSelected
                                  ? 'bg-porta-red text-white border-porta-red shadow-md shadow-porta-red/10 scale-[1.02]'
                                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                              }`}
                            >
                              <span>{translateOption(optItemName)}</span>
                              {optItemPrice && (
                                <span className={`ml-1 text-[10px] ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                                  {optItemPrice}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 flex items-center justify-between gap-4 z-10">
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl border border-gray-200 p-1">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white hover:bg-red-50 hover:text-porta-red text-gray-500 shadow-sm border border-gray-100 cursor-pointer active:scale-95 transition-all"
            >
              <Minus size={16} />
            </button>
            <span className="text-base font-bold text-porta-dark w-6 text-center select-none">{quantity}</span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white hover:bg-green-50 hover:text-porta-green text-gray-500 shadow-sm border border-gray-100 cursor-pointer active:scale-95 transition-all"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="flex-1 bg-porta-red hover:bg-red-700 text-white py-4 px-6 rounded-2xl font-bold shadow-lg shadow-porta-red/15 transition-all duration-200 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            <ShoppingBag size={18} />
            <span>{t('modalAddToCart')}</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-lg text-sm font-semibold">
              ₺{totalPrice}
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Menu;
