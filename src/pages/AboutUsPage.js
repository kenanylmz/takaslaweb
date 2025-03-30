import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaBullseye, FaUsers, FaLeaf, FaHandshake } from 'react-icons/fa';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Takasla Hakkında</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Kullanmadığınız eşyaları değerlendirmenin en kolay ve çevreci yolunu sunuyoruz.
            </p>
          </div>
        </div>
        
        {/* Our Story Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Hikayemiz</h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p>
                  Takasla, 2023 yılında sürdürülebilir tüketimi teşvik etmek ve insanların kullanmadıkları eşyaları kolayca değerlendirebilecekleri bir platform sunmak amacıyla kuruldu.
                </p>
                <p>
                  Ekibimiz, tüketim alışkanlıklarımızın çevreye verdiği zararı azaltmak ve insanların ihtiyaçlarını karşılarken gereksiz harcamalardan kaçınmalarını sağlamak için yola çıktı.
                </p>
                <p>
                  Bugün Takasla, Türkiye'nin dört bir yanından binlerce kullanıcının takas yaptığı, çevre dostu ve ekonomik bir alışveriş deneyimi sunan bir platform haline geldi.
                </p>
                <p>
                  Vizyonumuz, sürdürülebilir tüketimi yaygınlaştırmak ve toplumumuzda paylaşım ekonomisini güçlendirerek daha az tüketen, daha çok değer üreten bir dünya yaratmaktır.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Values Section */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">Değerlerimiz</h2>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <FaBullseye className="text-blue-600 text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-900">Sürdürülebilirlik</h3>
                  </div>
                  <p className="text-gray-600">
                    Her takas, yeni bir ürünün üretilmesini engelleyerek karbon ayak izini azaltır. Takasla ile çevreyi koruyarak ihtiyaçlarınızı karşılayabilirsiniz.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <FaLeaf className="text-green-600 text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-900">Çevre Duyarlılığı</h3>
                  </div>
                  <p className="text-gray-600">
                    Kullanılmayan eşyaları çöpe atmak yerine yeniden değerlendirerek atık miktarını azaltıyoruz. Takasla sayesinde eşyaların ömrünü uzatıyoruz.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="bg-yellow-100 p-3 rounded-full mr-4">
                      <FaUsers className="text-yellow-600 text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-900">Topluluk</h3>
                  </div>
                  <p className="text-gray-600">
                    Takasla, benzer değerleri paylaşan insanların bir araya geldiği bir topluluktur. Birlikte daha sürdürülebilir bir gelecek için çalışıyoruz.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <FaHandshake className="text-red-600 text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-900">Güven</h3>
                  </div>
                  <p className="text-gray-600">
                    Platformumuzda güvenli bir takas deneyimi sunmak için çalışıyoruz. Kullanıcı değerlendirmeleri ve şeffaf politikalarımızla güven ortamı yaratıyoruz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">Bize Ulaşın</h2>
            
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <div className="bg-blue-50 p-8 rounded-xl">
                  <div className="flex flex-col space-y-6">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <FaMapMarkerAlt className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Adres</h4>
                        <p className="text-gray-600">
                          Atatürk Mah. Cumhuriyet Cad. No:123<br/>
                          Kadıköy, İstanbul, Türkiye
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <FaPhone className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Telefon</h4>
                        <p className="text-gray-600">+90 (212) 123 45 67</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <FaEnvelope className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">E-posta</h4>
                        <p className="text-gray-600">info@takasla.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <FaClock className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Çalışma Saatleri</h4>
                        <p className="text-gray-600">
                          Pazartesi - Cuma: 09:00 - 18:00<br/>
                          Hafta sonu: Kapalı
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-blue-50 p-8 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-900 mb-6">Mesaj Gönderin</h3>
                  
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Adınız Soyadınız
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Adınız Soyadınız"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        E-posta Adresiniz
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="ornek@mail.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Mesajınız
                      </label>
                      <textarea 
                        id="message" 
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Mesajınızı buraya yazın..."
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Gönder
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section (Simplified) */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">Sık Sorulan Sorular</h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Takasla'yı kullanmak için ücret ödemem gerekiyor mu?</h3>
                  <p className="text-gray-600">Hayır, Takasla'ya üye olmak ve platformu kullanmak tamamen ücretsizdir.</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Takasla nasıl para kazanıyor?</h3>
                  <p className="text-gray-600">Takasla, kullanıcıların öne çıkan ilanları ve premium üyelik gibi ek hizmetlerden gelir elde etmektedir.</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Takas yaparken güvenliğimi nasıl sağlayabilirim?</h3>
                  <p className="text-gray-600">Takas öncesi kullanıcı değerlendirmelerini kontrol edin, halka açık ve güvenli yerlerde buluşun ve mümkünse yanınızda birini getirin.</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Bir sorun olduğunda nasıl yardım alabilirim?</h3>
                  <p className="text-gray-600">Herhangi bir sorun yaşadığınızda info@takasla.com adresine e-posta gönderebilir veya iletişim formunu kullanabilirsiniz.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutUsPage; 