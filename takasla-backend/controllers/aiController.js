const { getSwapSuggestions } = require("../utils/geminiService");

// @desc    Yapay zeka ile takas önerileri al
// @route   POST /api/ai/swap-suggestions
// @access  Private
exports.getAiSwapSuggestions = async (req, res) => {
  try {
    const { title, category, description, condition, city } = req.body;

    // Zorunlu alanların kontrolü
    if (!title || !category || !description) {
      return res.status(400).json({
        success: false,
        error: "Takas önerileri için yeterli bilgi sağlanmadı",
      });
    }

    // Yapay zeka servisinden öneriler al
    const suggestions = await getSwapSuggestions({
      title,
      category,
      description,
      condition: condition || "Belirtilmemiş",
      city: city || "Belirtilmemiş",
    });

    res.status(200).json({
      success: true,
      data: suggestions,
    });
  } catch (error) {
    console.error("Takas önerileri alma hatası:", error);
    res.status(500).json({
      success: false,
      error: "Takas önerileri alınırken bir hata oluştu: " + error.message,
    });
  }
};
