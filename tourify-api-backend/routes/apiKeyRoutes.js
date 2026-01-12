const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const apiKeyController = require("../controllers/apiKeyController");

router.post("/apikey/create", auth, apiKeyController.createApiKey);
router.get("/apikey/my", auth, apiKeyController.myApiKeys);

module.exports = router;
