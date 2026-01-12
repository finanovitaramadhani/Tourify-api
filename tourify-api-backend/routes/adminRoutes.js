const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const wisataController = require("../controllers/wisataController");
const adminUserController = require("../controllers/adminUserController");

// CREATE wisata + upload foto
router.post(
  "/admin/wisata",
  auth,
  admin,
  upload.single("gambar"),
  wisataController.createWisata
);

// UPDATE wisata + upload foto
router.put(
  "/admin/wisata/:id",
  auth,
  admin,
  upload.single("gambar"),
  wisataController.updateWisata
);

// DELETE wisata
router.delete(
  "/admin/wisata/:id",
  auth,
  admin,
  wisataController.deleteWisata
);

// GET wisata (admin)
router.get(
  "/admin/wisata",
  auth,
  admin,
  wisataController.getAllWisataAdmin
);

// GET list user (tanpa api key)
router.get(
  "/admin/users",
  auth,
  admin,
  adminUserController.getAllUsers
);

module.exports = router;
