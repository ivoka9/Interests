const expres = require("express");
const router = expres.Router();
const db = require("../models");
const bcrypt = require("bcryptjs");

router.get("/login", (req, res) => {
  res.render("user/index.ejs");
});

router.post("/login", (req, res) => {
  const user = {
    Username: req.body.username,
    Password: req.body.password,
  };

  db.User.create(user, (err, created) =>
    err ? console.log(err) : res.redirect("/login")
  );
});

module.exports = router;
