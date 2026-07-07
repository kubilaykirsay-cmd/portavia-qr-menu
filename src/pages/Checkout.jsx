import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Phone, User, UtensilsCrossed, Truck, MessageSquare, CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState('masa');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    tableNumber: '',
    address: '',
    note: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const order = {
      id: 'ORD-' + Date.now(),
      customerName: formData.name,
      customerPhone: formData.phone,
      orderType,
      tableNumber: orderType === 'masa' ? formData.tableNumber : '',
      address: orderType === 'paket' ? formData.address : '',
      items: items.map(i => ({ name: i.name, price: i.price, quantity: i.quantity })),
      total: '₺' + totalPrice,
      status: 'pending',
      createdAt: new Date().toISOString(),
      note: formData.note,
    };

    // Save to localStorage (mock store)
    const existingOrders = JSON.parse(localStorage.getItem('portavia_orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('portavia_orders', JSON.stringify(existingOrders));

    // Dispatch custom event for admin panel real-time updates
    window.dispatchEvent(new CustomEvent('portavia_new_order', { detail: order }));

    setOrderId(order.id);
    setIsSubmitted(true);
    clearCart();
  };

  if (items.length === 0 && !isSubmitted) {
    return (
      <div className="pt-32 pb-16 min-h-screen bg-porta-cream flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-500 mb-6">Sepetinizde ürün bulunmuyor.</p>
          <button onClick={() => navigate('/menu')} className="bg-porta-red text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors">
            Menüye Git
          </button>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="pt-32 pb-16 min-h-screen bg-porta-cream flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl p-10 max-w-md mx-4 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-porta-green" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-porta-dark mb-3">Siparişiniz Alındı!</h2>
          <p className="text-gray-500 mb-2">Sipariş numaranız:</p>
          <p className="text-lg font-mono font-bold text-porta-red mb-6 bg-red-50 py-2 px-4 rounded-lg inline-block">{orderId}</p>
          <p className="text-sm text-gray-400 mb-8">Siparişiniz en kısa sürede hazırlanacaktır.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-porta-dark text-white px-8 py-3 rounded-full font-semibold hover:bg-black transition-colors"
          >
            Ana Sayfaya Dön
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16 min-h-screen bg-porta-cream">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-porta-dark transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          <span className="font-medium">Geri</span>
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-heading font-bold text-porta-dark mb-8">
            Sipariş <span className="text-porta-red">Özeti</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Form */}
          <motion.form 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6"
          >
            <h2 className="text-xl font-heading font-bold text-porta-dark">Bilgileriniz</h2>
            
            {/* Order Type Toggle */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Sipariş Türü</label>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  type="button"
                  onClick={() => setOrderType('masa')}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all border-2 ${
                    orderType === 'masa' 
                      ? 'bg-porta-red text-white border-porta-red shadow-lg shadow-red-200' 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <UtensilsCrossed size={18} />
                  Masada Yemek
                </button>
                <button 
                  type="button"
                  onClick={() => setOrderType('paket')}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all border-2 ${
                    orderType === 'paket' 
                      ? 'bg-porta-red text-white border-porta-red shadow-lg shadow-red-200' 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Truck size={18} />
                  Paket Servis
                </button>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <User size={14} className="inline mr-1" /> Ad Soyad
              </label>
              <input 
                type="text" name="name" required value={formData.name} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-porta-red/30 focus:border-porta-red transition-all"
                placeholder="Adınızı girin"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Phone size={14} className="inline mr-1" /> Telefon
              </label>
              <input 
                type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-porta-red/30 focus:border-porta-red transition-all"
                placeholder="05XX XXX XX XX"
              />
            </div>

            {/* Table Number (masa) */}
            {orderType === 'masa' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Masa Numarası</label>
                <input 
                  type="text" name="tableNumber" required value={formData.tableNumber} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-porta-red/30 focus:border-porta-red transition-all"
                  placeholder="Örn: 5"
                />
              </motion.div>
            )}

            {/* Address (paket) */}
            {orderType === 'paket' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin size={14} className="inline mr-1" /> Teslimat Adresi
                </label>
                <textarea 
                  name="address" required value={formData.address} onChange={handleChange} rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-porta-red/30 focus:border-porta-red transition-all resize-none"
                  placeholder="Açık adresinizi girin"
                />
              </motion.div>
            )}

            {/* Note */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MessageSquare size={14} className="inline mr-1" /> Sipariş Notu (Opsiyonel)
              </label>
              <textarea 
                name="note" value={formData.note} onChange={handleChange} rows={2}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-porta-red/30 focus:border-porta-red transition-all resize-none"
                placeholder="Örn: Acılı olsun, ketçap eklemeyin..."
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-porta-red hover:bg-red-700 text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-200"
            >
              Siparişi Onayla
            </button>
          </motion.form>

          {/* Order Summary Sidebar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28">
              <h3 className="text-lg font-heading font-bold text-porta-dark mb-4">Sepetinizdekiler</h3>
              
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="bg-porta-red text-white text-xs font-bold w-5 h-5 rounded flex items-center justify-center shrink-0">
                        {item.quantity}
                      </span>
                      <span className="text-gray-700 truncate">{item.name}</span>
                    </div>
                    <span className="text-gray-900 font-semibold ml-2 whitespace-nowrap">{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Toplam</span>
                  <span className="text-2xl font-bold text-porta-dark">₺{totalPrice}</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Ödeme kapıda / kasada yapılacaktır.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
