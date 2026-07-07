import { useState, useEffect } from 'react';
import { Bell, X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { addWaiterCall } from '../data/mockStore';

export default function WaiterCallButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState('');
  const [savedTable, setSavedTable] = useState('');
  const [status, setStatus] = useState('idle'); // idle, calling, success

  useEffect(() => {
    const table = localStorage.getItem('portavia_table_number') || '';
    setSavedTable(table);
    if (table) {
      setTableNumber(table);
    }
  }, [isOpen]);

  const handleCall = (e) => {
    e.preventDefault();
    if (!tableNumber.trim()) return;

    setStatus('calling');
    localStorage.setItem('portavia_table_number', tableNumber);
    setSavedTable(tableNumber);

    // Call the waiter call function
    addWaiterCall(tableNumber);

    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        setIsOpen(false);
        setStatus('idle');
      }, 2500);
    }, 1000);
  };

  const handleResetTable = () => {
    localStorage.removeItem('portavia_table_number');
    setSavedTable('');
    setTableNumber('');
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 bg-porta-red text-white py-3.5 px-5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center border border-white/10 group gap-2"
        aria-label="Garson Çağır"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <span className="absolute inset-0 rounded-full bg-porta-red animate-ping opacity-20"></span>
        <Bell className="w-5 h-5 animate-pulse group-hover:rotate-12 transition-transform duration-200" />
        <span className="font-semibold text-sm whitespace-nowrap">
          Garson Çağır
        </span>
      </motion.button>

      {/* Modal Backdrop and Content */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => status !== 'calling' && setIsOpen(false)}
              className="absolute inset-0 bg-porta-dark/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative border border-gray-100 z-10 p-6 md:p-8"
            >
              {/* Close Button */}
              {status !== 'calling' && status !== 'success' && (
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {status === 'idle' && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-porta-red/10 p-3 rounded-2xl text-porta-red">
                      <Bell className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-porta-dark">Garson Çağır</h3>
                      <p className="text-sm text-gray-500 font-light">Masanıza garson çağırmak için formu onaylayın.</p>
                    </div>
                  </div>

                  <form onSubmit={handleCall} className="space-y-5">
                    {savedTable ? (
                      <div className="bg-porta-cream rounded-2xl p-5 border border-gray-100 text-center">
                        <p className="text-sm text-gray-500 mb-1">Kayıtlı Masa Numarası</p>
                        <p className="text-4xl font-bold font-heading text-porta-red mb-3">Masa {savedTable}</p>
                        <button
                          type="button"
                          onClick={handleResetTable}
                          className="text-xs text-gray-500 underline hover:text-porta-red transition-colors cursor-pointer"
                        >
                          Masa Numarasını Değiştir
                        </button>
                      </div>
                    ) : (
                      <div>
                        <label htmlFor="table-input" className="block text-sm font-semibold text-gray-700 mb-2">
                          Masa Numarası
                        </label>
                        <input
                          id="table-input"
                          type="text"
                          pattern="[0-9]*"
                          inputMode="numeric"
                          placeholder="Örn: 5"
                          value={tableNumber}
                          onChange={(e) => setTableNumber(e.target.value.replace(/\D/g, ''))}
                          required
                          autoFocus
                          className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-lg font-bold text-center focus:outline-none focus:ring-2 focus:ring-porta-red/20 focus:border-porta-red transition-all"
                        />
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-porta-red hover:bg-red-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-porta-red/20 transition-all duration-200 active:scale-[0.98] cursor-pointer"
                    >
                      Garson Çağır
                    </button>
                  </form>
                </div>
              )}

              {status === 'calling' && (
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="w-16 h-16 border-4 border-porta-red/20 border-t-porta-red rounded-full animate-spin mb-6"></div>
                  <h3 className="text-lg font-bold text-porta-dark mb-1">Çağrı İletiliyor...</h3>
                  <p className="text-sm text-gray-500">Lütfen bekleyin, çağrınız sisteme aktarılıyor.</p>
                </div>
              )}

              {status === 'success' && (
                <div className="py-8 text-center flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="text-porta-green mb-5"
                  >
                    <CheckCircle className="w-16 h-16" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-porta-dark mb-2">Garson Çağrıldı!</h3>
                  <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
                    Masa <span className="font-bold text-porta-red">{savedTable}</span> için çağrı yapıldı. Garsonumuz en kısa sürede masanıza yönelecektir.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
