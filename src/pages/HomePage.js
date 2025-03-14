import React from "react";
import { Link } from "react-router-dom";
import {
  FaExchangeAlt,
  FaUsers,
  FaShieldAlt,
  FaMobileAlt,
  FaLeaf,
  FaSearch,
  FaArrowRight,
  FaClock,
} from "react-icons/fa";
import Header from "../components/organisms/Header";
import Footer from "../components/organisms/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Hero Section - Modern ve Temiz */}
      <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-r from-primary-600 to-primary-500">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 800 800">
            <defs>
              <pattern
                id="pattern-circles"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
                patternContentUnits="userSpaceOnUse"
              >
                <circle
                  id="pattern-circle"
                  cx="10"
                  cy="10"
                  r="1.6257413380501518"
                  fill="#fff"
                ></circle>
              </pattern>
            </defs>
            <rect width="800" height="800" fill="url(#pattern-circles)"></rect>
          </svg>
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <span className="inline-block px-4 py-2 rounded-full bg-white bg-opacity-20 text-white text-sm font-medium mb-6">
                Türkiye'nin En Büyük Takas Platformu
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-white leading-tight">
                Eşyalarını Değerlendir,{" "}
                <span className="text-yellow-300">Takas Yap!</span>
              </h1>
              <p className="text-lg md:text-xl text-white opacity-90 mb-8 font-light max-w-lg">
                Kullanmadığın eşyaları ihtiyacın olanlarla değiştir. Çevreci,
                ekonomik ve tamamen ücretsiz takas platformu.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/kayit"
                  className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-opacity-90 transition text-center shadow-lg transform hover:-translate-y-1 duration-200 flex items-center justify-center gap-2"
                >
                  Hemen Başla <FaArrowRight />
                </Link>
                <Link
                  to="/giris"
                  className="px-8 py-4 bg-transparent border-2 border-white font-semibold rounded-xl hover:bg-white hover:text-primary-600 transition text-white text-center transform hover:-translate-y-1 duration-200"
                >
                  Giriş Yap
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="absolute top-0 -left-10 w-40 h-40 bg-secondary-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 -right-10 w-40 h-40 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-10 left-10 w-40 h-40 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

              <div className="relative rounded-2xl bg-white shadow-2xl overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Takas Uygulaması"
                  className="rounded-2xl"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <div className="flex items-center gap-2 text-white">
                    <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-sm font-medium">
                      4,235 kişi şu an aktif
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Arama Bölümü */}
      <section className="py-8 relative -mt-8">
        <div className="container mx-auto px-6">
          <div className="bg-white shadow-card rounded-xl p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Ne arıyorsun? (örn. bisiklet, kitap, mobilya)"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition">
                Hemen Ara
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Gelişmiş Görünüm */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-dark-800">
              Neden TakasApp?
            </h2>
            <p className="text-lg text-dark-500">
              Binlerce kullanıcı ile büyüyen topluluğumuzda eşyalarınızı güvenle
              değiştirin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white border border-gray-100 p-8 rounded-xl shadow-soft text-center hover:shadow-card transition-shadow group">
              <div className="inline-flex items-center justify-center h-16 w-16 bg-primary-100 text-primary-600 rounded-lg mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                <FaExchangeAlt className="text-2xl" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3 group-hover:text-primary-600 transition-colors">
                Kolay Takas
              </h3>
              <p className="text-dark-500">
                Birkaç tıklama ile eşyalarını güvenle takas edebilirsin.
              </p>
            </div>

            <div className="bg-white border border-gray-100 p-8 rounded-xl shadow-soft text-center hover:shadow-card transition-shadow group">
              <div className="inline-flex items-center justify-center h-16 w-16 bg-primary-100 text-primary-600 rounded-lg mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                <FaUsers className="text-2xl" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3 group-hover:text-primary-600 transition-colors">
                Geniş Topluluk
              </h3>
              <p className="text-dark-500">
                Binlerce kullanıcı arasında ihtiyacın olan eşyayı bulabilirsin.
              </p>
            </div>

            <div className="bg-white border border-gray-100 p-8 rounded-xl shadow-soft text-center hover:shadow-card transition-shadow group">
              <div className="inline-flex items-center justify-center h-16 w-16 bg-primary-100 text-primary-600 rounded-lg mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                <FaShieldAlt className="text-2xl" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3 group-hover:text-primary-600 transition-colors">
                Güvenli İşlem
              </h3>
              <p className="text-dark-500">
                Kontrollü takas sistemi ile güvenli alışveriş imkanı.
              </p>
            </div>

            <div className="bg-white border border-gray-100 p-8 rounded-xl shadow-soft text-center hover:shadow-card transition-shadow group">
              <div className="inline-flex items-center justify-center h-16 w-16 bg-primary-100 text-primary-600 rounded-lg mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                <FaMobileAlt className="text-2xl" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3 group-hover:text-primary-600 transition-colors">
                Mobil Erişim
              </h3>
              <p className="text-dark-500">
                Hem web hem de mobil uygulama ile her yerden erişim.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nasıl Çalışır Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-dark-800">
              Nasıl Çalışır?
            </h2>
            <p className="text-lg text-dark-500">
              Sadece 3 adımda takas işlemini tamamlayabilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-soft p-8 relative">
              <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div className="mb-6">
                <div className="inline-flex items-center justify-center h-16 w-16 bg-primary-100 text-primary-600 rounded-lg">
                  <FaSearch className="text-2xl" />
                </div>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3">
                Eşyaları Listele
              </h3>
              <p className="text-dark-500">
                Değiştirmek istediğin eşyaları platformumuza yükle ve detaylı
                olarak açıkla.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-soft p-8 relative mt-8 md:mt-0">
              <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div className="mb-6">
                <div className="inline-flex items-center justify-center h-16 w-16 bg-primary-100 text-primary-600 rounded-lg">
                  <FaExchangeAlt className="text-2xl" />
                </div>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3">
                Takas Teklifi Ver/Al
              </h3>
              <p className="text-dark-500">
                Beğendiğin eşyalar için teklif ver veya kendi eşyalarına gelen
                teklifleri değerlendir.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-soft p-8 relative mt-8 md:mt-0">
              <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div className="mb-6">
                <div className="inline-flex items-center justify-center h-16 w-16 bg-primary-100 text-primary-600 rounded-lg">
                  <FaLeaf className="text-2xl" />
                </div>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3">
                Takası Tamamla
              </h3>
              <p className="text-dark-500">
                Anlaştığın kişi ile buluşarak takası tamamla ve mutlu ayrıl!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* İstatistikler Section */}
      <section className="py-16 bg-primary-500 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">10,000+</div>
              <div className="text-xl font-light">Aylık Aktif Kullanıcı</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">25,000+</div>
              <div className="text-xl font-light">Tamamlanan Takas</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">50,000+</div>
              <div className="text-xl font-light">Listelenen Eşya</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-dark-800">
              Kullanıcılarımız Ne Diyor?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-100 p-8 rounded-xl shadow-soft">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                  <img
                    src="https://randomuser.me/api/portraits/women/12.jpg"
                    alt="User"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Ayşe Yılmaz</h4>
                  <div className="text-primary-500 flex">★★★★★</div>
                </div>
              </div>
              <p className="text-dark-500 italic">
                "Kullanmadığım bisikletimi yeni bir tablet ile takas ettim.
                Süreç çok kolay ve güvenliydi. Kesinlikle tavsiye ediyorum!"
              </p>
            </div>

            <div className="bg-white border border-gray-100 p-8 rounded-xl shadow-soft">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="User"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Mehmet Kaya</h4>
                  <div className="text-primary-500 flex">★★★★★</div>
                </div>
              </div>
              <p className="text-dark-500 italic">
                "Kitap koleksiyonumu yenilemek için harika bir platform. Şimdiye
                kadar 15'ten fazla kitap takası yaptım ve hepsinden memnun
                kaldım."
              </p>
            </div>

            <div className="bg-white border border-gray-100 p-8 rounded-xl shadow-soft">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                  <img
                    src="https://randomuser.me/api/portraits/women/68.jpg"
                    alt="User"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Zeynep Demir</h4>
                  <div className="text-primary-500 flex">★★★★★</div>
                </div>
              </div>
              <p className="text-dark-500 italic">
                "Evdeki fazla eşyalarımı değerlendirmek için mükemmel bir yol.
                Hem para harcamıyorum hem de çevreye katkı sağlıyorum."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Yeni Tasarım */}
      <section className="relative py-20 overflow-hidden bg-dark-800 text-white">
        <div className="absolute top-0 right-0 -mt-16 -mr-16">
          <svg
            width="256"
            height="256"
            viewBox="0 0 256 256"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="128" cy="128" r="128" fill="white" fillOpacity="0.05" />
            <circle cx="128" cy="128" r="96" fill="white" fillOpacity="0.05" />
            <circle cx="128" cy="128" r="64" fill="white" fillOpacity="0.05" />
          </svg>
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Tükenmeyen Ekonomiye Sen de Katıl!
            </h2>
            <p className="text-xl mb-10 text-gray-300 font-light max-w-xl mx-auto">
              Kullanmadığın eşyaları değerlendirmek ve ihtiyacın olanları bulmak
              için hemen üye ol.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/kayit"
                className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition shadow-lg transform hover:-translate-y-1 duration-200 w-full sm:w-auto text-center"
              >
                Ücretsiz Üye Ol
              </Link>
              <Link
                to="/nasil-calisir"
                className="px-8 py-4 bg-transparent border border-white text-white font-semibold rounded-xl hover:bg-white hover:text-dark-800 transition w-full sm:w-auto text-center"
              >
                Nasıl Çalışır?
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-2 text-gray-400">
              <FaClock className="text-primary-400" />
              <span>Sadece 1 dakikada kayıt ol ve takasa başla!</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Custom Animation CSS*/}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
