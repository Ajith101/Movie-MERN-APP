const express = require("express");
const {
  loginUser,
  registerUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
  addWatchLater,
  getWatchLater,
  removeWatchLater,
} = require("../controller/userController");
const userModel = require("../models/userModel");
const checkAuth = require("../middleware/checkAuth");

const userRoutes = express.Router();

userRoutes.post("/login", loginUser);
userRoutes.post("/register", registerUser);
userRoutes.post("/add-watch-later", checkAuth, addWatchLater);
userRoutes.post("/watch-later", checkAuth, getWatchLater);
userRoutes.post("/remove-watch-later", checkAuth, removeWatchLater);
userRoutes.post("/forgot-password", forgotPassword);
userRoutes.post("/verify-otp", verifyOtp);
userRoutes.post("/change-password", resetPassword);

module.exports = userRoutes;
