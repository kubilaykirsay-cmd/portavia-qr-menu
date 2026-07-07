import { useState } from 'react';
import { useMenu, updateMenuItem, addMenuItem, deleteMenuItem } from '../../data/mockStore';
import {
  Pencil, Trash2, Plus, Save, X, ChevronDown,
  ChevronRight, AlertTriangle, Pizza, UtensilsCrossed, Coffee
} from 'lucide-react';

const categoryIcons = {
  'Pizzalar': Pizza,
  'Yemekler': UtensilsCrossed,
  'Kahveler & İçecekler': Coffee,
};

function EditForm({ item, onSave, onCancel }) {
  const [name, setName] = useState(item?.name || '');
  const [desc, setDesc] = useState(item?.desc || '');
  const [price, setPrice] = useState(item?.price || '');
  const [image, setImage] = useState(item?.image || '');
  const [isCompressing, setIsCompressing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !price.trim() || isCompressing) return;
    onSave({ ...item, name: name.trim(), desc: desc.trim(), price: price.trim(), image: image.trim() });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsCompressing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas for compression and resizing
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400;
        const MAX_HEIGHT = 400;
        let width = img.width;
        let height = img.height;

        // Calculate dimensions maintaining aspect ratio
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Compress as JPEG to 70% quality (typically yields ~20KB file size, saving localStorage space)
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        setImage(compressedDataUrl);
        setIsCompressing(false);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-porta-red/20 rounded-xl p-4 shadow-md space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-gray-500 mb-1">Ürün Adı</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ürün adı"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-porta-red/30 focus:border-porta-red"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-gray-500 mb-1">Fiyat</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="₺0"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-porta-red/30 focus:border-porta-red"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-gray-500 mb-1">Açıklama</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Açıklama"
            rows="2"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-porta-red/30 focus:border-porta-red resize-none"
          />
        </div>
        
        <div className="sm:col-span-2 flex gap-3 items-end">
          <div className="flex-1 col-span-2">
            <label className="block text-xs font-medium text-gray-500 mb-1">Ürün Görseli</label>
            <div className="flex items-center gap-2">
              <label
                htmlFor={`file-upload-${item?.id || 'new'}`}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 cursor-pointer shadow-sm active:scale-95 transition-all select-none"
              >
                {isCompressing ? 'Görsel İşleniyor...' : '🖼 Galeri/Kamera Seç'}
              </label>
              <input
                type="file"
                id={`file-upload-${item?.id || 'new'}`}
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isCompressing}
              />
              
              {image && (
                <button
                  type="button"
                  onClick={() => setImage('')}
                  className="px-2.5 py-2.5 border border-red-200 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 cursor-pointer transition-all active:scale-95"
                >
                  Kaldır
                </button>
              )}
            </div>
          </div>
          {/* Live Thumbnail Preview */}
          <div className="w-12 h-12 border border-gray-200 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden mb-0.5 shadow-sm">
            {image ? (
              <img src={image} alt="preview" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
            ) : (
              <span className="text-[10px] text-gray-400 select-none text-center">Resim Yok</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 justify-end pt-2 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
          İptal
        </button>
        <button
          type="submit"
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-porta-red hover:bg-red-700 rounded-lg transition-colors cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          Kaydet
        </button>
      </div>
    </form>
  );
}

function DeleteConfirm({ itemName, onConfirm, onCancel }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-sm text-red-700">
        <AlertTriangle className="w-4 h-4 shrink-0" />
        <span><strong>{itemName}</strong> silinecek. Emin misiniz?</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onCancel}
          className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
        >
          İptal
        </button>
        <button
          onClick={onConfirm}
          className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors cursor-pointer"
        >
          Sil
        </button>
      </div>
    </div>
  );
}

