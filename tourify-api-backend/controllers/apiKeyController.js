const crypto = require("crypto");
const ApiKey = require("../models/ApiKey");

exports.createApiKey = async (req, res) => {
  try {
    const userId = req.user.id;

    const apiKey = "tourify_" + crypto.randomBytes(16).toString("hex");

    const savedKey = await ApiKey.create({
      user_id: userId,
      api_key: apiKey
    });

    res.status(201).json({
      message: "API Key berhasil dibuat",
      api_key: savedKey.api_key
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.myApiKeys = async (req, res) => {
  try {
    const userId = req.user.id;

    const keys = await ApiKey.findAll({
      where: { user_id: userId }
    });

    res.json(keys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
