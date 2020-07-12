const express = require("express");
const router = express.Router();

const db = require("../models");

router.get("/", (req, res) => {
  return res.render("posts/allposts.ejs");
});

router.get("/create", async (req, res) => {
  try {
    allInterests = await db.allInterests.find({});
    data = { allInterests: allInterests };
    return res.render("posts/create.ejs", data);
  } catch (err) {
    console.log(err);
  }
});

router.post("/create", async (req, res) => {
  newPost = {
    Title: req.body.Title,
    Description: req.body.Descrpiton,
    Url: req.body.Url,
    Interests: req.body.arr,
    User: req.session.user.id,
  };
  createdPost = await db.post.create(newPost);
  foundUser = await db.User.findById(req.session.user.id);
  console.log(foundUser);
  addToUser = await foundUser.Post.push(createdPost);
  await foundUser.save();
  return res.redirect("/post");
});

module.exports = router;
