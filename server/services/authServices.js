const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashedValue = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

const createToken = (user) => {
  const token = jwt.sign(user, process.env.SECRET, { expiresIn: "10h" });
  return token;
};

const compareHashedValues = (password, DB_password) => {
  return bcrypt.compare(password, DB_password);
};

module.exports = { hashedValue, createToken, compareHashedValues };
