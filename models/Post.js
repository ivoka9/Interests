const mongoose = require("mongoose");

const Postschema = new mongoose.Schema({
  Title: { type: String, required: true, minlength: 3 },
  Description: { type: String, required: true, minlength: 3 },
  Url: { type: String },
  Interests: [{ type: String }],
  postX: Number,
  postY: Number,
  joined: [String],
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Post", Postschema);
