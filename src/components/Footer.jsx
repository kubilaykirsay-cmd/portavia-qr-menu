import { MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-porta-dark text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="inline-block font-heading font-bold text-3xl tracking-tighter text-white mb-6">
              Porta Via<span className="text-porta-red">.</span>
            </a>
            <p className="text-gray-400 font-light leading-relaxed mb-6">
              Ankara’da ince hamurlu butik pizzalar, taze makarnalar ve sıcak İtalyan sofrası deneyimi.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-porta-red transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="#" aria-label="Google Maps" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-porta-green transition-colors">
                <MapPin size={20} />
              </a>
              <a href="tel:+903124381721" aria-label="Phone" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-porta-dark transition-colors">
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Hızlı Menü</h4>
            <ul className="space-y-4">
              <li><a href="/menu" className="text-gray-400 hover:text-white transition-colors">Menüyü İncele</a></li>
              <li><a href="/#hakkimizda" className="text-gray-400 hover:text-white transition-colors">Hakkımızda</a></li>
              <li><a href="/#deneyim" className="text-gray-400 hover:text-white transition-colors">Mekan Deneyimi</a></li>
              <li><a href="/#siparis" className="text-gray-400 hover:text-white transition-colors">Sipariş Ver</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">İletişim</h4>
            <ul className="space-y-4">
              <li><a href="#iletisim" className="text-gray-400 hover:text-white transition-colors">Şubeler</a></li>
              <li><a href="tel:+903124381721" className="text-gray-400 hover:text-white transition-colors">+90 312 438 17 21</a></li>
              <li><a href="mailto:info@portaviapizza.com" className="text-gray-400 hover:text-white transition-colors">info@portaviapizza.com</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Yasal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Gizlilik Politikası</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Kullanım Koşulları</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Çerez Politikası</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; 2026 Porta Via Pizza. Tüm hakları saklıdır.
          </p>
          <div className="text-gray-500 text-sm">
            Designed with <span className="text-porta-red">♥</span> for Pizza Lovers
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
