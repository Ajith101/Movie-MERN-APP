const mongoose = require("mongoose");
const validateId = require("../config/validateID");
const genreMOdel = require("../models/genreModel");
const moviesModel = require("../models/moviesModel");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// get  all movies
const getAllmovies = async (req, res) => {
  try {
    const allMovies = await moviesModel
      .find()
      .select("movie_image_URI movie_title movie_description rating genre")
      .populate("genre");
    return res.status(200).json(allMovies);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};
// get single movies
const getSingleMovie = async (req, res) => {
  try {
    const { id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Id is not valid" });
    }
    // const options = { sort: [{ title: "asc" }] };
    const singleMovie = await moviesModel
      .findById(req.body.id)
      .select("movie_image_URI movie_title movie_description rating genre");

    return res.status(200).json(singleMovie);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

const filteredMovies = async (req, res) => {
  const genres = req.query?.genres?.split(",");
  const { rating, search } = req.query;
  let page = Number(req?.query?.page) || 1;
  let limit = 6;
  let skip = (page - 1) * limit;
  let queryObject = {};
  if (genres && genres != "all") {
    const getGeneresId = await genreMOdel.find({
      title: { $in: [...genres] },
    });
    const listOfIds = getGeneresId?.map((item) => {
      return item._id;
    });
    queryObject.genre = { $in: [...listOfIds] };
  }
  if (rating) {
    queryObject.rating = { $lte: rating };
  }
  if (search) {
    queryObject.movie_title = { $regex: search, $options: "i" };
  }
  const result = await moviesModel
    .find(queryObject)
    .populate({ path: "genre", select: ["title"] })
    .sort(queryObject.rating ? { rating: "desc" } : null)
    .skip(skip)
    .limit(limit);
  const count = await moviesModel.find(queryObject).count();
  const totalPage = Math.ceil(count / limit);
  return res.status(200).json({
    result: result.length,
    total: count,
    currentPage: page,
    totalPage,
    data: result,
  });
};

const addMovie = (req, res) => {
  const { movie_image_URI } = req.body;
  try {
    cloudinary.uploader.upload(
      movie_image_URI,
      { folder: "posts" },
      async (err, result) => {
        if (err)
          return res.status(400).json({ message: "Image cannot be added" });
        const newPost = new moviesModel({
          movie_image_URI: result.url,
          movie_title: req?.body?.movie_title,
          movie_description: req?.body?.movie_description,
          rating: req?.body?.rating,
          genre: req?.body?.genre,
        });
        await newPost.save();
        return res.status(200).json({ message: "added" });
      }
    );
  } catch (error) {
    return res.status(400).json({ meaasge: error.message });
  }
};

const editMovie = async (req, res) => {
  const { movie_image_URI, movie_title, movie_description, rating, genre } =
    req.body;
  const id = req.body._id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Item not found / id not valid" });
    }
    if (req?.body?.movie_image_URI !== null) {
      cloudinary.uploader.upload(
        movie_image_URI,
        { folder: "posts" },
        async (err, result) => {
          if (err)
            return res.status(400).json({ message: "Image cannot be added" });
          const editedMovie = {
            movie_image_URI: result.url,
            movie_title: movie_title,
            movie_description: movie_description,
            rating: rating,
            genre: genre,
          };
          const response = await moviesModel.findByIdAndUpdate(
            id,
            editedMovie,
            { new: true }
          );
          return res.status(200).json(response);
        }
      );
    } else {
      const editedMovie = {
        movie_title: movie_title,
        movie_description: movie_description,
        rating: rating,
        genre: genre,
      };
      const response = await moviesModel.findByIdAndUpdate(id, editedMovie, {
        new: true,
      });
      return res.status(200).json(response);
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Item not found / id not valid" });
    }
    await moviesModel.findByIdAndDelete(id);
    const allMovies = await moviesModel.find().populate("genre");
    return res.status(200).json(allMovies);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const getAllgenre = async (req, res) => {
  try {
    const allGenre = await genreMOdel
      .find()
      .select("title")
      .sort({ title: "asc" });
    return res.status(200).json(allGenre);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const addGenre = async (req, res) => {
  try {
    const { title } = req.body;
    if (title) {
      await genreMOdel.create(req.body);
      const allGenre = await genreMOdel.find();
      return res.status(201).json(allGenre);
    }
    return res.status(400).json({ message: "Title required" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const editGenre = async (req, res) => {
  try {
    const { id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Item not found / id not valid" });
    }
    await genreMOdel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const allGenre = await genreMOdel.find();
    return res.status(200).json(allGenre);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const deleteGenre = async (req, res) => {
  try {
    const { id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Item not found / id not valid" });
    }
    await genreMOdel.findByIdAndDelete(id);
    const allGenre = await genreMOdel.find();
    return res.status(200).json(allGenre);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

module.exports = {
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
};
