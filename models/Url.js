const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      require: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      require: true,
    },
    visitHistory: [
      {
        timestamp: { type: Number },
      },
    ],
  },
  { timestamps: true } //date and created at will be recorded
);

const url = mongoose.model("url", UrlSchema);
module.exports = url;
