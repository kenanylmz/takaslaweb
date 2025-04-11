import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaSignOutAlt,
  FaCog,
  FaEdit,
  FaShoppingBag,
  FaStar,
  FaCalendarAlt,
} from "react-icons/fa";
import Header from "../components/organisms/Header";
import Footer from "../components/organisms/Footer";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ listingsCount: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/giris");
        return;
      }

      try {
        // Profil bilgilerini getir
        const profileResponse = await fetch(
          "http://localhost:3001/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!profileResponse.ok) {
          throw new Error("Profil bilgileri alınamadı");
        }

        const profileData = await profileResponse.json();
        setUser(profileData.data);

        // İstatistikleri getir
        const statsResponse = await fetch(
          "http://localhost:3001/api/users/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData.data);
        }

        setLoading(false);
      } catch (error) {
        console.error("Profil yükleme hatası:", error);
        setError("Profil bilgileri yüklenirken bir hata oluştu.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/giris");
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
                {user?.profileImage &&
                user.profileImage !== "default-profile.jpg" ? (
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
                <h1 className="text-2xl font-bold text-gray-800">
                  {user?.name}
                </h1>
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

          {/* Ana İçerik - Profil Bilgileri */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-16 p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Kullanıcı Bilgileri */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <FaUser className="mr-2 text-primary-500" /> Kullanıcı
                  Bilgileri
                </h3>

                <div className="bg-gray-50 p-5 rounded-lg">
                  <div className="divide-y divide-gray-200">
                    <div className="py-3 grid grid-cols-3">
                      <span className="font-medium text-gray-500">
                        Ad Soyad
                      </span>
                      <span className="col-span-2">{user?.name}</span>
                    </div>

                    <div className="py-3 grid grid-cols-3">
                      <span className="font-medium text-gray-500">E-posta</span>
                      <span className="col-span-2">{user?.email}</span>
                    </div>

                    <div className="py-3 grid grid-cols-3">
                      <span className="font-medium text-gray-500">Telefon</span>
                      <span className="col-span-2">
                        {user?.phone || "Belirtilmemiş"}
                      </span>
                    </div>

                    <div className="py-3 grid grid-cols-3">
                      <span className="font-medium text-gray-500">Konum</span>
                      <span className="col-span-2">
                        {user?.location?.city ? (
                          <>
                            {user.location.city}
                            {user.location.district &&
                              `, ${user.location.district}`}
                          </>
                        ) : (
                          "Belirtilmemiş"
                        )}
                      </span>
                    </div>

                    <div className="py-3 grid grid-cols-3">
                      <span className="font-medium text-gray-500">
                        Üyelik Tarihi
                      </span>
                      <span className="col-span-2">
                        {user?.createdAt
                          ? new Date(user.createdAt).toLocaleDateString("tr-TR")
                          : "Belirtilmemiş"}
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
                      <span className="font-semibold">İlanlarım</span>
                      <FaShoppingBag size={20} />
                    </div>
                    <div className="text-3xl font-bold mt-2 text-gray-800">
                      {stats.listingsCount}
                    </div>
                    <Link
                      to="/ilanlarim"
                      className="text-sm text-primary-600 hover:text-primary-700 mt-2 inline-block"
                    >
                      İlanları Görüntüle
                    </Link>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                    <div className="text-purple-500 flex justify-between items-center">
                      <span className="font-semibold">Puanım</span>
                      <FaStar size={20} />
                    </div>
                    <div className="text-3xl font-bold mt-2 text-gray-800">
                      {user?.rating || "0"} / 5
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-100 col-span-2">
                    <div className="text-green-500 flex justify-between items-center">
                      <span className="font-semibold">Son Aktivite</span>
                      <FaCalendarAlt size={20} />
                    </div>
                    <div className="text-xl font-bold mt-2 text-gray-800">
                      {user?.lastActive
                        ? new Date(user.lastActive).toLocaleDateString("tr-TR")
                        : "-"}
                    </div>
                  </div>
                </div>

                {stats.listingsCount === 0 && (
                  <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-100">
                    <h4 className="text-lg font-semibold mb-2 text-yellow-700 flex items-center">
                      <FaShoppingBag className="mr-2" /> Henüz İlanınız Yok
                    </h4>
                    <p className="text-yellow-600 mb-4">
                      Takas yapmak istediğiniz ürünlerinizi ekleyerek
                      başlayabilirsiniz.
                    </p>
                    <Link
                      to="/ilan-ekle"
                      className="inline-block bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                      İlan Ekle
                    </Link>
                  </div>
                )}
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
