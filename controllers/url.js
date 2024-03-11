const shortid = require("shortid");
const URL = require("../models/Url");

async function shortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ Error: "url is required" });
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.render("home", {
    id: shortID,
  });
}
async function getAnanlytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
module.exports = {
  shortUrl,
  getAnanlytics,
};
