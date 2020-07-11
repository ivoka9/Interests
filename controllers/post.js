const express = require("express");
const router = express.Router();

const db = require("../models");

router.get("/", (req, res) => {
  return res.render("posts/allposts.ejs");
});

module.exports = router;
