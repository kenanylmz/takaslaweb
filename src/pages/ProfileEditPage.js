import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaUser, FaCamera, FaMapMarkerAlt, FaPhone, FaLock, 
  FaArrowLeft, FaUpload, FaEdit, FaTrash, FaCheck, 
  FaSave, FaExclamationCircle, FaInfoCircle 
} from 'react-icons/fa';
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
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Tooltip timer
  useEffect(() => {
    let tooltipTimer;
    if (showTooltip) {
      tooltipTimer = setTimeout(() => {
        setShowTooltip(false);
      }, 3000);
    }
    return () => clearTimeout(tooltipTimer);
  }, [showTooltip]);

  // Profil bilgilerini yükle
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
        
        // Form verilerini ayarla
        setFormData({
          name: user.name || '',
          phone: user.phone || '',
          city: user.location?.city || '',
          district: user.location?.district || ''
        });
        
        // Profil resmi varsa göster
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

  const handleProfileImageClick = () => {
    fileInputRef.current.click();
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageFile(file);
    }
  };

  const handleImageFile = (file) => {
    if (file.type.startsWith('image/')) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      // Profil resmini hemen yükle
      uploadProfileImage(file);
    } else {
      setError('Lütfen geçerli bir resim dosyası seçin.');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  const uploadProfileImage = async (file) => {
    const token = localStorage.getItem('token');
    
    if (!token || !file) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    const formData = new FormData();
    formData.append('profileImage', file);
    
    try {
      // Sahte ilerleme
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + 5;
          return newProgress < 90 ? newProgress : prev;
        });
      }, 100);
      
      const response = await fetch('http://localhost:3001/api/users/profile/upload-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      clearInterval(interval);
      
      if (response.ok) {
        setUploadProgress(100);
        const data = await response.json();
        setSuccess('Profil resmi başarıyla güncellendi!');
        setTimeout(() => {
          setSuccess(null);
          setUploadProgress(0);
          setIsUploading(false);
        }, 2000);
      } else {
        throw new Error('Profil resmi yüklenirken bir hata oluştu');
      }
    } catch (error) {
      console.error('Profil resmi yükleme hatası:', error);
      setError('Profil resmi yüklenirken bir hata oluştu.');
      setUploadProgress(0);
      setIsUploading(false);
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleClearImage = () => {
    setProfileImage(null);
    setPreviewUrl('');
    // Varsayılan resmi kullanmak için API çağrısı yapılabilir
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
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-primary-600 font-medium">Profil yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="pt-24 pb-12 flex-1">
        <div className="container mx-auto px-4">
          {/* Üst Başlık Alanı */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center">
              <Link
                to="/profil"
                className="mr-4 p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"
              >
                <FaArrowLeft className="text-primary-500" />
              </Link>
              <h1 className="text-3xl font-bold text-dark-800">Profil Düzenle</h1>
            </div>
            
            {success && (
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg flex items-center">
                <FaCheck className="mr-2" />
                {success}
              </div>
            )}
            
            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg flex items-center">
                <FaExclamationCircle className="mr-2" />
                {error}
              </div>
            )}
          </div>
          
          {/* Ana İçerik */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sol Panel - Profil Resmi */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-dark-800 flex items-center">
                    <FaUser className="mr-2 text-primary-500" />
                    Profil Resmi
                  </h2>
                  <p className="text-dark-500 mt-1">Profil resminizi buradan güncelleyebilirsiniz</p>
                </div>
                
                <div className="p-6">
                  <div 
                    className={`relative w-full aspect-square rounded-xl overflow-hidden mb-4 
                      ${isDragging ? 'border-2 border-dashed border-primary-500 bg-primary-50' : 'border border-gray-200'}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    {previewUrl ? (
                      <img 
                        src={previewUrl} 
                        alt="Profil Resmi" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
                        <FaUser size={64} className="text-gray-400 mb-4" />
                        <p className="text-dark-500 text-center px-4">
                          Profil resmi yüklemek için tıklayın veya sürükleyip bırakın
                        </p>
                      </div>
                    )}
                    
                    {/* Yükleme İlerleme Çubuğu */}
                    {isUploading && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="w-3/4 bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-primary-600 h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    {/* Kontrol Butonları */}
                    <div className="absolute bottom-2 right-2 flex space-x-2">
                      <button
                        type="button"
                        onClick={handleProfileImageClick}
                        className="p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                      >
                        <FaEdit size={16} />
                        {showTooltip && (
                          <div className="absolute bottom-full right-0 mb-2 w-32 bg-dark-800 text-white text-xs rounded p-1">
                            Profil resmini değiştir
                          </div>
                        )}
                      </button>
                      
                      {previewUrl && (
                        <button
                          type="button"
                          onClick={handleClearImage}
                          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <FaTrash size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleProfileImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  
                  <button
                    type="button"
                    onClick={handleProfileImageClick}
                    className="w-full py-3 px-4 mt-4 bg-primary-50 text-primary-700 rounded-lg border border-primary-200 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 font-medium transition-colors flex items-center justify-center"
                  >
                    <FaUpload className="mr-2" />
                    Resim Yükle
                  </button>
                  
                  <div className="mt-4 text-sm text-dark-500 bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-start mb-2">
                      <FaInfoCircle className="text-primary-500 mr-2 mt-0.5" />
                      <p>En iyi görünüm için kare formatta resim yükleyin.</p>
                    </div>
                    <p className="ml-6">Desteklenen formatlar: JPG, PNG, GIF, WEBP</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sağ Panel - Profil Bilgileri ve Şifre */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profil Bilgileri Formu */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-dark-800 flex items-center">
                    <FaEdit className="mr-2 text-primary-500" />
                    Profil Bilgileri
                  </h2>
                  <p className="text-dark-500 mt-1">Kişisel bilgilerinizi düzenleyin</p>
                </div>
                
                <form onSubmit={handleProfileSubmit} className="p-6">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-dark-700 font-medium mb-2 flex items-center">
                        <FaUser className="mr-2 text-primary-500" />
                        Ad Soyad
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                        placeholder="Adınız Soyadınız"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-dark-700 font-medium mb-2 flex items-center">
                        <FaPhone className="mr-2 text-primary-500" />
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                        placeholder="Telefon Numaranız"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="city" className="block text-dark-700 font-medium mb-2 flex items-center">
                          <FaMapMarkerAlt className="mr-2 text-primary-500" />
                          Şehir
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                          placeholder="İlçe"
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full py-3 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 font-medium transition-colors flex items-center justify-center"
                      >
                        <FaSave className="mr-2" />
                        Bilgileri Güncelle
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              
              {/* Şifre Değiştirme Formu */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-dark-800 flex items-center">
                    <FaLock className="mr-2 text-primary-500" />
                    Şifre Değiştir
                  </h2>
                  <p className="text-dark-500 mt-1">Hesap güvenliğiniz için düzenli olarak şifrenizi değiştirin</p>
                </div>
                
                <form onSubmit={handlePasswordSubmit} className="p-6">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="currentPassword" className="block text-dark-700 font-medium mb-2 flex items-center">
                        <FaLock className="mr-2 text-primary-500" />
                        Mevcut Şifre
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                        placeholder="Mevcut şifreniz"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-dark-700 font-medium mb-2 flex items-center">
                        <FaLock className="mr-2 text-primary-500" />
                        Yeni Şifre
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                        placeholder="Yeni şifreniz (en az 6 karakter)"
                        minLength={6}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-dark-700 font-medium mb-2 flex items-center">
                        <FaLock className="mr-2 text-primary-500" />
                        Yeni Şifre (Tekrar)
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                        placeholder="Yeni şifrenizi tekrar girin"
                        minLength={6}
                        required
                      />
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full py-3 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 font-medium transition-colors flex items-center justify-center"
                      >
                        <FaLock className="mr-2" />
                        Şifreyi Değiştir
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProfileEditPage; 