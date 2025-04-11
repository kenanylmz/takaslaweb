import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaCamera,
  FaUpload,
  FaTimes,
  FaCheck,
  FaImage,
  FaTag,
  FaList,
  FaAlignLeft,
  FaMapMarkerAlt,
  FaToolbox,
} from "react-icons/fa";
import Header from "../components/organisms/Header";
import Footer from "../components/organisms/Footer";

// Türkiye şehirleri
const TURKEY_CITIES = [
  "Adana",
  "Adıyaman",
  "Afyonkarahisar",
  "Ağrı",
  "Amasya",
  "Ankara",
  "Antalya",
  "Artvin",
  "Aydın",
  "Balıkesir",
  "Bilecik",
  "Bingöl",
  "Bitlis",
  "Bolu",
  "Burdur",
  "Bursa",
  "Çanakkale",
  "Çankırı",
  "Çorum",
  "Denizli",
  "Diyarbakır",
  "Edirne",
  "Elazığ",
  "Erzincan",
  "Erzurum",
  "Eskişehir",
  "Gaziantep",
  "Giresun",
  "Gümüşhane",
  "Hakkari",
  "Hatay",
  "Isparta",
  "Mersin",
  "İstanbul",
  "İzmir",
  "Kars",
  "Kastamonu",
  "Kayseri",
  "Kırklareli",
  "Kırşehir",
  "Kocaeli",
  "Konya",
  "Kütahya",
  "Malatya",
  "Manisa",
  "Kahramanmaraş",
  "Mardin",
  "Muğla",
  "Muş",
  "Nevşehir",
  "Niğde",
  "Ordu",
  "Rize",
  "Sakarya",
  "Samsun",
  "Siirt",
  "Sinop",
  "Sivas",
  "Tekirdağ",
  "Tokat",
  "Trabzon",
  "Tunceli",
  "Şanlıurfa",
  "Uşak",
  "Van",
  "Yozgat",
  "Zonguldak",
  "Aksaray",
  "Bayburt",
  "Karaman",
  "Kırıkkale",
  "Batman",
  "Şırnak",
  "Bartın",
  "Ardahan",
  "Iğdır",
  "Yalova",
  "Karabük",
  "Kilis",
  "Osmaniye",
  "Düzce",
];

// Ürün durumları
const ITEM_CONDITIONS = [
  "Sıfır",
  "Yeni Gibi",
  "İyi",
  "Az Kullanılmış",
  "Normal",
  "Yıpranmış",
];

const EditListingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    city: "",
    condition: "",
  });
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [loadingListing, setLoadingListing] = useState(true);

  const categories = [
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

  useEffect(() => {
    // İlanı getir
    const fetchListing = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/giris");
          return;
        }

        setLoadingListing(true);

        // İlanı getir
        const response = await fetch(
          `http://localhost:3001/api/listings/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("İlan bilgileri alınamadı");
        }

        const data = await response.json();
        const listing = data.data;

        // Form verilerini doldur
        setFormData({
          title: listing.title,
          category: listing.category,
          description: listing.description,
          city: listing.city || "",
          condition: listing.condition || "",
        });

        // Mevcut resimleri ayarla
        if (listing.images && listing.images.length > 0) {
          setExistingImages(listing.images);

          // Mevcut resimlerin önizlemelerini oluştur
          const imageUrls = listing.images.map(
            (img) => `http://localhost:3001/uploads/${img}`
          );
          setPreview(imageUrls);
        }
      } catch (error) {
        console.error("İlan bilgileri yüklenirken hata:", error);
        setError("İlan bilgileri yüklenirken bir hata oluştu.");
      } finally {
        setLoadingListing(false);
      }
    };

    fetchListing();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageClick = () => {
    document.getElementById("image-upload").click();
  };

  const handleImageChange = (e) => {
    handleImageFiles(Array.from(e.target.files));
  };

  const handleImageFiles = (files) => {
    // Toplam resim sayısı kontrolü (mevcut + yeni eklenecekler)
    if (preview.length + files.length > 5) {
      setError("En fazla 5 resim yükleyebilirsiniz");
      return;
    }

    // Dosya tipi kontrolü
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const validFiles = files.filter((file) => allowedTypes.includes(file.type));

    if (validFiles.length < files.length) {
      setError(
        "Sadece resim dosyaları (.jpg, .jpeg, .png, .gif, .webp) yükleyebilirsiniz"
      );
    }

    if (validFiles.length === 0) return;

    // Görsel önizlemesi oluştur
    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));

    // Yeni eklenen resimleri images state'ine ekle
    setImages([...images, ...validFiles]);

    // Tüm önizleme resimlerini birleştir
    setPreview([...preview, ...newPreviews]);
    setError("");
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
    const files = Array.from(e.dataTransfer.files);
    handleImageFiles(files);
  };

  const removeImage = (index) => {
    const newPreview = [...preview];

    // URL nesnesini temizle
    if (index < existingImages.length) {
      // Var olan bir resmi siliyoruz
      const newExistingImages = [...existingImages];
      newExistingImages.splice(index, 1);
      setExistingImages(newExistingImages);
    } else {
      // Yeni eklenen bir resmi siliyoruz
      const newImages = [...images];
      const adjustedIndex = index - existingImages.length;

      URL.revokeObjectURL(preview[index]);
      newImages.splice(adjustedIndex, 1);
      setImages(newImages);
    }

    // Önizleme dizisini güncelle
    newPreview.splice(index, 1);
    setPreview(newPreview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Form doğrulama
    if (
      !formData.title ||
      !formData.category ||
      !formData.description ||
      !formData.city ||
      !formData.condition
    ) {
      setError("Lütfen tüm alanları doldurun");
      setLoading(false);
      return;
    }

    // En az 1 resim olmalı (mevcut veya yeni)
    if (preview.length === 0) {
      setError("Lütfen en az bir resim yükleyin");
      setLoading(false);
      return;
    }

    // Form verisini gönder
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Oturum sonlanmış");
      setLoading(false);
      navigate("/giris");
      return;
    }

    try {
      const formPayload = new FormData();
      formPayload.append("title", formData.title);
      formPayload.append("category", formData.category);
      formPayload.append("description", formData.description);
      formPayload.append("city", formData.city);
      formPayload.append("condition", formData.condition);

      // Korunacak resimler
      existingImages.forEach((image) => {
        formPayload.append("existingImages", image);
      });

      // Yeni resimleri ekle
      images.forEach((image) => {
        formPayload.append("images", image);
      });

      const response = await fetch(`http://localhost:3001/api/listings/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formPayload,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("İlan başarıyla güncellendi!");

        // 2 saniye sonra ilanlarım sayfasına yönlendir
        setTimeout(() => {
          navigate("/ilanlarim");
        }, 2000);
      } else {
        setError(data.error || "İlan güncellenirken bir hata oluştu");
      }
    } catch (error) {
      console.error("İlan güncelleme hatası:", error);
      setError("Sunucu bağlantısında bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  if (loadingListing) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
        <Header />
        <div className="pt-24 pb-12 flex-1 flex items-center justify-center">
          <div className="animate-pulse space-y-8 max-w-3xl w-full">
            <div className="h-40 bg-gray-200 rounded-xl"></div>
            <div className="space-y-3">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />

      <div className="pt-24 pb-12 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-primary-600 to-primary-400 p-6 text-white">
                <h1 className="text-2xl font-bold">İlanı Düzenle</h1>
                <p className="text-primary-100 mt-1">
                  İlanınızın bilgilerini güncelleyin
                </p>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-start">
                  <FaTimes className="mr-3 mt-1 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              {success && (
                <div className="p-4 bg-green-50 border-l-4 border-green-500 text-green-700 flex items-start">
                  <FaCheck className="mr-3 mt-1 flex-shrink-0" />
                  <p>{success}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Ürün Adı
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaTag className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm"
                        placeholder="Ürün adını girin"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Kategori
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaList className="text-gray-400" />
                      </div>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm appearance-none"
                      >
                        <option value="">Kategori Seçin</option>
                        {categories.map((category, index) => (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Şehir seçimi */}
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Şehir
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaMapMarkerAlt className="text-gray-400" />
                      </div>
                      <select
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm appearance-none"
                      >
                        <option value="">Şehir Seçin</option>
                        {TURKEY_CITIES.map((city, index) => (
                          <option key={index} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Ürün Durumu */}
                  <div>
                    <label
                      htmlFor="condition"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Ürün Durumu
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaToolbox className="text-gray-400" />
                      </div>
                      <select
                        id="condition"
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm appearance-none"
                      >
                        <option value="">Ürün Durumu Seçin</option>
                        {ITEM_CONDITIONS.map((condition, index) => (
                          <option key={index} value={condition}>
                            {condition}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Ürün Açıklaması
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                        <FaAlignLeft className="text-gray-400" />
                      </div>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="6"
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm"
                        placeholder="Ürün hakkında detaylı bilgi verin"
                      ></textarea>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ürün Fotoğrafları
                    </label>

                    <div
                      onClick={handleImageClick}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`mt-1 flex flex-col justify-center items-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${
                        isDragging
                          ? "border-primary-500 bg-primary-50"
                          : "border-gray-300 hover:border-primary-400 hover:bg-gray-50"
                      }`}
                    >
                      <div className="space-y-3 text-center">
                        <div className="mx-auto h-20 w-20 text-primary-400 bg-primary-50 rounded-full flex items-center justify-center">
                          <FaCamera className="h-10 w-10" />
                        </div>
                        <div className="flex flex-col text-sm text-gray-600">
                          <span className="font-medium text-primary-600 text-base">
                            Fotoğraf Yükle
                          </span>
                          <span className="text-gray-500">
                            veya sürükleyip bırakın
                          </span>
                        </div>
                        <input
                          id="image-upload"
                          name="image-upload"
                          type="file"
                          accept="image/*"
                          multiple
                          className="sr-only"
                          onChange={handleImageChange}
                        />
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF, WEBP dosyaları - Maksimum 5 fotoğraf
                        </p>
                      </div>
                    </div>

                    {/* Ürün Fotoğrafları Önizleme */}
                    {preview.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Fotoğraflar ({preview.length}/5)
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                          {preview.map((src, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 shadow-sm">
                                <img
                                  src={src}
                                  alt={`Preview ${index + 1}`}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md transform transition-transform group-hover:scale-110"
                              >
                                <FaTimes size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => navigate("/ilanlarim")}
                    className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    İptal
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`py-2 px-6 border border-transparent rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Güncelleniyor..." : "Güncelle"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EditListingPage;
