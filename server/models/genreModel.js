const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
  },
  { timestamps: true }
);

const genreMOdel = mongoose.model("Genres", genreSchema);

module.exports = genreMOdel;
