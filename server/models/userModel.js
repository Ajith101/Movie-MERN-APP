const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    watch_later: [{ type: mongoose.Schema.Types.ObjectId, ref: "movies" }],
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
