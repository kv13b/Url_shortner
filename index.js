const express = require("express");
const app = express();
const url = require("./routes/url");
const URL = require("./models/Url");
const { connect } = require("./connect");
const PORT = 3001;
const path = require("path");
const staticRoute = require("./routes/staticRoutes");
// Connect to MongoDB
connect("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("Connected to MongoDB")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

// Middleware to parse JSON requests

// Route for accessing short URLs
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  if (entry && entry.redirectURL) {
    res.redirect(entry.redirectURL);
  } else {
    res.status(404).send("Short URL not found");
  }
});

// Route for testing

// Route for handling URL-related operations
app.use("/url", url);
app.use("/", staticRoute);
// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
