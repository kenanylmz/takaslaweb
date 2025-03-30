import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaExchangeAlt, FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basit form doğrulama
    if (!email || !password) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }
    
    // Yükleme durumunu göster
    setIsLoading(true);
    
    try {
      console.log('Sending login request with:', { email, password });
      
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      console.log('Login response:', data);
      
      if (response.ok) {
        // JWT token'ı kaydet
        localStorage.setItem('token', data.token);
        
        // Profil sayfasına yönlendir
        navigate('/profil');
      } else {
        setError(data.error || 'Giriş yapılırken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Sunucu bağlantısında bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="pt-24 pb-12 flex-1 flex bg-gray-50">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-card p-8 md:p-10 border border-gray-100">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                  <FaExchangeAlt className="text-2xl" />
                </div>
                <h1 className="text-2xl font-bold text-dark-800 font-serif">
                  Hesabınıza Giriş Yapın
                </h1>
                <p className="mt-2 text-dark-500">
                  Takas yapmaya devam etmek için giriş yapın
                </p>
              </div>
              
              {error && (
                <div className="mb-6 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-dark-800"
                      placeholder="kullanici@example.com"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-dark-700">
                      Şifre
                    </label>
                    <Link to="/sifremi-unuttum" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                      Şifremi unuttum
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-dark-800"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-dark-700">
                    Beni hatırla
                  </label>
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
                      Giriş Yapılıyor...
                    </>
                  ) : (
                    'Giriş Yap'
                  )}
                </button>
              </form>
              
             
              
              <div className="mt-8 text-center">
                <p className="text-sm text-dark-500">
                  Hesabınız yok mu?{' '}
                  <Link to="/kayit" className="font-medium text-primary-600 hover:text-primary-700">
                    Ücretsiz Kayıt Olun
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

export default LoginPage; 