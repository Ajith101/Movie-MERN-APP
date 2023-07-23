const mongoose = require("mongoose");

const validateId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("This id is not valid Or not found");
};

module.exports = validateId;
