const shortid = require("shortid");
const URL = require("../models/Url");

async function shortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(500).json({ Error: "url is required" });
  const shortId = shortid();

  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortId });
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