export default function MenuManager() {
  const menu = useMenu();
  const [editingKey, setEditingKey] = useState(null); // 'catIdx-itemIdx' or null
  const [addingCategory, setAddingCategory] = useState(null); // category index or null
  const [deletingKey, setDeletingKey] = useState(null); // 'catIdx-itemIdx' or null
  const [collapsedCategories, setCollapsedCategories] = useState({});

  const toggleCategory = (idx) => {
    setCollapsedCategories(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleEditSave = (catIdx, itemIdx, updatedItem) => {
    updateMenuItem(catIdx, itemIdx, updatedItem);
    setEditingKey(null);
  };

  const handleAddSave = (catIdx, newItem) => {
    addMenuItem(catIdx, newItem);
    setAddingCategory(null);
  };

  const handleDelete = (catIdx, itemIdx) => {
    deleteMenuItem(catIdx, itemIdx);
    setDeletingKey(null);
  };

  const totalItems = menu.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Menü Yönetimi</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          {menu.length} kategori, toplam {totalItems} ürün
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-6">
        {menu.map((category, catIdx) => {
          const isCollapsed = collapsedCategories[catIdx];
          const IconComp = categoryIcons[category.title] || UtensilsCrossed;

          return (
            <div key={catIdx} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Category Header */}
              <div
                className="flex items-center justify-between px-5 py-4 bg-gray-50 border-b border-gray-200 cursor-pointer select-none"
                onClick={() => toggleCategory(catIdx)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-porta-red/10 rounded-lg flex items-center justify-center">
                    <IconComp className="w-5 h-5 text-porta-red" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{category.title}</h3>
                    <span className="text-xs text-gray-500">{category.items.length} ürün</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setAddingCategory(addingCategory === catIdx ? null : catIdx);
                      setEditingKey(null);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-porta-red bg-porta-red/10 hover:bg-porta-red/20 rounded-lg transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Yeni Ürün Ekle
                  </button>
                  {isCollapsed ? (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              {!isCollapsed && (
                <div className="divide-y divide-gray-100">
                  {/* Add New Item Form */}
                  {addingCategory === catIdx && (
                    <div className="p-4 bg-green-50/50">
                      <p className="text-sm font-medium text-green-700 mb-3 flex items-center gap-1.5">
                        <Plus className="w-4 h-4" />
                        Yeni Ürün Ekle — {category.title}
                      </p>
                      <EditForm
                        item={{ name: '', desc: '', price: '', image: '' }}
                        onSave={(item) => handleAddSave(catIdx, item)}
                        onCancel={() => setAddingCategory(null)}
                      />
                    </div>
                  )}

                  {/* Items List */}
                  {category.items.map((item, itemIdx) => {
                    const key = `${catIdx}-${itemIdx}`;
                    const isEditing = editingKey === key;
                    const isDeleting = deletingKey === key;

                    return (
                      <div key={key} className={`${itemIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                        {isEditing ? (
                          <div className="p-4">
                            <EditForm
                              item={item}
                              onSave={(updated) => handleEditSave(catIdx, itemIdx, updated)}
                              onCancel={() => setEditingKey(null)}
                            />
                          </div>
                        ) : isDeleting ? (
                          <div className="p-4">
                            <DeleteConfirm
                              itemName={item.name}
                              onConfirm={() => handleDelete(catIdx, itemIdx)}
                              onCancel={() => setDeletingKey(null)}
                            />
                          </div>
                        ) : (
                          <div className="flex items-center justify-between px-5 py-3.5 group hover:bg-blue-50/30 transition-colors">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3">
                                <span className="text-xs text-gray-400 font-mono w-6 text-right">
                                  {itemIdx + 1}.
                                </span>
                                {/* Small Image Thumbnail in List */}
                                <div className="w-10 h-10 border border-gray-200 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden select-none">
                                  {item.image ? (
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                                  ) : (
                                    <span className="text-[10px] text-gray-400 font-medium">Yok</span>
                                  )}
                                </div>
                                <div className="min-w-0">
                                  <h4 className="text-sm font-medium text-gray-800">{item.name}</h4>
                                  <p className="text-xs text-gray-500 truncate">{item.desc}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 ml-4 shrink-0">
                              <span className="text-sm font-bold text-porta-dark bg-gray-100 px-3 py-1 rounded-lg">
                                {item.price}
                              </span>
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => {
                                    setEditingKey(key);
                                    setAddingCategory(null);
                                    setDeletingKey(null);
                                  }}
                                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                                  title="Düzenle"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    setDeletingKey(key);
                                    setEditingKey(null);
                                    setAddingCategory(null);
                                  }}
                                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                                  title="Sil"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {category.items.length === 0 && (
                    <div className="text-center py-8 text-gray-400 text-sm">
                      Bu kategoride ürün yok
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
