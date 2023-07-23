const express = require("express");
const {
  getAllmovies,
  addMovie,
  editMovie,
  getAllgenre,
  addGenre,
  editGenre,
  deleteGenre,
  deleteMovie,
  getSingleMovie,
  filteredMovies,
} = require("../controller/moviesController");

const moviesRouter = express.Router();

moviesRouter.get("/", getAllmovies);
moviesRouter.post("/single", getSingleMovie);
moviesRouter.post("/filter", filteredMovies);
moviesRouter.post("/", addMovie);
moviesRouter.put("/", editMovie);
moviesRouter.delete("/", deleteMovie);
moviesRouter.get("/genre", getAllgenre);
moviesRouter.post("/genre", addGenre);
moviesRouter.put("/genre", editGenre);
moviesRouter.delete("/genre", deleteGenre);

module.exports = moviesRouter;
