const mongoose = require("mongoose");

// User Model

const userSchema = new mongoose.Schema({
  Username: { type: String, required: true, unique: true },
  Password: { type: String, required: true, minlength: 1 },
  Interests: { type: Array },
});

module.exports = mongoose.model("User", userSchema);
