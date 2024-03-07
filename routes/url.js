const express = require("express");
const { shortUrl, getAnanlytics } = require("../controllers/url");

const router = express.Router();
router.post("/", shortUrl);
router.get("/analytics/:shortId", getAnanlytics);

module.exports = router;
