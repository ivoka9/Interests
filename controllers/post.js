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
  console.log(req.body);
  try {
    newPost = {
      Title: req.body.Title,
      Description: req.body.Descrpiton,
      Url: req.body.Url,
      Interests: req.body.arr,
      User: req.session.user.id,
      postX: req.body.postX,
      postY: req.body.postY,
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
  data = {
    post: post,
    userid: req.session.user.id,
    username: req.session.user.username,
  };
  return res.render("posts/post.ejs", data);
});

router.delete("/:id/del", async (req, res) => {
  await db.post.findByIdAndDelete(req.params.id);
  return res.redirect(`/post/mine/${req.session.user.id}`);
});

router.put("/join/:id", async (req, res) => {
  try {
    let post = await db.post.findById(req.params.id);
    post.joined.push(req.session.user.username);
    post.save();
    console.log(post);
  } catch (err) {
    console.log(err);
  }
  res.redirect("/post/" + req.params.id);
});

router.put("/leave/:id", async (req, res) => {
  try {
    let post = await db.post.findById(req.params.id);
    let remove = post.joined.indexOf(req.session.user.username);
    post.joined.splice(remove, 1);
    post.save();
    console.log(post);
  } catch (err) {
    console.log(err);
  }
  res.redirect("/post/" + req.params.id);
});
module.exports = router;
