const bcrypt = require("bcrypt");
const User = require("../models/User");

async function seedAdmin() {
  const admin = await User.findOne({ where: { role: "admin" } });

  if (!admin) {
    const hashed = await bcrypt.hash("admin123", 10);

    await User.create({
      username: "admin",
      password: hashed,
      role: "admin"
    });

    console.log("Admin account created");
  }
}

module.exports = seedAdmin;
