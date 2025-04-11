import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaExclamationTriangle,
  FaPlus,
  FaMapMarkerAlt,
  FaTag,
} from "react-icons/fa";
import Header from "../components/organisms/Header";
import Footer from "../components/organisms/Footer";

const MyListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/giris");
          return;
        }

        const response = await fetch("http://localhost:3001/api/listings/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setListings(data.data);
        } else {
          setError(data.error || "İlanlarınız yüklenirken bir hata oluştu");
        }
      } catch (error) {
        console.error("İlanlar yüklenirken hata:", error);
        setError("Sunucu bağlantısında bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [navigate]);

  const handleDeleteClick = (listing) => {
    setSelectedListing(listing);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/giris");
        return;
      }

      const response = await fetch(
        `http://localhost:3001/api/listings/${selectedListing._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // İlanı listeden kaldır
        setListings(
          listings.filter((listing) => listing._id !== selectedListing._id)
        );
        setShowDeleteModal(false);
      } else {
        const data = await response.json();
        setError(data.error || "İlan silinirken bir hata oluştu");
      }
    } catch (error) {
      console.error("İlan silme hatası:", error);
      setError("Sunucu bağlantısında bir hata oluştu");
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Elektronik: "blue",
      Giyim: "pink",
      Kitap: "yellow",
      Mobilya: "brown",
      Spor: "green",
      Koleksiyon: "purple",
      Bahçe: "green",
      Oyuncak: "red",
      Diğer: "gray",
    };

    return colors[category] || "gray";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="pt-24 pb-12 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">İlanlarım</h1>
                <p className="text-gray-600 mt-1">
                  Takas için eklediğiniz tüm ürünleri buradan yönetebilirsiniz
                </p>
              </div>

              <Link
                to="/ilan-ekle"
                className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg flex items-center transition-colors shadow-sm"
              >
                <FaPlus className="mr-2" /> Yeni İlan Ekle
              </Link>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 text-red-700">
                <p>{error}</p>
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse"
                  >
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : listings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <div
                    key={listing._id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="h-48 bg-gray-100 relative">
                      {listing.images && listing.images.length > 0 ? (
                        <img
                          src={`http://localhost:3001/uploads/${listing.images[0]}`}
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                          <FaTag size={48} />
                        </div>
                      )}

                      <div
                        className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium text-white bg-${getCategoryColor(
                          listing.category
                        )}-500`}
                      >
                        {listing.category}
                      </div>

                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                        <h2 className="text-white font-bold text-lg truncate">
                          {listing.title}
                        </h2>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <p className="text-gray-600 text-sm flex items-center">
                          <FaMapMarkerAlt className="mr-1 text-gray-500" />
                          {listing.city || "Belirtilmemiş"}
                        </p>

                        {/* Ürün durumu badgesi */}
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {listing.condition || "Belirtilmemiş"}
                        </span>
                      </div>

                      <p className="text-gray-700 text-sm line-clamp-2 mb-4 h-10 overflow-hidden">
                        {listing.description}
                      </p>

                      <div className="flex justify-between pt-3 border-t border-gray-100">
                        <div className="text-gray-500 text-sm">
                          {new Date(listing.createdAt).toLocaleDateString(
                            "tr-TR"
                          )}
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              navigate(`/ilan-duzenle/${listing._id}`)
                            }
                            className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition-colors"
                          >
                            <FaEdit size={18} />
                          </button>

                          <button
                            onClick={() => handleDeleteClick(listing)}
                            className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors"
                          >
                            <FaTrash size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
                <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FaTag className="text-gray-400 text-3xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Henüz ilanınız bulunmuyor
                </h3>
                <p className="text-gray-500 mb-6">
                  Takaslamak istediğiniz ürünleri ekleyerek başlayabilirsiniz.
                </p>
                <Link
                  to="/ilan-ekle"
                  className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-6 rounded-lg inline-flex items-center transition-colors"
                >
                  <FaPlus className="mr-2" /> İlan Ekle
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Silme Onay Modalı */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FaExclamationTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      İlanı Sil
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        "{selectedListing?.title}" isimli ilanınızı silmek
                        istediğinizden emin misiniz? Bu işlem geri alınamaz.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDeleteConfirm}
                >
                  Sil
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowDeleteModal(false)}
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MyListingsPage;
