import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaExchangeAlt, FaGoogle, FaFacebook, FaApple, FaCheckCircle } from 'react-icons/fa';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Basit form doğrulama
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      return;
    }
    
    if (!agreeTerms) {
      setError('Kullanıcı sözleşmesini kabul etmeniz gerekmektedir.');
      return;
    }
    
    // Yükleme durumunu göster
    setIsLoading(true);
    
    // Normal şartlarda burası Firebase'e bağlanacak
    setTimeout(() => {
      console.log('Kayıt olunuyor:', formData);
      setIsLoading(false);
      
      // Firebase bağlantısı olmadığı için şimdilik sadece konsola yazdırıyoruz
      alert('Kayıt işlemi şimdilik simüle ediliyor. Gerçek bir bağlantı yok.');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="pt-24 pb-12 flex-1 flex bg-gray-50">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <div className="w-full max-w-lg">
            <div className="bg-white rounded-2xl shadow-card p-8 md:p-10 border border-gray-100">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                  <FaExchangeAlt className="text-2xl" />
                </div>
                <h1 className="text-2xl font-bold text-dark-800 font-serif">
                  Yeni Hesap Oluşturun
                </h1>
                <p className="mt-2 text-dark-500">
                  Ücretsiz üye olarak hemen takasa başlayın
                </p>
              </div>
              
              {error && (
                <div className="mb-6 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-dark-700 mb-1">
                    Ad Soyad
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-dark-800"
                      placeholder="Ad Soyad"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark-700 mb-1">
                    E-posta
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-dark-800"
                      placeholder="kullanici@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-dark-700 mb-1">
                    Şifre
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-dark-800"
                      placeholder="En az 8 karakter"
                    />
                  </div>
                  
                  {formData.password && (
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="flex items-center text-xs">
                        <FaCheckCircle className={formData.password.length >= 8 ? "text-green-500 mr-1" : "text-gray-300 mr-1"} />
                        <span className={formData.password.length >= 8 ? "text-green-600" : "text-gray-500"}>En az 8 karakter</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <FaCheckCircle className={/[A-Z]/.test(formData.password) ? "text-green-500 mr-1" : "text-gray-300 mr-1"} />
                        <span className={/[A-Z]/.test(formData.password) ? "text-green-600" : "text-gray-500"}>Büyük harf</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <FaCheckCircle className={/[a-z]/.test(formData.password) ? "text-green-500 mr-1" : "text-gray-300 mr-1"} />
                        <span className={/[a-z]/.test(formData.password) ? "text-green-600" : "text-gray-500"}>Küçük harf</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <FaCheckCircle className={/[0-9]/.test(formData.password) ? "text-green-500 mr-1" : "text-gray-300 mr-1"} />
                        <span className={/[0-9]/.test(formData.password) ? "text-green-600" : "text-gray-500"}>Rakam</span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-dark-700 mb-1">
                    Şifre Tekrar
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`appearance-none block w-full pl-10 pr-3 py-3 border ${formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-primary-500'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent text-dark-800`}
                      placeholder="Şifrenizi tekrar girin"
                    />
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">Şifreler eşleşmiyor.</p>
                  )}
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agree-terms"
                      name="agree-terms"
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={() => setAgreeTerms(!agreeTerms)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="agree-terms" className="text-dark-700">
                      <span>
                        <Link to="/kullanici-sozlesmesi" className="text-primary-600 hover:text-primary-700 font-medium">
                          Kullanıcı Sözleşmesi
                        </Link>
                        'ni ve{' '}
                        <Link to="/gizlilik-politikasi" className="text-primary-600 hover:text-primary-700 font-medium">
                          Gizlilik Politikası
                        </Link>
                        'nı okudum ve kabul ediyorum.
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-primary-600 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 font-medium transition-colors`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Kayıt Yapılıyor...
                    </>
                  ) : (
                    'Hesap Oluştur'
                  )}
                </button>
              </form>
              
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-dark-500">veya şununla devam et</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    className="w-full flex justify-center py-2.5 px-4 border border-gray-200 rounded-lg shadow-sm bg-white text-dark-700 hover:bg-gray-50 font-medium"
                  >
                    <FaGoogle className="text-red-500" />
                  </button>
                  
                  <button
                    type="button"
                    className="w-full flex justify-center py-2.5 px-4 border border-gray-200 rounded-lg shadow-sm bg-white text-dark-700 hover:bg-gray-50 font-medium"
                  >
                    <FaFacebook className="text-blue-600" />
                  </button>
                  
                  <button
                    type="button"
                    className="w-full flex justify-center py-2.5 px-4 border border-gray-200 rounded-lg shadow-sm bg-white text-dark-700 hover:bg-gray-50 font-medium"
                  >
                    <FaApple className="text-black" />
                  </button>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-dark-500">
                  Zaten hesabınız var mı?{' '}
                  <Link to="/giris" className="font-medium text-primary-600 hover:text-primary-700">
                    Giriş Yapın
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RegisterPage; 