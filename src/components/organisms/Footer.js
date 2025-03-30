import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Takasla</h3>
            <p className="text-blue-100 mb-4">
              Takasla platformu ile kullanmadığınız eşyaları takas ederek sürdürülebilir bir tüketim anlayışına katkıda bulunun.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-100 hover:text-yellow-300 transition-colors">Ana Sayfa</Link>
              </li>
              <li>
                <Link to="/nasil-calisir" className="text-blue-100 hover:text-yellow-300 transition-colors">Nasıl Çalışır</Link>
              </li>
              <li>
                <Link to="/giris" className="text-blue-100 hover:text-yellow-300 transition-colors">Giriş Yap</Link>
              </li>
              <li>
                <Link to="/hakkimizda" className="text-blue-100 hover:text-yellow-300 transition-colors">Hakkımızda</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Kategoriler</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/hakkimizda" className="text-blue-100 hover:text-yellow-300 transition-colors">Elektronik</Link>
              </li>
              <li>
                <Link to="/hakkimizda" className="text-blue-100 hover:text-yellow-300 transition-colors">Giyim</Link>
              </li>
              <li>
                <Link to="/hakkimizda" className="text-blue-100 hover:text-yellow-300 transition-colors">Kitap</Link>
              </li>
              <li>
                <Link to="/hakkimizda" className="text-blue-100 hover:text-yellow-300 transition-colors">Ev Eşyaları</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">İletişim</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/hakkimizda" className="text-blue-100 hover:text-yellow-300 transition-colors">Hakkımızda</Link>
              </li>
              <li>
                <Link to="/hakkimizda" className="text-blue-100 hover:text-yellow-300 transition-colors">Sık Sorulan Sorular</Link>
              </li>
              <li>
                <Link to="/hakkimizda" className="text-blue-100 hover:text-yellow-300 transition-colors">Gizlilik Politikası</Link>
              </li>
              <li>
                <Link to="/hakkimizda" className="text-blue-100 hover:text-yellow-300 transition-colors">Bize Ulaşın</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-100 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Takasla. Tüm hakları saklıdır.
          </p>
          <p className="text-blue-100 flex items-center">
            <span>Sevgiyle yapıldı</span>
            <FaHeart className="text-yellow-300 mx-1" />
            <span>Türkiye</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 