const express = require("express");
const router = express.Router();

const db = require("../models");

// getting all the posts
router.get("/", async (req, res) => {
  let user = await db.User.findById(req.session.user.id);
  let arr = user.interests;
  allPosts = await db.post.find({
    Interests: { $in: arr },
  });
  data = {
    allPosts: allPosts,
    userid: req.session.user.id,
  };
  return res.render("posts/allposts.ejs", data);
});

//Creating  the posts

// The page that lets me create the post
router.get("/create", async (req, res) => {
  try {
    allInterests = await db.allInterests.find({});
    data = { allInterests: allInterests, userid: req.session.user.id };
    return res.render("posts/create.ejs", data);
  } catch (err) {
    console.log(err);
  }
});

// The post req itself

router.post("/create", async (req, res) => {
  try {
    newPost = {
      Title: req.body.Title,
      Description: req.body.Descrpiton,
      Url: req.body.Url,
      Interests: req.body.arr,
      User: req.session.user.id,
    };

    createdPost = await db.post.create(newPost);
    foundUser = await db.User.findById(req.session.user.id);
    addToUser = await foundUser.Post.push(createdPost);
    await foundUser.save();
    return res.redirect("/post");
  } catch (err) {
    console.log(err);
  }
});

// seeing all the posts that belong to a user

router.get("/mine/:id", async (req, res) => {
  try {
    const post = await db.User.findById(req.params.id).populate("Post").exec();
    let myPosts = [];
    myPosts.push(post);
    data = {
      myPosts: myPosts,
      userid: req.session.user.id,
    };
    return res.render("posts/mine.ejs", data);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  post = await db.post.findById(req.params.id).populate("User").exec();
  data = { post: post, userid: req.session.user.id };
  return res.render("posts/post.ejs", data);
});

router.delete("/:id/del", async (req, res) => {
  await db.post.findByIdAndDelete(req.params.id);
  return res.redirect(`/post/mine/${req.session.user.id}`);
});
module.exports = router;
