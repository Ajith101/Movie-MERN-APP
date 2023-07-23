const userModel = require("../models/userModel");
const userOTPmodel = require("../models/userOTPmodel");
const {
  hashedValue,
  createToken,
  compareHashedValues,
} = require("../services/authServices");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.MAIL_PASS,
  },
});

const sendOTPverification = async (result, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 900000)}`;
    const mailOptions = {
      from: process.env.EMAIL,
      to: result.email,
      subject: "Verify your Email",
      html: `<p>Note the OTP <p>
      <p>Enter this OTP <b>${otp}</b> in the app to verify your account</p>`,
    };
    const hashedOTP = await hashedValue(otp);
    const newOTPdata = userOTPmodel({
      otp: hashedOTP,
      userId: result._id,
      email: result.email,
    });
    await newOTPdata.save();
    await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .json({ message: `OTP code has been sended on ${result.email}` });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "Failed",
      message: "Something went wrong",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isExist = await userModel.findOne({ email });
    if (isExist) {
      const checkPassword = await compareHashedValues(
        password,
        isExist.password
      );
      if (checkPassword) {
        const token = createToken({
          id: isExist._id,
          userName: isExist.userName,
        });
        return res.status(200).json({
          user: {
            userName: isExist.userName,
            email: isExist.email,
            watch_later: isExist.watch_later,
          },
          token,
        });
      }
      return res.status(400).json({ message: "Invalid credential" });
    }
    return res.status(400).json({ message: "Invalid credential" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isValid = await userModel.findOne({ email });
    if (isValid) {
      return res.status(400).json({ message: "Email already exist" });
    }
    const hash = await hashedValue(password);
    req.body.password = hash;
    const isExist = await userModel.create(req.body);
    const token = createToken({
      id: isExist._id,
      userName: isExist.userName,
    });
    return res.status(200).json({
      user: {
        userName: isExist.userName,
        email: isExist.email,
        watch_later: isExist.watch_later,
      },
      token,
    });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const isExist = await userModel.findOne({ email });
    if (isExist) {
      sendOTPverification(isExist, res);
    } else {
      return res.status(404).json({ message: "Email not valid" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something went wrong",
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const isExist = await userOTPmodel.find({ email });
    if (isExist.length === 0) {
      return res.status(400).json({ message: "Something went wrong" });
    }
    const latestOtp = isExist[isExist.length - 1];
    const checkOTP = await compareHashedValues(otp, latestOtp.otp);
    if (checkOTP) {
      await userOTPmodel.deleteMany({ email: latestOtp.email });
      return res.status(200).json({ message: "verified" });
    } else {
      return res.status(400).json({ message: "OTP Not valid" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: `OTP is not valid ${error.message}` });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password, email } = req?.body;
    const isExist = await userModel.findOne({ email });
    if (isExist) {
      const checkOldPassword = await compareHashedValues(
        password,
        isExist.password
      );
      if (checkOldPassword) {
        return res.status(400).json({ message: "You enter old password" });
      }
      const hashedPassword = await hashedValue(password);
      isExist.password = hashedPassword;
      await isExist.save();
      return res.status(200).json({ message: "Password changed" });
    }
    return res.status(404).json({ message: "user not found" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Something went wrong ${error.message}` });
  }
};

const addWatchLater = async (req, res) => {
  const { movieId } = req.body;
  try {
    const isExist = await userModel.findOne({
      _id: req?.userId,
      watch_later: { $in: [movieId] },
    });
    if (isExist) {
      return res.status(400).json({ message: "Movie already in watchLater" });
    }
    await userModel.findOneAndUpdate(
      { _id: req?.userId },
      { $push: { watch_later: movieId } },
      { new: true }
    );
    return res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

const getWatchLater = async (req, res) => {
  try {
    const checkUser = await userModel
      .findOne({ _id: req?.userId })
      .select("watch_later")
      .populate({ path: "watch_later", populate: { path: "genre" } });
    if (checkUser) {
      let page = parseInt(req.query.page) || 1;
      let limit = 3;
      let skip = (page - 1) * limit;
      const movies = checkUser.watch_later.slice(skip, skip + limit);
      const totalPage = Math.ceil(checkUser.watch_later.length / limit);
      return res.status(200).json({
        result: movies.length,
        total: checkUser.watch_later.length,
        currentPage: page,
        totalPage,
        data: movies,
      });
    }
    return res.status(404).json({ message: "User not valid" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const removeWatchLater = async (req, res) => {
  const { movieId } = req.body;
  try {
    const checkMovieExist = await userModel.findOne({
      _id: req?.userId,
      watch_later: { $in: [movieId] },
    });
    if (!checkMovieExist) {
      return res.status(400).json({ message: "movie not exist" });
    } else {
      const updateList = await userModel.findOneAndUpdate(
        { _id: req?.userId },
        { $pull: { watch_later: movieId } },
        { new: true }
      );
      return res.status(200).json(updateList);
    }
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports = {
  loginUser,
  registerUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
  addWatchLater,
  getWatchLater,
  removeWatchLater,
};
