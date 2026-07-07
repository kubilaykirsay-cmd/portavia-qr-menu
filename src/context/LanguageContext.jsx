import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  tr: {
    waiterCall: "Garson Çağır",
    waiterCalled: "Garson Çağrıldı!",
    waiterCalling: "Çağrı İletiliyor...",
    waiterCallDesc: "Masanıza garson çağırmak için formu onaylayın.",
    waiterCallSuccess: "Masa {table} için çağrı yapıldı. Garsonumuz en kısa sürede masanıza yönelecektir.",
    waiterCallChange: "Masa Numarasını Değiştir",
    waiterCallInputLabel: "Masa Numarası",
    waiterCallInputPlaceholder: "Örn: 5",
    cartTitle: "Sepetiniz",
    cartEmpty: "Sepetiniz henüz boş.",
    cartClear: "Sepeti Boşalt",
    cartTotal: "Toplam Tutar",
    cartComplete: "Siparişi Tamamla",
    cartItemRemoved: "Ürün sepetten çıkarıldı.",
    cartItemAdded: "Ürün sepete eklendi.",
    modalSize: "Boyut Seçimi",
    modalSut: "Süt Seçimi",
    modalSyrup: "Şurup Seçimi",
    modalExtra: "Ekstralar / Malzemeler",
    modalQuantity: "Adet",
    modalAddToCart: "Sepete Ekle",
    searchPlaceholder: "Ürünlerde arama yapın...",
    checkoutTitle: "Sipariş Detayları",
    checkoutTable: "Masa Numarası",
    checkoutNotes: "Sipariş Notu (İsteğe Bağlı)",
    checkoutNotesPlaceholder: "Örn: Alerjim var, sosu az olsun vb.",
    checkoutPayment: "Ödeme Yöntemi",
    checkoutCash: "Nakit Ödeme",
    checkoutCard: "Kredi Kartı",
    checkoutCompleteBtn: "Siparişi Gönder (₺{total})",
    checkoutSuccess: "Sipariş Başarıyla Alındı!",
    checkoutSuccessDesc: "Masa {table} için siparişiniz mutfağımıza iletildi. En kısa sürede hazırlanıp servis edilecektir.",
    checkoutBackMenu: "Menüye Dön",
    categoriesTitle: "Kategoriler",
    welcomeTitle: "Hoş Geldiniz",
    welcomeSubtitle: "Porta Via İtalyan Mutfağının En Seçkin Lezzetleri",
    currency: "₺",
    tableNo: "Masa",
    enableAudio: "Sesi Etkinleştir",
    audioActive: "Ses Aktif",
    // Category translations
    "Başlangıçlar": "Başlangıçlar",
    "Ana Yemekler": "Ana Yemekler",
    "Burgerler": "Burgerler",
    "Pizzalar": "Pizzalar",
    "Makarnalar": "Makarnalar",
    "Salatalar": "Salatalar",
    "Tatlılar": "Tatlılar",
    "İçecekler": "İçecekler",
    "Sıcak Kahveler": "Sıcak Kahveler",
    "Soğuk Kahveler": "Soğuk Kahveler",
    "Soğuk İçecekler": "Soğuk İçecekler"
  },
  en: {
    waiterCall: "Call Waiter",
    waiterCalled: "Waiter Called!",
    waiterCalling: "Sending Request...",
    waiterCallDesc: "Confirm the form to call a waiter to your table.",
    waiterCallSuccess: "Call sent for Table {table}. Our waiter will be with you shortly.",
    waiterCallChange: "Change Table Number",
    waiterCallInputLabel: "Table Number",
    waiterCallInputPlaceholder: "E.g., 5",
    cartTitle: "Your Cart",
    cartEmpty: "Your cart is empty.",
    cartClear: "Clear Cart",
    cartTotal: "Total Amount",
    cartComplete: "Complete Order",
    cartItemRemoved: "Item removed from cart.",
    cartItemAdded: "Item added to cart.",
    modalSize: "Size Selection",
    modalSut: "Milk Selection",
    modalSyrup: "Syrup Selection",
    modalExtra: "Extra Ingredients",
    modalQuantity: "Quantity",
    modalAddToCart: "Add to Cart",
    searchPlaceholder: "Search for items...",
    checkoutTitle: "Order Details",
    checkoutTable: "Table Number",
    checkoutNotes: "Order Note (Optional)",
    checkoutNotesPlaceholder: "E.g., I have an allergy, light sauce, etc.",
    checkoutPayment: "Payment Method",
    checkoutCash: "Cash Payment",
    checkoutCard: "Credit Card",
    checkoutCompleteBtn: "Submit Order (₺{total})",
    checkoutSuccess: "Order Received Successfully!",
    checkoutSuccessDesc: "Your order for Table {table} has been sent to our kitchen. It will be prepared and served shortly.",
    checkoutBackMenu: "Back to Menu",
    categoriesTitle: "Categories",
    welcomeTitle: "Welcome",
    welcomeSubtitle: "The Most Exclusive Flavors of Porta Via Italian Cuisine",
    currency: "₺",
    tableNo: "Table",
    enableAudio: "Enable Audio",
    audioActive: "Audio Active",
    // Category translations
    "Başlangıçlar": "Starters",
    "Ana Yemekler": "Main Courses",
    "Burgerler": "Burgers",
    "Pizzalar": "Pizzas",
    "Makarnalar": "Pasta",
    "Salatalar": "Salads",
    "Tatlılar": "Desserts",
    "İçecekler": "Drinks",
    "Sıcak Kahveler": "Hot Coffees",
    "Soğuk Kahveler": "Iced Coffees",
    "Soğuk İçecekler": "Cold Beverages",
    menuHeaderTitle: "Lezzet Menümüz",
    menuHeaderSubtitle: "Taze malzemeler ve ustalıkla hazırlanan menümüzü keşfedin.",
    customizable: "Özelleştirilebilir",
    singleSelect: "Tekli Seçim",
    multiSelect: "Çoklu Seçim"
  },
  en: {
    waiterCall: "Call Waiter",
    waiterCalled: "Waiter Called!",
    waiterCalling: "Sending Request...",
    waiterCallDesc: "Confirm the form to call a waiter to your table.",
    waiterCallSuccess: "Call sent for Table {table}. Our waiter will be with you shortly.",
    waiterCallChange: "Change Table Number",
    waiterCallInputLabel: "Table Number",
    waiterCallInputPlaceholder: "E.g., 5",
    cartTitle: "Your Cart",
    cartEmpty: "Your cart is empty.",
    cartClear: "Clear Cart",
    cartTotal: "Total Amount",
    cartComplete: "Complete Order",
    cartItemRemoved: "Item removed from cart.",
    cartItemAdded: "Item added to cart.",
    modalSize: "Size Selection",
    modalSut: "Milk Selection",
    modalSyrup: "Syrup Selection",
    modalExtra: "Extra Ingredients",
    modalQuantity: "Quantity",
    modalAddToCart: "Add to Cart",
    searchPlaceholder: "Search for items...",
    checkoutTitle: "Order Details",
    checkoutTable: "Table Number",
    checkoutNotes: "Order Note (Optional)",
    checkoutNotesPlaceholder: "E.g., I have an allergy, light sauce, etc.",
    checkoutPayment: "Payment Method",
    checkoutCash: "Cash Payment",
    checkoutCard: "Credit Card",
    checkoutCompleteBtn: "Submit Order (₺{total})",
    checkoutSuccess: "Order Received Successfully!",
    checkoutSuccessDesc: "Your order for Table {table} has been sent to our kitchen. It will be prepared and served shortly.",
    checkoutBackMenu: "Back to Menu",
    categoriesTitle: "Categories",
    welcomeTitle: "Welcome",
    welcomeSubtitle: "The Most Exclusive Flavors of Porta Via Italian Cuisine",
    currency: "₺",
    tableNo: "Table",
    enableAudio: "Enable Audio",
    audioActive: "Audio Active",
    // Category translations
    "Başlangıçlar": "Starters",
    "Ana Yemekler": "Main Courses",
    "Burgerler": "Burgers",
    "Pizzalar": "Pizzas",
    "Makarnalar": "Pasta",
    "Salatalar": "Salads",
    "Tatlılar": "Desserts",
    "İçecekler": "Drinks",
    "Sıcak Kahveler": "Hot Coffees",
    "Soğuk Kahveler": "Iced Coffees",
    "Soğuk İçecekler": "Cold Beverages",
    menuHeaderTitle: "Our Menu",
    menuHeaderSubtitle: "Discover our delicious menu crafted with fresh ingredients.",
    customizable: "Customizable",
    singleSelect: "Single Choice",
    multiSelect: "Multiple Choice"
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('portavia_lang') || 'tr';
  });

  useEffect(() => {
    localStorage.setItem('portavia_lang', language);
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  const translateDesc = (desc) => {
    if (!desc) return '';
    if (!desc.includes('/')) return desc;
    const parts = desc.split('/');
    return language === 'tr' ? parts[0].trim() : parts[1].trim();
  };

  const translateOption = (itemText) => {
    if (language === 'tr' || !itemText) return itemText;
    return itemText
      .replace('Küçük', 'Small')
      .replace('Orta', 'Medium')
      .replace('Büyük', 'Large')
      .replace('Tek', 'Single')
      .replace('Double', 'Double')
      .replace('Normal Süt', 'Regular Milk')
      .replace('Laktozsuz Süt', 'Lactose-Free Milk')
      .replace('Soya Sütü', 'Soy Milk')
      .replace('Badem Sütü', 'Almond Milk')
      .replace('Yulaf Sütü', 'Oat Milk')
      .replace('Şurupsuz', 'No Syrup')
      .replace('Karamel Şurubu', 'Caramel Syrup')
      .replace('Vanilya Şurubu', 'Vanilla Syrup')
      .replace('Fındık Şurubu', 'Hazelnut Syrup')
      .replace('Çikolata Şurubu', 'Chocolate Syrup')
      .replace('Sütlü', 'With Milk');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateDesc, translateOption }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
