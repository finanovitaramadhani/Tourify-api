const ApiKey = require("../models/ApiKey");

module.exports = async (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(403).json({
        message: "API Key tidak ditemukan"
      });
    }

    const validKey = await ApiKey.findOne({
      where: {
        api_key: apiKey,
        is_active: true
      }
    });

    if (!validKey) {
      return res.status(401).json({
        message: "API Key tidak valid"
      });
    }

    // (opsional) simpan user_id untuk kebutuhan lanjut
    req.apiKey = validKey;

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
