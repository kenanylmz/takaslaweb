import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Sayfa yüklendiğinde kullanıcı oturumunu kontrol et
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:3001/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data.data);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Kimlik doğrulama hatası:', error);
        setError('Kimlik doğrulama hatası');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Kayıt ol fonksiyonu
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setCurrentUser(data.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        setError(data.error || 'Kayıt olma hatası');
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Kayıt olma hatası:', error);
      setError('Sunucu hatası');
      return { success: false, error: 'Sunucu hatası' };
    } finally {
      setLoading(false);
    }
  };

  // Giriş yap fonksiyonu
  const login = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setCurrentUser(data.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        setError(data.error || 'Giriş yapma hatası');
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Giriş yapma hatası:', error);
      setError('Sunucu hatası');
      return { success: false, error: 'Sunucu hatası' };
    } finally {
      setLoading(false);
    }
  };

  // Çıkış yap fonksiyonu
  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        error,
        isAuthenticated,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 