const mongoose = require("mongoose");

const allinterestsSchema = new mongoose.Schema({
  interest: { type: String, unique: true },
});

module.exports = mongoose.model("AllInterests", allinterestsSchema);
