const mongoose = require("mongoose");

const userOTPschema = new mongoose.Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  otp: { type: String, required: true },
  created_at: { type: Date, default: Date.now, index: { expires: 300 } },
});

const userOTPmodel = mongoose.model("user-otp", userOTPschema);

module.exports = userOTPmodel;
