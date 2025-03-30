import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Takasla</h3>
            <p className="text-gray-600 mb-4">
              Takasla platformu ile kullanmadığınız eşyaları takas ederek sürdürülebilir bir tüketim anlayışına katkıda bulunun.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary-500 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-500 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-500 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-500 transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary-500 transition-colors">Ana Sayfa</Link>
              </li>
              <li>
                <Link to="/kesfet" className="text-gray-600 hover:text-primary-500 transition-colors">Keşfet</Link>
              </li>
              <li>
                <Link to="/urun-ekle" className="text-gray-600 hover:text-primary-500 transition-colors">Ürün Ekle</Link>
              </li>
              <li>
                <Link to="/profil" className="text-gray-600 hover:text-primary-500 transition-colors">Profilim</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Kategoriler</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/kategori/elektronik" className="text-gray-600 hover:text-primary-500 transition-colors">Elektronik</Link>
              </li>
              <li>
                <Link to="/kategori/giyim" className="text-gray-600 hover:text-primary-500 transition-colors">Giyim</Link>
              </li>
              <li>
                <Link to="/kategori/kitap" className="text-gray-600 hover:text-primary-500 transition-colors">Kitap</Link>
              </li>
              <li>
                <Link to="/kategori/ev-esyalari" className="text-gray-600 hover:text-primary-500 transition-colors">Ev Eşyaları</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">İletişim</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/hakkimizda" className="text-gray-600 hover:text-primary-500 transition-colors">Hakkımızda</Link>
              </li>
              <li>
                <Link to="/sss" className="text-gray-600 hover:text-primary-500 transition-colors">Sık Sorulan Sorular</Link>
              </li>
              <li>
                <Link to="/gizlilik" className="text-gray-600 hover:text-primary-500 transition-colors">Gizlilik Politikası</Link>
              </li>
              <li>
                <Link to="/iletisim" className="text-gray-600 hover:text-primary-500 transition-colors">Bize Ulaşın</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Takasla. Tüm hakları saklıdır.
          </p>
          <p className="text-gray-600 flex items-center">
            <span>Sevgiyle yapıldı</span>
            <FaHeart className="text-red-500 mx-1" />
            <span>Türkiye</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 