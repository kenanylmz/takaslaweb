import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaSearch,
  FaFilter,
  FaTimes,
  FaAngleDown,
  FaAngleUp,
  FaSlidersH,
} from "react-icons/fa";
import Header from "../components/organisms/Header";

const ExplorePage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [userId, setUserId] = useState(null);

  // Filtreleme ve arama state'leri
  const [filters, setFilters] = useState({
    category: "",
    search: "",
    city: "",
    condition: "",
    sort: "-createdAt",
  });

  // Kategoriler
  const categories = [
    "Tümü",
    "Elektronik",
    "Giyim",
    "Kitap",
    "Mobilya",
    "Spor",
    "Koleksiyon",
    "Bahçe",
    "Oyuncak",
    "Diğer",
  ];

  // Durum seçenekleri
  const conditions = [
    "Tümü",
    "Sıfır",
    "Yeni Gibi",
    "İyi",
    "Az Kullanılmış",
    "Normal",
    "Yıpranmış",
  ];

  // Sıralama seçenekleri
  const sortOptions = [
    { value: "-createdAt", label: "En Yeni" },
    { value: "createdAt", label: "En Eski" },
    { value: "title", label: "A-Z" },
    { value: "-title", label: "Z-A" },
  ];

  // Kullanıcı ID'sini local storage'dan al
  useEffect(() => {
    const getAndSetUserId = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // JWT token'ı decode et
          const payload = parseJwt(token);

          if (payload && payload.id) {
            console.log("Decoded user ID from token:", payload.id);
            setUserId(payload.id);

            // API üzerinden kullanıcı bilgilerini doğrula
            try {
              const userResponse = await axios.get(
                "http://localhost:3001/api/users/me",
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (
                userResponse.data &&
                userResponse.data.data &&
                userResponse.data.data._id
              ) {
                const apiUserId = userResponse.data.data._id;
                console.log("Verified user ID from API:", apiUserId);
                // Token'dan alınan ve API'den doğrulanan ID'ler aynı mı kontrol et
                if (payload.id !== apiUserId) {
                  console.log("User ID mismatch, using API user ID");
                  setUserId(apiUserId);
                }
              }
            } catch (apiError) {
              console.error("API user verification failed:", apiError);
            }
          }
        } catch (error) {
          console.error("Token decode hatası:", error);
        }
      }
    };

    getAndSetUserId();
  }, []);

  // JWT token'ı parse etmek için yardımcı fonksiyon
  const parseJwt = (token) => {
    try {
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
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("JWT parsing error:", e);
      return null;
    }
  };

  // İlan verisini çek
  const fetchListings = async () => {
    try {
      setLoading(true);

      // Query parametreleri oluştur
      const params = { ...filters, page: currentPage };

      // Boş değerleri temizle
      Object.keys(params).forEach((key) => {
        if (!params[key] || params[key] === "Tümü") {
          delete params[key];
        }
      });

      // Kullanıcı giriş yapmışsa kendi ilanlarını filtrelemek için userId ekle
      if (userId) {
        params.excludeUserId = userId;
        console.log("Excluding user's own listings with ID:", userId);
      }

      console.log("Request params:", params);
      const response = await axios.get("http://localhost:3001/api/listings", {
        params,
      });

      console.log("Total listings received:", response.data.count);

      // Backend filtrelemesine ek olarak client tarafında da filtrele (ekstra önlem)
      let filteredListings = response.data.data;
      if (userId) {
        // İlk filtreleme: user._id ile karşılaştırma
        const initialFiltered = filteredListings.filter(
          (listing) => !listing.user || listing.user._id !== userId
        );

        // İkinci filtreleme: string olarak karşılaştırma
        const stringFiltered = initialFiltered.filter(
          (listing) =>
            !listing.user || String(listing.user._id) !== String(userId)
        );

        console.log("Client-side filtering results:");
        console.log("- Original count:", filteredListings.length);
        console.log("- After initial filtering:", initialFiltered.length);
        console.log("- After string comparison:", stringFiltered.length);

        filteredListings = stringFiltered;
      }

      setListings(filteredListings);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (err) {
      console.error("İlanlar yüklenirken hata oluştu:", err);
      setError(
        "İlanlar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
      );
      setLoading(false);
    }
  };

  // Filtre değişikliklerinde ve sayfa değişikliklerinde ilanları yeniden çek
  useEffect(() => {
    fetchListings();
  }, [filters, currentPage, userId]);

  // Filtre değişikliklerini işle
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1); // Filtre değiştiğinde ilk sayfaya dön
  };

  // Arama formunu gönder
  const handleSearch = (e) => {
    e.preventDefault();
    fetchListings();
  };

  // Sayfa değiştirme
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Ana Başlık ve Arama */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Keşfet</h1>
              <p className="text-gray-600">
                Takaslamak istediğiniz ürünleri keşfedin
              </p>
            </div>

            <div className="w-full md:w-auto">
              <form onSubmit={handleSearch} className="flex">
                <div className="relative flex-grow mr-2">
                  <input
                    type="text"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    placeholder="İlan ara..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center"
                >
                  <FaSlidersH className="mr-2" />
                  Filtreler
                  {showFilters ? (
                    <FaAngleUp className="ml-2" />
                  ) : (
                    <FaAngleDown className="ml-2" />
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Gelişmiş Filtreler Paneli */}
          {showFilters && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 transition-all duration-300 transform">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Gelişmiş Filtreler
                </h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Kategori
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="condition"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Ürün Durumu
                  </label>
                  <select
                    id="condition"
                    name="condition"
                    value={filters.condition}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {conditions.map((condition) => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Şehir
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={filters.city}
                    onChange={handleFilterChange}
                    placeholder="Şehir adı girin"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <div>
                  <label
                    htmlFor="sort"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Sıralama
                  </label>
                  <select
                    id="sort"
                    name="sort"
                    value={filters.sort}
                    onChange={handleFilterChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFilters({
                        category: "",
                        search: "",
                        city: "",
                        condition: "",
                        sort: "-createdAt",
                      });
                    }}
                    className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                  >
                    Temizle
                  </button>

                  <button
                    type="button"
                    onClick={fetchListings}
                    className="px-5 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all shadow-sm"
                  >
                    Filtreleri Uygula
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Kategori Sekmeleri - Yatay Kaydırılabilir */}
          <div className="mb-6 overflow-x-auto pb-2 no-scrollbar">
            <div className="flex space-x-2 w-max min-w-full py-1">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    filters.category === category
                      ? "bg-primary-500 text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-primary-300 hover:bg-primary-50"
                  }`}
                  onClick={() => setFilters((prev) => ({ ...prev, category }))}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* İlan Sonuçları */}
          {loading ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500">İlanlar yükleniyor...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 p-6 rounded-xl text-red-700 mb-8 border border-red-200">
              <div className="flex items-center mb-2">
                <FaTimes className="text-red-500 mr-2" />
                <h3 className="font-semibold">Bir hata oluştu</h3>
              </div>
              <p>{error}</p>
            </div>
          ) : (
            <>
              {listings.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <FaSearch className="text-gray-400 text-2xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    İlan bulunamadı
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Aramanıza uygun ilan bulunamadı.
                  </p>
                  <button
                    onClick={() =>
                      setFilters({
                        category: "",
                        search: "",
                        city: "",
                        condition: "",
                        sort: "-createdAt",
                      })
                    }
                    className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all shadow-sm"
                  >
                    Tüm İlanları Göster
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {listings.map((listing) => (
                      <Link
                        to={`/listings/${listing._id}`}
                        key={listing._id}
                        className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <div className="relative pb-[75%] overflow-hidden bg-gray-100">
                          {listing.images && listing.images.length > 0 ? (
                            <img
                              src={`http://localhost:3001/uploads/${listing.images[0]}`}
                              alt={listing.title}
                              className="absolute h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                              <span className="text-gray-400">Resim yok</span>
                            </div>
                          )}
                          <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full px-3 py-1 text-xs font-medium text-gray-700">
                            {new Date(listing.createdAt).toLocaleDateString(
                              "tr-TR",
                              {
                                day: "numeric",
                                month: "short",
                              }
                            )}
                          </div>
                        </div>

                        <div className="p-4">
                          <h2 className="text-lg font-semibold text-gray-800 mb-1 truncate group-hover:text-primary-600 transition-colors">
                            {listing.title}
                          </h2>

                          <div className="flex items-center mb-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 mr-2 border border-gray-200">
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
                                    className="h-5 w-5"
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
                            <span className="text-sm text-gray-600 truncate">
                              {listing.user && listing.user.name}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1.5 mb-3">
                            <span
                              className={`text-xs px-2.5 py-1 rounded-full ${getCategoryColor(
                                listing.category
                              )}`}
                            >
                              {listing.category}
                            </span>
                            <span
                              className={`text-xs px-2.5 py-1 rounded-full ${getConditionColor(
                                listing.condition
                              )}`}
                            >
                              {listing.condition}
                            </span>
                          </div>

                          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                            <span className="text-sm text-gray-500 flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {listing.city}
                            </span>
                            <span className="text-xs px-2 py-1 rounded-full bg-primary-50 text-primary-600">
                              Takas
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Sayfalama */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-10">
                      <div className="bg-white shadow rounded-lg inline-flex">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`px-4 py-2 rounded-l-lg border-r border-gray-200 ${
                            currentPage === 1
                              ? "text-gray-400 cursor-not-allowed bg-gray-50"
                              : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                          }`}
                        >
                          Önceki
                        </button>

                        <div className="hidden md:flex">
                          {[...Array(totalPages).keys()].map((page) => (
                            <button
                              key={page + 1}
                              onClick={() => handlePageChange(page + 1)}
                              className={`px-4 py-2 border-r border-gray-200 ${
                                currentPage === page + 1
                                  ? "bg-primary-500 text-white font-medium"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                              }`}
                            >
                              {page + 1}
                            </button>
                          ))}
                        </div>

                        <div className="md:hidden px-4 py-2 border-r border-gray-200">
                          <span className="text-gray-700">
                            {currentPage} / {totalPages}
                          </span>
                        </div>

                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`px-4 py-2 rounded-r-lg ${
                            currentPage === totalPages
                              ? "text-gray-400 cursor-not-allowed bg-gray-50"
                              : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                          }`}
                        >
                          Sonraki
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ExplorePage;
