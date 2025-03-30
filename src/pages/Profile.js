import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope, FaSignOutAlt, FaCog } from 'react-icons/fa';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Yükleniyor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="pt-24 pb-12 flex-1">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-primary-500 text-white p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-32 h-32 bg-white rounded-full overflow-hidden border-4 border-white">
                    {user?.profileImage ? (
                      <img 
                        src={`http://localhost:3001/uploads/${user.profileImage}`}
                        alt={user.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-primary-500">
                        <FaUser size={64} />
                      </div>
                    )}
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-center mb-2">{user?.name}</h2>
                
                <div className="space-y-4 mt-8">
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-white opacity-75" />
                    <span>{user?.email}</span>
                  </div>
                  
                  {user?.phone && (
                    <div className="flex items-center gap-3">
                      <FaPhone className="text-white opacity-75" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                  
                  {user?.location?.city && (
                    <div className="flex items-center gap-3">
                      <FaMapMarkerAlt className="text-white opacity-75" />
                      <span>
                        {user.location.city}
                        {user.location.district && `, ${user.location.district}`}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="mt-10 space-y-3">
                  <button 
                    onClick={handleLogout}
                    className="w-full py-2 px-4 bg-white text-primary-600 rounded-lg flex items-center justify-center gap-2 hover:bg-opacity-90 transition"
                  >
                    <FaSignOutAlt />
                    <span>Çıkış Yap</span>
                  </button>
                  
                  <Link
                    to="/profil-duzenle"
                    className="w-full py-2 px-4 bg-primary-400 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-primary-300 transition"
                  >
                    <FaCog />
                    <span>Profili Düzenle</span>
                  </Link>
                </div>
              </div>
              
              <div className="md:w-2/3 p-8">
                <h3 className="text-2xl font-bold mb-6 text-dark-800">Hoş Geldiniz, {user?.name}!</h3>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h4 className="text-lg font-semibold mb-4 text-dark-700">Hesap Bilgileri</h4>
                  <p className="text-dark-600 mb-4">
                    Hesabınız {new Date(user?.createdAt).toLocaleDateString('tr-TR')} tarihinde oluşturuldu.
                  </p>
                  <p className="text-dark-600">
                    Son giriş: {new Date(user?.lastActive).toLocaleDateString('tr-TR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
                    <h4 className="text-lg font-semibold mb-2 text-primary-700">Takas Taleplerim</h4>
                    <p className="text-primary-600">Henüz takas talebiniz bulunmuyor.</p>
                    <Link 
                      to="/kesfet" 
                      className="mt-4 inline-block text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Ürünleri Keşfet
                    </Link>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-100">
                    <h4 className="text-lg font-semibold mb-2 text-yellow-700">Takas Ettiğim Ürünler</h4>
                    <p className="text-yellow-600">Henüz takas ettiğiniz ürün bulunmuyor.</p>
                    <Link 
                      to="/urun-ekle" 
                      className="mt-4 inline-block text-yellow-600 hover:text-yellow-700 font-medium"
                    >
                      Ürün Ekle
                    </Link>
                  </div>
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

export default Profile; 