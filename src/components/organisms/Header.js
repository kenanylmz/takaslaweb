import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUser,
  FaHome,
  FaExchangeAlt,
  FaListAlt,
  FaPlus,
  FaBell,
  FaSearch,
} from "react-icons/fa";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    // Token kontrolü ile giriş durumunu belirle
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/giris";
  };

  return (
    <header className="fixed w-full z-50 shadow-md bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link
            to="/"
            className="text-2xl font-bold text-primary-600 flex items-center"
          >
            <FaExchangeAlt className="mr-2 transform -rotate-12" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
              Takasla
            </span>
          </Link>

          {/* Mobil menü butonu */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 hover:text-primary-500 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Masaüstü menü */}
          <nav className="hidden md:flex items-center space-x-1">
            {isLoggedIn ? (
              // Giriş yapılmış menü - Yeni Tasarım
              <div className="flex items-center space-x-1">
                <Link
                  to="/"
                  className="px-3 py-2 rounded-md text-gray-600 hover:text-primary-500 hover:bg-gray-50 transition-all flex items-center"
                >
                  <FaHome className="mr-1.5" />
                  <span>Ana Sayfa</span>
                </Link>

                <Link
                  to="/kesfet"
                  className="px-3 py-2 rounded-md text-gray-600 hover:text-primary-500 hover:bg-gray-50 transition-all flex items-center"
                >
                  <FaSearch className="mr-1.5" />
                  <span>Keşfet</span>
                </Link>

                <Link
                  to="/ilanlarim"
                  className="px-3 py-2 rounded-md text-gray-600 hover:text-primary-500 hover:bg-gray-50 transition-all flex items-center"
                >
                  <FaListAlt className="mr-1.5" />
                  <span>İlanlarım</span>
                </Link>

                <Link
                  to="/ilan-ekle"
                  className="px-3 py-2 rounded-md text-gray-600 hover:text-primary-500 hover:bg-gray-50 transition-all flex items-center"
                >
                  <FaPlus className="mr-1.5" />
                  <span>İlan Ekle</span>
                </Link>

                <div className="pl-3 border-l border-gray-200 ml-1">
                  <Link
                    to="/profil"
                    className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 hover:bg-primary-50 text-gray-700 hover:text-primary-600 transition-all"
                  >
                    <FaUser className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            ) : (
              // Giriş yapılmamış menü
              <>
                <Link
                  to="/"
                  className="px-3 py-2 rounded-md text-gray-600 hover:text-primary-500 hover:bg-gray-50 transition-all"
                >
                  Ana Sayfa
                </Link>
                <Link
                  to="/nasil-calisir"
                  className="px-3 py-2 rounded-md text-gray-600 hover:text-primary-500 hover:bg-gray-50 transition-all"
                >
                  Nasıl Çalışır?
                </Link>
                <Link
                  to="/hakkimizda"
                  className="px-3 py-2 rounded-md text-gray-600 hover:text-primary-500 hover:bg-gray-50 transition-all"
                >
                  Hakkımızda
                </Link>
                <Link
                  to="/giris"
                  className="px-3 py-2 rounded-md text-primary-500 hover:text-primary-600 hover:bg-primary-50 transition-all font-medium"
                >
                  Giriş Yap
                </Link>
                <Link
                  to="/kayit"
                  className="px-3 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-all shadow-sm"
                >
                  Üye Ol
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Mobil menü (açılır kapanır) */}
        <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-4 space-y-1 border-t border-gray-200">
            {isLoggedIn ? (
              // Giriş yapılmış mobil menü
              <>
                <Link
                  to="/"
                  className="block px-3 py-2 text-gray-600 hover:text-primary-500 hover:bg-gray-50 rounded-md flex items-center"
                >
                  <FaHome className="mr-2" /> Ana Sayfa
                </Link>
                <Link
                  to="/kesfet"
                  className="block px-3 py-2 text-gray-600 hover:text-primary-500 hover:bg-gray-50 rounded-md flex items-center"
                >
                  <FaSearch className="mr-2" /> Keşfet
                </Link>
                <Link
                  to="/ilanlarim"
                  className="block px-3 py-2 text-gray-600 hover:text-primary-500 hover:bg-gray-50 rounded-md flex items-center"
                >
                  <FaListAlt className="mr-2" /> İlanlarım
                </Link>
                <Link
                  to="/ilan-ekle"
                  className="block px-3 py-2 text-gray-600 hover:text-primary-500 hover:bg-gray-50 rounded-md flex items-center"
                >
                  <FaPlus className="mr-2" /> İlan Ekle
                </Link>
                <Link
                  to="/profil"
                  className="block px-3 py-2 text-gray-600 hover:text-primary-500 hover:bg-gray-50 rounded-md flex items-center"
                >
                  <FaUser className="mr-2" /> Profilim
                </Link>
              </>
            ) : (
              // Giriş yapılmamış mobil menü
              <>
                <Link
                  to="/"
                  className="block px-3 py-2 text-gray-600 hover:text-primary-500 hover:bg-gray-50 rounded-md"
                >
                  Ana Sayfa
                </Link>
                <Link
                  to="/nasil-calisir"
                  className="block px-3 py-2 text-gray-600 hover:text-primary-500 hover:bg-gray-50 rounded-md"
                >
                  Nasıl Çalışır?
                </Link>
                <Link
                  to="/hakkimizda"
                  className="block px-3 py-2 text-gray-600 hover:text-primary-500 hover:bg-gray-50 rounded-md"
                >
                  Hakkımızda
                </Link>
                <Link
                  to="/giris"
                  className="block px-3 py-2 text-primary-500 hover:text-primary-600 hover:bg-gray-50 rounded-md font-medium"
                >
                  Giriş Yap
                </Link>
                <Link
                  to="/kayit"
                  className="block px-3 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                >
                  Üye Ol
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
