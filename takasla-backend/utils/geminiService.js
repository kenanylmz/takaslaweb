const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// API anahtarını doğrudan tanımla
const apiKey = "AIzaSyCjTEi_VjqAwzTV_zBxqQa-hUNYgJjzUwQ"; // Burada gerçek anahtarınızı kullanın

// Gemini API istemcisini başlat
const genAI = new GoogleGenerativeAI(apiKey);

// Güncel model adı kullan - gemini-1.5-pro veya gemini-1.0-pro
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

/**
 * Verilen ürün bilgilerine göre takas önerileri alır
 * @param {Object} productInfo - Ürün bilgileri
 * @returns {Array} - Takas önerileri listesi
 */
const getSwapSuggestions = async (productInfo) => {
  try {
    const prompt = `Sen bir takas platformunda danışmanlık yapan bir yapay zeka asistanısın. Kullanıcının ürünü için 5 adet uygun takas önerisi sunman gerekiyor.

Ürün bilgileri:
- Ürün Adı: ${productInfo.title}
- Kategori: ${productInfo.category}
- Ürün Durumu: ${productInfo.condition}
- Şehir: ${productInfo.city}
- Açıklama: ${productInfo.description}

Lütfen aşağıdaki formatta 5 adet takas önerisi sun:
1. [Önerilen ürün adı] - [Kısa açıklama neden bu takas mantıklı olabilir]
2. [Önerilen ürün adı] - [Kısa açıklama neden bu takas mantıklı olabilir]
...

Öneriler yaklaşık olarak aynı değerde olmalı ve kişinin ürün kategorisiyle ilişkili veya tamamlayıcı nitelikte olmalıdır. Önerilerin gerçekçi ve uygulanabilir olmasına dikkat et.`;

    // Hata ayıklama için güncel model ve API detaylarını loglayalım
    console.log("Gemini API isteği gönderiliyor, model:", model.modelName);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Metin içerisinden önerileri işle
    const suggestions = text
      .split("\n")
      .filter((line) => /^\d+\./.test(line)) // Sadece numaralandırılmış satırları al
      .map((line) => {
        // Numara kısmını kaldır ve temizle
        const cleanedLine = line.replace(/^\d+\.\s*/, "").trim();

        // Başlık ve açıklama kısmını ayır
        const titleMatch = cleanedLine.match(/^(.*?)\s*-\s*(.*)/);
        if (titleMatch) {
          return {
            title: titleMatch[1].trim(),
            description: titleMatch[2].trim(),
          };
        }

        return {
          title: cleanedLine,
          description: "",
        };
      });

    return suggestions;
  } catch (error) {
    console.error("Takas önerileri alınırken hata:", error);
    throw new Error("Yapay zeka önerileri alınamadı: " + error.message);
  }
};

module.exports = { getSwapSuggestions };
