import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, ClipboardList, UtensilsCrossed, ChefHat, Bell } from 'lucide-react';
import OrdersList from '../components/admin/OrdersList';
import MenuManager from '../components/admin/MenuManager';
import WaiterCallsList from '../components/admin/WaiterCallsList';

const tabs = [
  { id: 'orders', label: 'Siparişler', icon: ClipboardList },
  { id: 'waiter', label: 'Garson Çağrıları', icon: Bell },
  { id: 'menu', label: 'Menü Yönetimi', icon: UtensilsCrossed },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      {/* Top Bar */}
      <header className="bg-porta-dark shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo + Title */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <ChefHat className="w-6 h-6 text-porta-red" />
                <span className="font-heading text-xl font-bold text-white">
                  Porta Via<span className="text-porta-red">.</span>
                </span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-gray-700" />
              <span className="hidden sm:block text-gray-400 text-sm font-medium">
                Admin Panel
              </span>
            </div>

            {/* Right: Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Çıkış Yap</span>
            </button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-all duration-200 cursor-pointer
                    ${isActive
                      ? 'border-porta-red text-porta-red'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="w-4.5 h-4.5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'orders' && <OrdersList />}
        {activeTab === 'waiter' && <WaiterCallsList />}
        {activeTab === 'menu' && <MenuManager />}
      </main>
    </div>
  );
}
