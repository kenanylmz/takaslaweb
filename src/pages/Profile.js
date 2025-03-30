import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope, FaSignOutAlt, 
  FaCog, FaEdit, FaExchangeAlt, FaShoppingBag, FaStar, 
  FaCalendarAlt, FaHistory, FaHeart, FaIdCard
} from 'react-icons/fa';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/giris');
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Profil bilgileri alınamadı');
        }

        const data = await response.json();
        setUser(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Profil yükleme hatası:', error);
        setError('Profil bilgileri yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/giris');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-gray-200 h-24 w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mt-6"></div>
          <div className="h-3 bg-gray-200 rounded w-24 mt-3"></div>
          <div className="h-3 bg-gray-200 rounded w-40 mt-3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="pt-24 pb-12 flex-1">
        <div className="container mx-auto px-4">
          {/* Profil Başlık */}
          <div className="relative mb-8">
            <div className="h-40 bg-gradient-to-r from-primary-600 to-primary-400 rounded-t-xl"></div>
            
            <div className="absolute -bottom-16 left-8 flex items-end">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white overflow-hidden shadow-lg">
                {user?.profileImage && user.profileImage !== 'default-profile.jpg' ? (
                  <img 
                    src={`http://localhost:3001/uploads/${user.profileImage}`}
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-primary-500">
                    <FaUser size={64} />
                  </div>
                )}
              </div>
              
              <div className="ml-4 mb-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
                <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
                <p className="text-gray-600 flex items-center mt-1">
                  <FaEnvelope className="mr-2 text-primary-500" /> {user?.email}
                </p>
              </div>
            </div>
            
            <div className="absolute top-4 right-4 flex gap-2">
              <Link 
                to="/profil-duzenle" 
                className="bg-white text-primary-500 px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition-colors flex items-center"
              >
                <FaEdit className="mr-2" /> Profili Düzenle
              </Link>
              
              <button 
                onClick={handleLogout}
                className="bg-white text-red-500 px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition-colors flex items-center"
              >
                <FaSignOutAlt className="mr-2" /> Çıkış Yap
              </button>
            </div>
          </div>
          
          {/* Ana İçerik */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-16">
            {/* Sekmeler */}
            <div className="flex border-b border-gray-100">
              <button 
                className={`px-6 py-4 font-medium flex items-center ${activeSection === 'overview' ? 'text-primary-500 border-b-2 border-primary-500' : 'text-gray-600 hover:text-primary-400'}`}
                onClick={() => setActiveSection('overview')}
              >
                <FaIdCard className="mr-2" /> Genel Bilgiler
              </button>
              
              <button 
                className={`px-6 py-4 font-medium flex items-center ${activeSection === 'items' ? 'text-primary-500 border-b-2 border-primary-500' : 'text-gray-600 hover:text-primary-400'}`}
                onClick={() => setActiveSection('items')}
              >
                <FaShoppingBag className="mr-2" /> Ürünlerim
              </button>
              
              <button 
                className={`px-6 py-4 font-medium flex items-center ${activeSection === 'swaps' ? 'text-primary-500 border-b-2 border-primary-500' : 'text-gray-600 hover:text-primary-400'}`}
                onClick={() => setActiveSection('swaps')}
              >
                <FaExchangeAlt className="mr-2" /> Takaslarım
              </button>
              
              <button 
                className={`px-6 py-4 font-medium flex items-center ${activeSection === 'favorites' ? 'text-primary-500 border-b-2 border-primary-500' : 'text-gray-600 hover:text-primary-400'}`}
                onClick={() => setActiveSection('favorites')}
              >
                <FaHeart className="mr-2" /> Favorilerim
              </button>
            </div>
            
            {/* Seçilen Sekme İçeriği */}
            <div className="p-6">
              {activeSection === 'overview' && (
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Kullanıcı Bilgileri */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                      <FaUser className="mr-2 text-primary-500" /> Kullanıcı Bilgileri
                    </h3>
                    
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <div className="divide-y divide-gray-200">
                        <div className="py-3 grid grid-cols-3">
                          <span className="font-medium text-gray-500">Ad Soyad</span>
                          <span className="col-span-2">{user?.name}</span>
                        </div>
                        
                        <div className="py-3 grid grid-cols-3">
                          <span className="font-medium text-gray-500">E-posta</span>
                          <span className="col-span-2">{user?.email}</span>
                        </div>
                        
                        <div className="py-3 grid grid-cols-3">
                          <span className="font-medium text-gray-500">Telefon</span>
                          <span className="col-span-2">{user?.phone || 'Belirtilmemiş'}</span>
                        </div>
                        
                        <div className="py-3 grid grid-cols-3">
                          <span className="font-medium text-gray-500">Konum</span>
                          <span className="col-span-2">
                            {user?.location?.city ? (
                              <>
                                {user.location.city}
                                {user.location.district && `, ${user.location.district}`}
                              </>
                            ) : 'Belirtilmemiş'}
                          </span>
                        </div>
                        
                        <div className="py-3 grid grid-cols-3">
                          <span className="font-medium text-gray-500">Üyelik Tarihi</span>
                          <span className="col-span-2">
                            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('tr-TR') : 'Belirtilmemiş'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Link 
                      to="/profil-duzenle" 
                      className="inline-block text-primary-500 hover:text-primary-600 font-medium"
                    >
                      <FaEdit className="inline mr-1" /> Bilgileri Düzenle
                    </Link>
                  </div>
                  
                  {/* İstatistikler */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                      <FaStar className="mr-2 text-primary-500" /> İstatistikler
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
                        <div className="text-primary-500 flex justify-between items-center">
                          <span className="font-semibold">Ürünlerim</span>
                          <FaShoppingBag size={20} />
                        </div>
                        <div className="text-3xl font-bold mt-2 text-gray-800">0</div>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div className="text-blue-500 flex justify-between items-center">
                          <span className="font-semibold">Takaslarım</span>
                          <FaExchangeAlt size={20} />
                        </div>
                        <div className="text-3xl font-bold mt-2 text-gray-800">0</div>
                      </div>
                      
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <div className="text-purple-500 flex justify-between items-center">
                          <span className="font-semibold">Puanım</span>
                          <FaStar size={20} />
                        </div>
                        <div className="text-3xl font-bold mt-2 text-gray-800">
                          {user?.rating || '0'} / 5
                        </div>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                        <div className="text-green-500 flex justify-between items-center">
                          <span className="font-semibold">Son Aktivite</span>
                          <FaCalendarAlt size={20} />
                        </div>
                        <div className="text-3xl font-bold mt-2 text-gray-800">
                          {user?.lastActive ? new Date(user.lastActive).toLocaleDateString('tr-TR') : '-'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-100">
                      <h4 className="text-lg font-semibold mb-2 text-yellow-700 flex items-center">
                        <FaShoppingBag className="mr-2" /> Hemen İlk Ürününü Ekle
                      </h4>
                      <p className="text-yellow-600 mb-4">
                        Takas yapmak istediğin ürünleri ekleyerek takas deneyimine başlayabilirsin.
                      </p>
                      <Link 
                        to="/urun-ekle" 
                        className="inline-block bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors"
                      >
                        Ürün Ekle
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              
              {activeSection === 'items' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                      <FaShoppingBag className="mr-2 text-primary-500" /> Ürünlerim
                    </h3>
                    
                    <Link 
                      to="/urun-ekle" 
                      className="bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors flex items-center"
                    >
                      <FaEdit className="mr-2" /> Yeni Ürün Ekle
                    </Link>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-100">
                    <FaShoppingBag className="mx-auto h-12 w-12 text-gray-300" />
                    <h3 className="mt-4 text-lg font-medium text-gray-700">Henüz ürün eklemediniz</h3>
                    <p className="mt-2 text-gray-500">Takas yapmak istediğiniz ürünleri ekleyerek başlayabilirsiniz.</p>
                    <Link 
                      to="/urun-ekle" 
                      className="mt-4 inline-block bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      Ürün Ekle
                    </Link>
                  </div>
                </div>
              )}
              
              {activeSection === 'swaps' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                      <FaExchangeAlt className="mr-2 text-primary-500" /> Takaslarım
                    </h3>
                    
                    <Link 
                      to="/kesfet" 
                      className="bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors flex items-center"
                    >
                      <FaExchangeAlt className="mr-2" /> Takas Yap
                    </Link>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-100">
                    <FaExchangeAlt className="mx-auto h-12 w-12 text-gray-300" />
                    <h3 className="mt-4 text-lg font-medium text-gray-700">Henüz takas yapmadınız</h3>
                    <p className="mt-2 text-gray-500">Diğer kullanıcıların ürünlerini keşfedip takas teklifleri göndererek başlayabilirsiniz.</p>
                    <Link 
                      to="/kesfet" 
                      className="mt-4 inline-block bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      Keşfet
                    </Link>
                  </div>
                </div>
              )}
              
              {activeSection === 'favorites' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                      <FaHeart className="mr-2 text-primary-500" /> Favorilerim
                    </h3>
                    
                    <Link 
                      to="/kesfet" 
                      className="bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors flex items-center"
                    >
                      <FaHeart className="mr-2" /> Favori Ekle
                    </Link>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-100">
                    <FaHeart className="mx-auto h-12 w-12 text-gray-300" />
                    <h3 className="mt-4 text-lg font-medium text-gray-700">Henüz favori ürününüz yok</h3>
                    <p className="mt-2 text-gray-500">Beğendiğiniz ürünleri favorilerinize ekleyerek daha sonra kolayca bulabilirsiniz.</p>
                    <Link 
                      to="/kesfet" 
                      className="mt-4 inline-block bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      Keşfet
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile; 