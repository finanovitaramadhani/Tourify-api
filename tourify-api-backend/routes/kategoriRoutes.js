const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");
const kategoriController = require("../controllers/kategoriController");

// ADMIN CRUD
router.get("/admin/kategori", auth, admin, kategoriController.getAllKategori);
router.post("/admin/kategori", auth, admin, kategoriController.createKategori);
router.put("/admin/kategori/:id", auth, admin, kategoriController.updateKategori);
router.delete("/admin/kategori/:id", auth, admin, kategoriController.deleteKategori);

module.exports = router;
