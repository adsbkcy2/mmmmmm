
import { Link } from 'react-router-dom';
import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* اللوجو والوصف */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <div className="w-10 h-10 bg-luxury-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="font-tajawal font-bold text-2xl">لوكشري</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              نحن نقدم أفضل خدمات التصميم الداخلي والديكور لتحويل مساحاتكم إلى أماكن استثنائية تعكس ذوقكم الرفيع.
            </p>
          </div>

          {/* روابط سريعة */}
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  onClick={handleNavClick}
                  className="text-gray-300 hover:text-luxury-400 transition-colors duration-200"
                >
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  onClick={handleNavClick}
                  className="text-gray-300 hover:text-luxury-400 transition-colors duration-200"
                >
                  من نحن
                </Link>
              </li>
              <li>
                <Link 
                  to="/works" 
                  onClick={handleNavClick}
                  className="text-gray-300 hover:text-luxury-400 transition-colors duration-200"
                >
                  أعمالنا
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  onClick={handleNavClick}
                  className="text-gray-300 hover:text-luxury-400 transition-colors duration-200"
                >
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          {/* الخدمات */}
          <div>
            <h3 className="text-lg font-semibold mb-4">خدماتنا</h3>
            <ul className="space-y-2 text-gray-300">
              <li>التصميم الداخلي</li>
              <li>تصميم المكاتب</li>
              <li>الديكور المنزلي</li>
              <li>استشارات التصميم</li>
            </ul>
          </div>

          {/* معلومات التواصل */}
          <div>
            <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <MapPin className="h-5 w-5 text-luxury-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">القاهرة، مصر</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone className="h-5 w-5 text-luxury-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+20 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail className="h-5 w-5 text-luxury-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@luxury-design.com</span>
              </div>
            </div>

            {/* وسائل التواصل */}
            <div className="flex space-x-4 space-x-reverse mt-6">
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-luxury-400 transition-colors duration-200"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-luxury-400 transition-colors duration-200"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* خط الفاصل */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 لوكشري للتصميم الداخلي. جميع الحقوق محفوظة.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-400 text-sm text-center">
                تم التصميم و التطوير على يد شركة{' '}
                <a 
                  href="https://www.facebook.com/SOLOadseg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-luxury-400 hover:text-luxury-300 transition-colors duration-200"
                >
                  SOLO advertising
                </a>
              </p>
              <div className="flex justify-center space-x-4 space-x-reverse mt-2">
                <a 
                  href="https://www.facebook.com/SOLOadseg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-luxury-400 transition-colors duration-200 text-sm"
                >
                  Facebook
                </a>
                <a 
                  href="https://www.instagram.com/soloadseg/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-luxury-400 transition-colors duration-200 text-sm"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
