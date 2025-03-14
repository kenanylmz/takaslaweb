import React from 'react';
import { Link } from 'react-router-dom';
import { FaExchangeAlt, FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark-800 text-white mt-auto">
      {/* Top Wave */}
      <div className="bg-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="fill-current text-dark-800">
          <path d="M0,64L80,80C160,96,320,128,480,122.7C640,117,800,75,960,64C1120,53,1280,75,1360,85.3L1440,96L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
      
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div>
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white mb-6">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center text-white">
                <FaExchangeAlt />
              </div>
              <span className="font-serif">TakasApp</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Türkiye'nin en büyük ve güvenilir takas platformu. Kullanmadığın eşyaları değerlendirmenin en kolay yolu.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-colors">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-colors">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-colors">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-colors">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              <span className="relative z-10">Hızlı Linkler</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-primary-500"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link to="/nasil-calisir" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                  Nasıl Çalışır?
                </Link>
              </li>
              <li>
                <Link to="/hakkimizda" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link to="/iletisim" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              <span className="relative z-10">Yasal</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-primary-500"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/kullanici-sozlesmesi" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                  Kullanıcı Sözleşmesi
                </Link>
              </li>
              <li>
                <Link to="/gizlilik-politikasi" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link to="/cerez-politikasi" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                  Çerez Politikası
                </Link>
              </li>
              <li>
                <Link to="/kvkk" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                  KVKK
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              <span className="relative z-10">İletişim</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-primary-500"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  TakasApp A.Ş.<br />
                  Örnek Mahallesi, Takas Caddesi No:123<br />
                  İstanbul, Türkiye
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-primary-500 flex-shrink-0" />
                <span className="text-gray-400">+90 (212) 123 45 67</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary-500 flex-shrink-0" />
                <span className="text-gray-400">info@takasapp.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-700 mt-12 pt-8 text-center">
          <p className="text-gray-400 flex flex-wrap justify-center items-center gap-1">
            © {new Date().getFullYear()} TakasApp. Tüm hakları saklıdır. 
            <span className="flex items-center">
              <span>Türkiye'de</span>
              <FaHeart className="text-red-500 mx-1" size={14} />
              <span>ile tasarlandı</span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 