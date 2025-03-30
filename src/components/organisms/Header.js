import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaExchangeAlt, FaSearch, FaBell, FaUser } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Sayfa kaydırıldığında header arkaplan rengini değiştir
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center text-white">
              <FaExchangeAlt />
            </div>
            <span className={`font-serif ${isScrolled || location.pathname !== '/' ? 'text-dark-800' : 'text-white'}`}>
              TakasApp
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center space-x-8 ${isScrolled || location.pathname !== '/' ? 'text-dark-600' : 'text-white'}`}>
            <Link to="/" className={`font-medium transition-colors hover:text-primary-500 ${location.pathname === '/' ? 'border-b-2 border-primary-500' : ''}`}>
              Ana Sayfa
            </Link>
            <Link to="/nasil-calisir" className={`font-medium transition-colors hover:text-primary-500 ${location.pathname === '/nasil-calisir' ? 'border-b-2 border-primary-500' : ''}`}>
              Nasıl Çalışır?
            </Link>
            <Link to="/hakkimizda" className={`font-medium transition-colors hover:text-primary-500 ${location.pathname === '/hakkimizda' ? 'border-b-2 border-primary-500' : ''}`}>
              Hakkımızda
            </Link>
            <Link to="/iletisim" className={`font-medium transition-colors hover:text-primary-500 ${location.pathname === '/iletisim' ? 'border-b-2 border-primary-500' : ''}`}>
              
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/giris" className={`px-5 py-2.5 font-medium rounded-lg transition-colors ${isScrolled || location.pathname !== '/' ? 'text-primary-600 hover:bg-primary-50' : 'text-white hover:bg-white hover:bg-opacity-10'}`}>
              Giriş Yap
            </Link>
            <Link to="/kayit" className="px-5 py-2.5 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors shadow-md hover:shadow-lg">
              Üye Ol
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden focus:outline-none ${isScrolled || location.pathname !== '/' ? 'text-dark-800' : 'text-white'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t absolute top-full left-0 right-0 shadow-lg">
          <div className="container mx-auto px-6 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`text-dark-700 hover:text-primary-500 transition py-2 ${location.pathname === '/' ? 'font-medium text-primary-500' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Link 
                to="/nasil-calisir" 
                className={`text-dark-700 hover:text-primary-500 transition py-2 ${location.pathname === '/nasil-calisir' ? 'font-medium text-primary-500' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Nasıl Çalışır?
              </Link>
              <Link 
                to="/hakkimizda" 
                className={`text-dark-700 hover:text-primary-500 transition py-2 ${location.pathname === '/hakkimizda' ? 'font-medium text-primary-500' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Hakkımızda
              </Link>
              <Link 
                to="/iletisim" 
                className={`text-dark-700 hover:text-primary-500 transition py-2 ${location.pathname === '/iletisim' ? 'font-medium text-primary-500' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
            
              </Link>

              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
                <Link 
                  to="/giris" 
                  className="w-full px-4 py-3 text-center text-primary-600 border border-primary-500 font-medium rounded-lg hover:bg-primary-50 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Giriş Yap
                </Link>
                <Link 
                  to="/kayit" 
                  className="w-full px-4 py-3 text-center bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition shadow-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Üye Ol
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 