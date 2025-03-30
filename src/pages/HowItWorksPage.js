import React from 'react';
import { Link } from 'react-router-dom';
import { FaExchangeAlt, FaCamera, FaHandshake, FaUserPlus, FaRegThumbsUp, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Takasla Nasıl Çalışır?</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Takasla ile kullanmadığınız eşyaları takas ederek sürdürülebilir bir tüketim alışkanlığı edinebilirsiniz. İşte Takasla'yı kullanmanın birkaç basit adımı:
            </p>
          </div>
        </div>
        
        {/* Steps Section */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:transform hover:scale-105">
                  <div className="bg-blue-800 text-white p-6 flex justify-center">
                    <FaUserPlus className="text-6xl" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-blue-900 mb-4">1. Kayıt Ol</h3>
                    <p className="text-gray-600">
                      Takasla'ya ücretsiz bir şekilde kayıt olun. Email adresiniz ve şifrenizle hemen başlayabilirsiniz.
                    </p>
                    <Link to="/kayit" className="mt-6 inline-block text-blue-600 font-medium hover:text-blue-800">
                      Hemen Kayıt Ol <FaArrowRight className="inline ml-1" />
                    </Link>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:transform hover:scale-105">
                  <div className="bg-blue-700 text-white p-6 flex justify-center">
                    <FaCamera className="text-6xl" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-blue-900 mb-4">2. Ürün Ekle</h3>
                    <p className="text-gray-600">
                      Takas etmek istediğiniz eşyaları fotoğraflayın, bilgilerini girin ve platformda paylaşın.
                    </p>
                    <Link to="/giris" className="mt-6 inline-block text-blue-600 font-medium hover:text-blue-800">
                      Ürün Eklemek İçin Giriş Yap <FaArrowRight className="inline ml-1" />
                    </Link>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:transform hover:scale-105">
                  <div className="bg-blue-600 text-white p-6 flex justify-center">
                    <FaExchangeAlt className="text-6xl" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-blue-900 mb-4">3. Takas Yap</h3>
                    <p className="text-gray-600">
                      Beğendiğiniz ürünler için takas teklifleri gönderin veya gelen teklifleri değerlendirin.
                    </p>
                    <Link to="/kesfet" className="mt-6 inline-block text-blue-600 font-medium hover:text-blue-800">
                      Ürünleri Keşfet <FaArrowRight className="inline ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Takasla Avantajları</h2>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-yellow-100 p-4 rounded-full">
                      <FaRegThumbsUp className="text-yellow-500 text-2xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Ekonomik</h3>
                    <p className="text-gray-600">
                      Para harcamadan ihtiyaçlarınızı karşılayın. Takasla ile sadece kullanmadığınız eşyaları vererek yeni eşyalar kazanın.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-green-100 p-4 rounded-full">
                      <FaMapMarkerAlt className="text-green-500 text-2xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Yakınınızda</h3>
                    <p className="text-gray-600">
                      Konumunuza yakın insanlarla takas yapın. Kargo masrafı olmadan, çevre dostu bir şekilde alışveriş yapın.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-blue-100 p-4 rounded-full">
                      <FaHandshake className="text-blue-500 text-2xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Güvenli</h3>
                    <p className="text-gray-600">
                      Kullanıcı puanlama sistemi ile güvenli takaslar. Daha önce takas yapmış kullanıcıların değerlendirmeleri ile güvenilir kişilerle takas yapın.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-purple-100 p-4 rounded-full">
                      <FaExchangeAlt className="text-purple-500 text-2xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Çeşitlilik</h3>
                    <p className="text-gray-600">
                      Elektronikten giyime, kitaplardan ev eşyalarına kadar birçok farklı kategoride ürün. İhtiyacınız olan her şeyi Takasla'da bulabilirsiniz.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Hemen Takas Yapmaya Başlayın!</h2>
            <p className="text-lg text-blue-800 max-w-2xl mx-auto mb-8">
              Daha sürdürülebilir bir hayat için bugün Takasla'ya katılın ve eşyalarınıza yeni bir hayat verin.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/kayit" 
                className="bg-blue-900 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-800 transition-colors"
              >
                Hemen Kayıt Ol
              </Link>
              <Link 
                to="/kesfet" 
                className="bg-white text-blue-900 py-3 px-8 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Ürünleri Keşfet
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HowItWorksPage; 