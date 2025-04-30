import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCamera,
  FaUpload,
  FaTimes,
  FaArrowLeft,
  FaCheck,
  FaImage,
  FaTag,
  FaList,
  FaAlignLeft,
  FaMapMarkerAlt,
  FaToolbox,
  FaRobot,
  FaLightbulb,
  FaSpinner,
  FaExchangeAlt,
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

const ListingPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    city: "",
    condition: "",
  });
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [suggestionsError, setSuggestionsError] = useState("");
  const navigate = useNavigate();

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
    // Kullanıcı girişi kontrolü
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/giris");
      return;
    }
  }, [navigate]);

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
    // En fazla 5 resim
    if (images.length + files.length > 5) {
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
    setPreview([...preview, ...newPreviews]);
    setImages([...images, ...validFiles]);
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
    const newImages = [...images];
    const newPreview = [...preview];

    // Önizleme URL'ini temizle
    URL.revokeObjectURL(newPreview[index]);

    newImages.splice(index, 1);
    newPreview.splice(index, 1);

    setImages(newImages);
    setPreview(newPreview);
  };

  const nextStep = () => {
    if (
      activeStep === 1 &&
      (!formData.title ||
        !formData.category ||
        !formData.city ||
        !formData.condition)
    ) {
      setError(
        "Lütfen ürün adı, kategori, şehir ve ürün durumu alanlarını doldurun"
      );
      return;
    }

    if (activeStep === 2 && !formData.description) {
      setError("Lütfen ürün açıklaması yazın");
      return;
    }

    if (activeStep === 3 && images.length === 0) {
      setError("Lütfen en az bir resim yükleyin");
      return;
    }

    setError("");
    setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Form doğrulama - tüm zorunlu alanların dolu olduğundan emin olalım
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

    // En az 1 resim olmalı
    if (images.length === 0) {
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
      formPayload.append("city", formData.city); // Şehir değerinin eklendiğinden emin olun
      formPayload.append("condition", formData.condition); // Durum değerinin eklendiğinden emin olun

      // Resimleri ekle
      images.forEach((image) => {
        formPayload.append("images", image);
      });

      console.log("Gönderilen veriler:", {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        city: formData.city,
        condition: formData.condition,
        imageCount: images.length,
      });

      const response = await fetch("http://localhost:3001/api/listings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formPayload,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("İlan başarıyla oluşturuldu!");
        // Formları temizle
        setFormData({
          title: "",
          category: "",
          description: "",
          city: "",
          condition: "",
        });
        setImages([]);
        setPreview([]);

        // 2 saniye sonra ilanlarım sayfasına yönlendir
        setTimeout(() => {
          navigate("/ilanlarim");
        }, 2000);
      } else {
        setError(data.error || "İlan oluşturulurken bir hata oluştu");
      }
    } catch (error) {
      console.error("İlan gönderme hatası:", error);
      setError("Sunucu bağlantısında bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  // Yapay zeka takas önerilerini al
  const getAiSwapSuggestions = async () => {
    try {
      setLoadingSuggestions(true);
      setSuggestionsError("");

      const token = localStorage.getItem("token");
      if (!token) {
        setSuggestionsError("Oturum sonlanmış");
        return;
      }

      if (!formData.title || !formData.category || !formData.description) {
        setSuggestionsError(
          "Takas önerileri için önce ürün adı, kategori ve açıklama alanlarını doldurmalısınız."
        );
        setLoadingSuggestions(false);
        return;
      }

      const response = await fetch(
        "http://localhost:3001/api/ai/swap-suggestions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formData.title,
            category: formData.category,
            description: formData.description,
            condition: formData.condition,
            city: formData.city,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setAiSuggestions(data.data);
        setShowAiSuggestions(true);
      } else {
        setSuggestionsError(data.error || "Öneriler alınırken bir hata oluştu");
      }
    } catch (error) {
      console.error("Takas önerileri alma hatası:", error);
      setSuggestionsError("Sunucu bağlantısında bir hata oluştu");
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
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

            {/* Şehir seçimi alanı */}
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
          </div>
        );
      case 2:
        return (
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
            <p className="mt-2 text-sm text-gray-500">
              Ürünün durumu, kullanım süresi, özellikleri gibi detayları
              paylaşmanız takası kolaylaştırır.
            </p>
          </div>
        );
      case 3:
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Ürün Fotoğrafları
              </label>

              <button
                type="button"
                onClick={getAiSwapSuggestions}
                className="flex items-center text-sm text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-md transition-colors"
                disabled={loadingSuggestions}
              >
                {loadingSuggestions ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  <FaRobot className="mr-2" />
                )}
                {loadingSuggestions
                  ? "Öneriler Alınıyor..."
                  : "Yapay Zeka İle Takas Önerisi Al"}
              </button>
            </div>

            {suggestionsError && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
                <p>{suggestionsError}</p>
              </div>
            )}

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
                  <span className="text-gray-500">veya sürükleyip bırakın</span>
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
                  Yüklenen Fotoğraflar ({preview.length}/5)
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
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-800 mb-3">
                Ürün Bilgileri
              </h3>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-4">
                  <span className="text-gray-500">Ürün Adı:</span>
                  <span className="col-span-2 font-medium">
                    {formData.title}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <span className="text-gray-500">Kategori:</span>
                  <span className="col-span-2 font-medium">
                    {formData.category}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <span className="text-gray-500">Şehir:</span>
                  <span className="col-span-2 font-medium">
                    {formData.city}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <span className="text-gray-500">Açıklama:</span>
                  <p className="col-span-2">{formData.description}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <span className="text-gray-500">Fotoğraflar:</span>
                  <div className="col-span-2 flex flex-wrap gap-2">
                    {preview.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="w-16 h-16 rounded-md object-cover border border-gray-200"
                      />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <span className="text-gray-500">Ürün Durumu:</span>
                  <span className="col-span-2 font-medium">
                    {formData.condition}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-blue-700 text-sm">
                "İlanı Oluştur" butonuna tıklayarak, ilanınızın diğer
                kullanıcılar tarafından görüntülenebileceğini kabul ediyorsunuz.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />

      <div className="pt-24 pb-12 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-primary-600 to-primary-400 p-6 text-white">
                <h1 className="text-2xl font-bold">Yeni İlan Oluştur</h1>
                <p className="text-primary-100 mt-1">
                  Takas etmek istediğiniz ürünün bilgilerini girin
                </p>
              </div>

              {/* Adım göstergesi */}
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center w-full">
                    {[1, 2, 3, 4].map((step) => (
                      <React.Fragment key={step}>
                        <div
                          className={`flex flex-col items-center relative ${
                            step <= activeStep
                              ? "text-primary-500"
                              : "text-gray-400"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              step < activeStep
                                ? "bg-primary-500 text-white"
                                : step === activeStep
                                ? "border-2 border-primary-500 bg-white"
                                : "border-2 border-gray-300 bg-white"
                            }`}
                          >
                            {step < activeStep ? <FaCheck size={12} /> : step}
                          </div>
                          <span className="text-xs mt-1">
                            {step === 1 && "Temel Bilgiler"}
                            {step === 2 && "Açıklama"}
                            {step === 3 && "Fotoğraflar"}
                            {step === 4 && "Onay"}
                          </span>
                        </div>

                        {step < 4 && (
                          <div
                            className={`flex-1 h-1 ${
                              step < activeStep
                                ? "bg-primary-500"
                                : "bg-gray-300"
                            }`}
                          ></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
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
                {renderStepContent()}

                <div className="flex justify-between pt-4 border-t border-gray-100">
                  {activeStep > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Geri
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {activeStep < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="py-2 px-6 border border-transparent rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Devam Et
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className={`py-2 px-6 border border-transparent rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                        loading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {loading ? "İlan Oluşturuluyor..." : "İlanı Oluştur"}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Yapay Zeka Önerileri Modal */}
      {showAiSuggestions && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-500 p-6 text-white">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <FaLightbulb className="text-yellow-300 mr-3 text-2xl" />
                    <h3 className="text-xl font-bold">Takas Önerileri</h3>
                  </div>
                  <button
                    onClick={() => setShowAiSuggestions(false)}
                    className="text-white hover:text-gray-200"
                  >
                    <FaTimes />
                  </button>
                </div>
                <p className="mt-2 text-blue-100">
                  Yapay zeka, ürününüz için aşağıdaki takas önerilerini
                  oluşturdu.
                </p>
              </div>

              <div className="bg-white px-6 py-4">
                <div className="space-y-4">
                  {aiSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
                          <FaExchangeAlt className="text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-800">
                            {suggestion.title}
                          </h4>
                          <p className="text-gray-600 mt-1">
                            {suggestion.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAiSuggestions(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Kapat
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

export default ListingPage;
