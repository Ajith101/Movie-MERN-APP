const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema(
  {
    movie_image_URI: { type: String, required: true },
    movie_title: { type: String, required: true },
    movie_description: { type: String, required: true },
    rating: { type: Number },
    genre: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genres" }],
  },
  { timestamps: true }
);

const moviesModel = mongoose.model("movies", moviesSchema);

module.exports = moviesModel;
