const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  try {
    const token = req?.headers?.["authorization"].split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, token) => {
      if (err) {
        return res.status(400).json({ message: "Token is expired" });
      }
      req.userId = token.id;
      next();
    });
  } catch (error) {
    return res.status(400).json({ message: "Token is not valid" });
  }
};

module.exports = checkAuth;
