
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setIsScrolled(true);
    }
  }, [isHomePage]);

  const navigation = [
    { name: 'الرئيسية', href: '/' },
    { name: 'من نحن', href: '/about' },
    { name: 'أعمالنا', href: '/works' },
  ];

  const isActive = (href: string) => location.pathname === href;

  const handleNavClick = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const headerClasses = isHomePage 
    ? `fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`
    : 'bg-white shadow-sm sticky top-0 z-50';

  const textClasses = isHomePage
    ? `transition-colors duration-500 ${
        isScrolled ? 'text-gray-900' : 'text-white'
      }`
    : 'text-gray-900';

  const logoClasses = isHomePage
    ? `transition-colors duration-500 ${
        isScrolled ? 'bg-luxury-600' : 'bg-white/20 backdrop-blur-sm'
      }`
    : 'bg-luxury-600';

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* اللوجو */}
          <Link to="/" className="flex items-center" onClick={handleNavClick}>
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className={`w-8 h-8 ${logoClasses} rounded-lg flex items-center justify-center transition-colors duration-500`}>
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className={`font-tajawal font-bold text-xl ${textClasses}`}>لوكشري</span>
            </div>
          </Link>

          {/* القائمة الرئيسية */}
          <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={handleNavClick}
                className={`text-sm font-medium transition-colors duration-300 relative ${
                  isActive(item.href)
                    ? `${isHomePage && !isScrolled ? 'text-white' : 'text-luxury-600'}`
                    : `${textClasses} hover:text-luxury-600`
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <div className={`absolute bottom-[-6px] left-0 right-0 h-0.5 rounded-full transition-colors duration-500 ${
                    isHomePage && !isScrolled ? 'bg-white' : 'bg-luxury-600'
                  }`}></div>
                )}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={handleNavClick}
              className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                isHomePage && !isScrolled
                  ? 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                  : 'bg-luxury-600 text-white hover:bg-luxury-700'
              }`}
            >
              <Phone className="h-4 w-4" />
              <span>تواصل معنا</span>
            </Link>
          </nav>

          {/* زر القائمة للموبايل */}
          <div className="md:hidden flex items-center space-x-3 space-x-reverse">
            <Link
              to="/contact"
              onClick={handleNavClick}
              className={`flex items-center space-x-1 space-x-reverse px-3 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                isHomePage && !isScrolled
                  ? 'bg-white/20 backdrop-blur-sm text-white'
                  : 'bg-luxury-600 text-white'
              }`}
            >
              <Phone className="h-3 w-3" />
              <span>تواصل</span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${textClasses} hover:text-luxury-600 focus:outline-none transition-colors duration-300`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* القائمة المنسدلة للموبايل */}
        {isMenuOpen && (
          <div className={`md:hidden py-4 border-t transition-colors duration-500 ${
            isHomePage && !isScrolled 
              ? 'border-white/20' 
              : 'border-gray-200'
          }`}>
            <nav className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={handleNavClick}
                  className={`text-base font-medium px-3 py-2 rounded-md transition-colors duration-300 ${
                    isActive(item.href)
                      ? `${isHomePage && !isScrolled ? 'text-white bg-white/20' : 'text-luxury-600 bg-luxury-50'}`
                      : `${textClasses} hover:text-luxury-600 ${isHomePage && !isScrolled ? 'hover:bg-white/10' : 'hover:bg-luxury-50'}`
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
