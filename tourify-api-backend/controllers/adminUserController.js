const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "role", "created_at"]
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
