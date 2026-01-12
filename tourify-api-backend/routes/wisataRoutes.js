const express = require("express");
const router = express.Router();
const apiKeyMiddleware = require("../middlewares/apiKeyMiddleware");
const wisataController = require("../controllers/wisataController");

router.get("/wisata", apiKeyMiddleware, wisataController.getAllWisata);

module.exports = router;
