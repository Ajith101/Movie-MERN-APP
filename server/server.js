const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const moviesRouter = require("./routes/moviesRoute");

const app = express();
const PORT = process.env.PORT || 2050;

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/api/user", userRoutes);
app.use("/api/movies", moviesRouter);

connectDB();
app.listen(PORT, () => {
  console.log(`Connected to ${PORT}`);
});
