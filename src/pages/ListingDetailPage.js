import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaClock,
  FaShare,
  FaHeart,
} from "react-icons/fa";
import Header from "../components/organisms/Header";

const ListingDetailPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [userId, setUserId] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  // Kullanıcı ID'sini localStorage'dan al
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // JWT token'ı decode et - basit bir şekilde
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );

        const parsedToken = JSON.parse(jsonPayload);
        if (parsedToken.id) {
          setUserId(parsedToken.id);
        }
      } catch (error) {
        console.error("Token decode hatası:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3001/api/listings/public/${id}`
        );
        setListing(response.data.data);

        // Eğer giriş yapmış kullanıcı ilan sahibiyse
        if (
          userId &&
          response.data.data.user &&
          userId === response.data.data.user._id
        ) {
          setIsOwner(true);
        }

        setLoading(false);
      } catch (err) {
        console.error("İlan yüklenirken hata oluştu:", err);
        setError(
          "İlan yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
        );
        setLoading(false);
      }
    };

    if (id) {
      fetchListing();
    }
  }, [id, userId]);

  // Durum etiketi renklendirmesi
  const getConditionColor = (condition) => {
    const colors = {
      Sıfır:
        "bg-gradient-to-r from-green-50 to-green-100 text-green-800 border border-green-200",
      "Yeni Gibi":
        "bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-800 border border-emerald-200",
      İyi: "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border border-blue-200",
      "Az Kullanılmış":
        "bg-gradient-to-r from-cyan-50 to-cyan-100 text-cyan-800 border border-cyan-200",
      Normal:
        "bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800 border border-yellow-200",
      Yıpranmış:
        "bg-gradient-to-r from-orange-50 to-orange-100 text-orange-800 border border-orange-200",
    };

    return (
      colors[condition] ||
      "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border border-gray-200"
    );
  };

  // Kategori renklendirmesi
  const getCategoryColor = (category) => {
    const colors = {
      Elektronik:
        "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border border-blue-200",
      Giyim:
        "bg-gradient-to-r from-pink-50 to-pink-100 text-pink-800 border border-pink-200",
      Kitap:
        "bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800 border border-yellow-200",
      Mobilya:
        "bg-gradient-to-r from-green-50 to-green-100 text-green-800 border border-green-200",
      Spor: "bg-gradient-to-r from-red-50 to-red-100 text-red-800 border border-red-200",
      Koleksiyon:
        "bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 border border-purple-200",
      Bahçe:
        "bg-gradient-to-r from-lime-50 to-lime-100 text-lime-800 border border-lime-200",
      Oyuncak:
        "bg-gradient-to-r from-orange-50 to-orange-100 text-orange-800 border border-orange-200",
      Diğer:
        "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border border-gray-200",
    };

    return (
      colors[category] ||
      "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border border-gray-200"
    );
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="text-center py-16">
              <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500">İlan yükleniyor...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Hata Oluştu
                </h2>
                <p className="text-gray-600 mb-8">{error}</p>
                <Link
                  to="/kesfet"
                  className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all shadow-sm"
                >
                  Keşfet sayfasına dön
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!listing) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  İlan bulunamadı
                </h2>
                <p className="text-gray-600 mb-8">
                  Aradığınız ilan silinmiş veya mevcut değil.
                </p>
                <Link
                  to="/kesfet"
                  className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all shadow-sm"
                >
                  Keşfet sayfasına dön
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Navigasyon */}
          <div className="mb-6">
            <Link
              to="/kesfet"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Keşfet sayfasına dön
            </Link>
          </div>

          {/* Ana İçerik */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              {/* Sol taraf - Resim Galerisi */}
              <div className="md:col-span-6 xl:col-span-5">
                <div className="relative bg-gray-50 h-full">
                  <div className="relative h-[350px] md:h-full min-h-[350px]">
                    {listing.images && listing.images.length > 0 ? (
                      <img
                        src={`http://localhost:3001/uploads/${listing.images[currentImage]}`}
                        alt={listing.title}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400">Resim yok</span>
                      </div>
                    )}
                  </div>

                  {/* Küçük Resimler */}
                  {listing.images && listing.images.length > 1 && (
                    <div className="absolute bottom-4 left-0 right-0">
                      <div className="flex justify-center space-x-2 px-4">
                        {listing.images.map((image, index) => (
                          <button
                            key={index}
                            className={`w-14 h-14 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                              currentImage === index
                                ? "border-primary-500 shadow-md"
                                : "border-white shadow-sm opacity-70 hover:opacity-100"
                            }`}
                            onClick={() => setCurrentImage(index)}
                          >
                            <img
                              src={`http://localhost:3001/uploads/${image}`}
                              alt={`${listing.title} - ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sağ taraf - İlan Bilgileri */}
              <div className="md:col-span-6 xl:col-span-7 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${getCategoryColor(
                          listing.category
                        )}`}
                      >
                        {listing.category}
                      </span>
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${getConditionColor(
                          listing.condition
                        )}`}
                      >
                        {listing.condition}
                      </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                      {listing.title}
                    </h1>
                  </div>

                  {/* Aksiyon butonları */}
                  {!isOwner && (
                    <div className="flex items-center space-x-2">
                      <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
                        <FaShare className="h-5 w-5" />
                      </button>
                      <button className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-500 transition-colors">
                        <FaHeart className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Satıcı Bilgileri */}
                <div className="flex items-center mb-6 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-4 border border-gray-200">
                    {listing.user && listing.user.profileImage ? (
                      <img
                        src={`http://localhost:3001/uploads/${listing.user.profileImage}`}
                        alt={listing.user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {listing.user && listing.user.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {listing.user && listing.user.location && (
                        <>
                          {listing.user.location.city && (
                            <span>{listing.user.location.city}</span>
                          )}
                          {listing.user.location.district && (
                            <span>, {listing.user.location.district}</span>
                          )}
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* İlan Bilgileri */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">
                    Ürün Detayları
                  </h2>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Durum</p>
                      <p className="font-medium">{listing.condition}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Kategori</p>
                      <p className="font-medium">{listing.category}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg flex items-start">
                      <FaMapMarkerAlt className="text-gray-400 mt-0.5 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Konum</p>
                        <p className="font-medium">{listing.city}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg flex items-start">
                      <FaClock className="text-gray-400 mt-0.5 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          İlan Tarihi
                        </p>
                        <p className="font-medium">
                          {new Date(listing.createdAt).toLocaleDateString(
                            "tr-TR",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Açıklama */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">
                    Açıklama
                  </h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-line">
                      {listing.description}
                    </p>
                  </div>
                </div>

                {/* Takas Teklifi */}
                {!isOwner && (
                  <div className="pt-4 border-t border-gray-100">
                    <button className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg shadow-sm transition-colors flex items-center justify-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                        ></path>
                      </svg>
                      Takas Teklifi Yap
                    </button>
                    <p className="text-xs text-center text-gray-500 mt-2">
                      Bu özellik henüz geliştirme aşamasındadır
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingDetailPage;
