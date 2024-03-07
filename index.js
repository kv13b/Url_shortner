const express = require("express");
const app = express();
const url = require("./routes/url");
const URL = require("./models/Url");
const { connect } = require("./connect");
const PORT = 3001;

// Corrected MongoDB connection URL with the IP address or hostname of your MongoDB server
connect("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("connected to mongodb")
);

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
  res.redirect(entry.redirectURL);
});
app.use(express.json());
app.use("/url", url);
app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
