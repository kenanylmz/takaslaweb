import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaCamera, FaMapMarkerAlt, FaPhone, FaLock, FaArrowLeft } from 'react-icons/fa';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';

const ProfileEditPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    district: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      console.log('Token from localStorage:', token);
      
      if (!token) {
        navigate('/giris');
        return;
      }

      try {
        console.log('Sending request with token:', token);
        const response = await fetch('http://localhost:3001/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error('Profil bilgileri alınamadı');
        }

        const data = await response.json();
        console.log('Profile data received:', data);
        const user = data.data;
        
        setFormData({
          name: user.name || '',
          phone: user.phone || '',
          city: user.location?.city || '',
          district: user.location?.district || ''
        });
        
        if (user.profileImage) {
          setPreviewUrl(`http://localhost:3001/uploads/${user.profileImage}`);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Profil yükleme hatası:', error);
        setError('Profil bilgileri yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/giris');
      return;
    }
    
    try {
      // Profil bilgilerini güncelle
      const response = await fetch('http://localhost:3001/api/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          location: {
            city: formData.city,
            district: formData.district
          }
        })
      });
      
      if (!response.ok) {
        throw new Error('Profil güncellenirken bir hata oluştu');
      }
      
      // Profil resmi varsa onu da yükle
      if (profileImage) {
        const formData = new FormData();
        formData.append('profileImage', profileImage);
        
        const imageResponse = await fetch('http://localhost:3001/api/users/profile/upload-image', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
        
        if (!imageResponse.ok) {
          throw new Error('Profil resmi yüklenirken bir hata oluştu');
        }
      }
      
      setSuccess('Profil bilgileriniz başarıyla güncellendi');
      setTimeout(() => {
        navigate('/profil');
      }, 2000);
    } catch (error) {
      console.error('Profil güncelleme hatası:', error);
      setError(error.message);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    // Şifre doğrulama
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Yeni şifreler eşleşmiyor');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      return;
    }
    
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/giris');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:3001/api/users/profile/change-password', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Şifre değiştirilirken bir hata oluştu');
      }
      
      setSuccess('Şifreniz başarıyla değiştirildi');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Şifre değiştirme hatası:', error);
      setError(error.message);
    }
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
          <button
            onClick={() => navigate('/profil')}
            className="flex items-center gap-2 text-primary-600 mb-6 font-medium"
          >
            <FaArrowLeft /> Profil'e Dön
          </button>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-dark-800">Profil Bilgilerini Düzenle</h2>
              <p className="text-dark-500 mt-1">Kişisel bilgilerinizi güncelleyin</p>
            </div>
            
            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 mb-4 mx-6">
                {error}
              </div>
            )}
            
            {success && (
              <div className="p-4 bg-green-50 border-l-4 border-green-500 text-green-700 mb-4 mx-6">
                {success}
              </div>
            )}
            
            <form onSubmit={handleProfileSubmit} className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Profil Resmi */}
                <div className="flex flex-col items-center space-y-4 md:w-1/3">
                  <div className="relative w-48 h-48 bg-gray-100 rounded-full overflow-hidden border-4 border-primary-100">
                    {previewUrl ? (
                      <img 
                        src={previewUrl} 
                        alt="Profil Önizleme" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-primary-500">
                        <FaUser size={64} />
                      </div>
                    )}
                    
                    <label 
                      htmlFor="profileImage" 
                      className="absolute bottom-0 right-0 bg-primary-500 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-primary-600 transition"
                    >
                      <FaCamera size={18} />
                    </label>
                    <input 
                      type="file" 
                      id="profileImage" 
                      name="profileImage" 
                      onChange={handleProfileImageChange}
                      className="hidden" 
                      accept="image/*"
                    />
                  </div>
                  <p className="text-sm text-dark-500">
                    Profil resminizi değiştirmek için tıklayın
                  </p>
                </div>
                
                {/* Form Alanları */}
                <div className="md:w-2/3 space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-dark-700 font-medium mb-2">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Ad Soyad"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-dark-700 font-medium mb-2">
                      Telefon Numarası
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="5XX XXX XX XX"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-dark-700 font-medium mb-2">
                        Şehir
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Şehir"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="district" className="block text-dark-700 font-medium mb-2">
                        İlçe
                      </label>
                      <input
                        type="text"
                        id="district"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="İlçe"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 font-medium transition-colors"
                    >
                      Bilgileri Güncelle
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          
          {/* Şifre Değiştirme Formu */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-dark-800">Şifre Değiştir</h2>
              <p className="text-dark-500 mt-1">Hesap güvenliğiniz için düzenli olarak şifrenizi değiştirin</p>
            </div>
            
            <form onSubmit={handlePasswordSubmit} className="p-6">
              <div className="space-y-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-dark-700 font-medium mb-2">
                    Mevcut Şifre
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Mevcut şifreniz"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-dark-700 font-medium mb-2">
                    Yeni Şifre
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Yeni şifreniz (en az 6 karakter)"
                    minLength={6}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-dark-700 font-medium mb-2">
                    Yeni Şifre (Tekrar)
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Yeni şifrenizi tekrar girin"
                    minLength={6}
                    required
                  />
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 font-medium transition-colors"
                  >
                    Şifreyi Değiştir
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProfileEditPage; 