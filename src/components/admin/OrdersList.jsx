import { useState } from 'react';
import { useOrders, updateOrderStatus } from '../../data/mockStore';
import {
  Clock, ChefHat, CheckCircle2, Phone, User,
  MapPin, Hash, ArrowRight, Package, Coffee,
  StickyNote, RefreshCw
} from 'lucide-react';

const columns = [
  {
    key: 'pending',
    label: 'Bekleyen',
    icon: Clock,
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    headerBg: 'bg-amber-100',
    headerText: 'text-amber-800',
    badge: 'bg-amber-500',
    cardBorder: 'border-l-amber-400',
  },
  {
    key: 'preparing',
    label: 'Hazırlanıyor',
    icon: ChefHat,
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    headerBg: 'bg-blue-100',
    headerText: 'text-blue-800',
    badge: 'bg-blue-500',
    cardBorder: 'border-l-blue-400',
  },
  {
    key: 'completed',
    label: 'Tamamlandı',
    icon: CheckCircle2,
    bg: 'bg-green-50',
    border: 'border-green-200',
    headerBg: 'bg-green-100',
    headerText: 'text-green-800',
    badge: 'bg-green-500',
    cardBorder: 'border-l-green-400',
  },
];

function formatTime(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function OrderCard({ order, column }) {
  const nextStatus = column.key === 'pending' ? 'preparing' : column.key === 'preparing' ? 'completed' : null;
  const nextLabel = column.key === 'pending' ? 'Hazırlamaya Başla' : column.key === 'preparing' ? 'Tamamlandı' : null;
  const nextBtnClass = column.key === 'pending'
    ? 'bg-blue-600 hover:bg-blue-700 text-white'
    : 'bg-green-600 hover:bg-green-700 text-white';

  return (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden border-l-4 ${column.cardBorder}`}>
      {/* Card Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-50">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">
            #{order.id?.replace('ORD-', '').slice(-6)}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            order.orderType === 'masa'
              ? 'bg-purple-100 text-purple-700'
              : 'bg-orange-100 text-orange-700'
          }`}>
            {order.orderType === 'masa' ? '🍽 Masa' : '📦 Paket'}
          </span>
        </div>
        <span className="text-xs text-gray-400">
          {formatTime(order.createdAt)}
        </span>
      </div>

      {/* Card Body */}
      <div className="px-4 py-3 space-y-3">
        {/* Customer Info */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-sm">
            <User className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-medium text-gray-800">{order.customerName || 'Misafir'}</span>
          </div>
          {order.customerPhone && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Phone className="w-3.5 h-3.5 text-gray-400" />
              <span>{order.customerPhone}</span>
            </div>
          )}
          {order.orderType === 'masa' && order.tableNumber && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Hash className="w-3.5 h-3.5 text-gray-400" />
              <span>Masa {order.tableNumber}</span>
            </div>
          )}
          {order.orderType === 'paket' && order.address && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              <span className="truncate">{order.address}</span>
            </div>
          )}
        </div>

        {/* Items */}
        <div className="bg-gray-50 rounded-lg p-2.5 space-y-1">
          {order.items?.map((item, i) => (
            <div key={i} className="py-1 text-sm border-b border-gray-100/50 last:border-0">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">
                  <span className="font-semibold text-gray-400">{item.quantity}×</span>{' '}
                  {item.name}
                </span>
                <span className="text-gray-500 text-xs font-semibold">{item.price}</span>
              </div>
              {item.selectedOptions && item.selectedOptions.length > 0 && (
                <div className="text-[10px] text-gray-400 mt-0.5 ml-4 leading-tight">
                  {item.selectedOptions.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Note */}
        {order.note && (
          <div className="flex items-start gap-2 text-xs text-gray-500 bg-yellow-50 p-2 rounded-lg">
            <StickyNote className="w-3.5 h-3.5 text-yellow-500 shrink-0 mt-0.5" />
            <span>{order.note}</span>
          </div>
        )}

        {/* Total + Date */}
        <div className="flex items-center justify-between pt-1 border-t border-gray-100">
          <span className="text-xs text-gray-400">{formatDate(order.createdAt)}</span>
          <span className="text-lg font-bold text-porta-dark">{order.total}</span>
        </div>
      </div>

      {/* Action Button */}
      {nextStatus && (
        <div className="px-4 py-3 border-t border-gray-50">
          <button
            onClick={() => updateOrderStatus(order.id, nextStatus)}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${nextBtnClass}`}
          >
            {nextLabel}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function OrdersList() {
  const orders = useOrders();
  const [mobileTab, setMobileTab] = useState('pending');

  const grouped = {
    pending: orders.filter(o => o.status === 'pending'),
    preparing: orders.filter(o => o.status === 'preparing'),
    completed: orders.filter(o => o.status === 'completed'),
  };

  const totalOrders = orders.length;

  if (totalOrders === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <Coffee className="w-16 h-16 mb-4 text-gray-300" />
        <h3 className="text-lg font-semibold text-gray-500 mb-1">Henüz sipariş yok</h3>
        <p className="text-sm">Yeni siparişler burada görünecek</p>
        <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          <span>Her 3 saniyede otomatik güncelleniyor</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Sipariş Yönetimi</h2>
          <p className="text-sm text-gray-500 mt-0.5">Toplam {totalOrders} sipariş</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 bg-white px-3 py-2 rounded-lg border border-gray-200">
          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          <span>Canlı</span>
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className="flex lg:hidden gap-1 mb-4 bg-gray-100 p-1 rounded-xl">
        {columns.map((col) => {
          const Icon = col.icon;
          const count = grouped[col.key].length;
          return (
            <button
              key={col.key}
              onClick={() => setMobileTab(col.key)}
              className={`
                flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer
                ${mobileTab === col.key
                  ? `${col.headerBg} ${col.headerText} shadow-sm`
                  : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{col.label}</span>
              {count > 0 && (
                <span className={`${col.badge} text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile Content */}
      <div className="lg:hidden space-y-3">
        {columns
          .filter(col => col.key === mobileTab)
          .map(col => (
            <div key={col.key}>
              {grouped[col.key].length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-sm">
                  Bu kategoride sipariş yok
                </div>
              ) : (
                <div className="space-y-3">
                  {grouped[col.key].map(order => (
                    <OrderCard key={order.id} order={order} column={col} />
                  ))}
                </div>
              )}
            </div>
          ))
        }
      </div>

      {/* Desktop Kanban */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-5">
        {columns.map((col) => {
          const Icon = col.icon;
          const count = grouped[col.key].length;
          return (
            <div key={col.key} className={`${col.bg} rounded-2xl border ${col.border} overflow-hidden`}>
              {/* Column Header */}
              <div className={`${col.headerBg} px-4 py-3 flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <Icon className={`w-4.5 h-4.5 ${col.headerText}`} />
                  <span className={`font-semibold text-sm ${col.headerText}`}>{col.label}</span>
                </div>
                <span className={`${col.badge} text-white text-xs min-w-[1.5rem] h-6 rounded-full flex items-center justify-center font-bold px-2`}>
                  {count}
                </span>
              </div>

              {/* Column Content */}
              <div className="p-3 space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto">
                {count === 0 ? (
                  <div className="text-center py-10 text-gray-400 text-sm">
                    Sipariş yok
                  </div>
                ) : (
                  grouped[col.key].map(order => (
                    <OrderCard key={order.id} order={order} column={col} />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
