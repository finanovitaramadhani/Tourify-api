const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");
const importController = require("../controllers/importOsmController");

router.post(
  "/admin/import/osm",
  auth,
  admin,
  importController.importFromOSM
);

module.exports = router;
