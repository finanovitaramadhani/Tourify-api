const express = require("express");
const app = express();
require("dotenv").config();

const sequelize = require("./config/database");

const cors = require("cors");

app.use(cors({
  origin: "http://localhost:3001",
  credentials: true
}));


// MIDDLEWARE BODY PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
const authRoutes = require("./routes/authRoutes");
const apiKeyRoutes = require("./routes/apiKeyRoutes");
const adminRoutes = require("./routes/adminRoutes");
const kategoriRoutes = require("./routes/kategoriRoutes");
const wisataRoutes = require("./routes/wisataRoutes");
const importRoutes = require("./routes/importRoutes");

app.use("/api", authRoutes);
app.use("/api", apiKeyRoutes);
app.use("/api", adminRoutes);
app.use("/api", kategoriRoutes);
app.use("/api", wisataRoutes);
app.use("/api", importRoutes);
app.use("/uploads", express.static("uploads"));


// TEST
app.get("/", (req, res) => {
  res.send("Tourify API is running");
});

// 🔥 INI YANG HILANG SEBELUMNYA
sequelize.authenticate().then(() => {
  console.log("Database connected");
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}).catch(err => {
  console.error("Database error:", err);
});
