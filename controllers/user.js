// External Moduels

const expres = require("express");
const router = expres.Router();
const bcrypt = require("bcryptjs");

// internal  Moduels
const db = require("../models");

// Going to Login page

router.get("/", (req, res) => {
  const wrongUsernameOrPassword = false;
  const usernameTakenFlag = false;
  const accCreated = false;
  const data = { usernameTakenFlag, wrongUsernameOrPassword, accCreated };
  res.render("user/index.ejs", data);
});

// Trying to crate a user

router.post("/", async (req, res) => {
  try {
    let usernameTakenFlag = false;
    const wrongUsernameOrPassword = false;
    let accCreated = false;

    // If one already excists Return him to the Register page with  Error
    const alreadyMade = await db.User.findOne({ Username: req.body.username });
    if (alreadyMade) {
      usernameTakenFlag = true;
      const data = { usernameTakenFlag, wrongUsernameOrPassword, accCreated };
      return res.render("user/index.ejs", data);
    }
    // Otherwise it Creates the User
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    const user = {
      Username: req.body.username,
      Password: req.body.password,
    };
    await db.User.create(user);
    accCreated = true;

    const data = { usernameTakenFlag, wrongUsernameOrPassword, accCreated };
    // Returns him to the Login so he can login
    return res.render("user/index.ejs", data);
    // Error handaling
  } catch (err) {
    console.log(err);
    res.render("user/index.ejs");
  }
});

// User tryies to Login
router.post("/interests", async (req, res) => {
  let err = "";

  try {
    // Finding the user in the DB and looks if the password matches

    const findUser = await db.User.findOne({ Username: req.body.username });
    if (findUser) {
      const rightPassword = await bcrypt.compare(
        req.body.password,
        findUser.Password
      );
      if (rightPassword) {
        req.session.user = {
          id: findUser._id,
          username: findUser.Username,
          interests: findUser.interests,
        };
        const allInterests = await db.allInterests.find();
        const data = {
          allInterests: allInterests,
          userinterests: findUser.interests,
          err: err,
          userid: req.session.user.id,
        };
        return res.render("user/interests.ejs", data);
      }
    }
    const accCreated = false;

    const usernameTakenFlag = false;
    const wrongUsernameOrPassword = true;
    data = {
      usernameTakenFlag,
      wrongUsernameOrPassword,
      accCreated,
    };
    // If not he get send back to the Login page with an Error
    return res.render("user/index.ejs", data);

    // Error handaling
  } catch (err) {
    console.log(err);
  }
});

// allowing the user to create new interests and add them
// to his own databse
router.post("/interests/add", async (req, res) => {
  let err = "";

  try {
    try {
      await db.allInterests.create(req.body);
      await db.User.findByIdAndUpdate(req.session.user.id, {
        $push: { interests: req.body.interest },
      });
    } catch {
      err = "err";
    }

    const allInterests = await db.allInterests.find({});
    const findUser = await db.User.findById(req.session.user.id);

    const data = {
      allInterests: allInterests,
      userinterests: findUser.interests,
      err: err,
      userid: req.session.user.id,
    };
    return res.render("user/interests.ejs", data);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get("/interests", async (req, res) => {
  let err = "";
  try {
    const allInterests = await db.allInterests.find({});
    const findUser = await db.User.findById(req.session.user.id);

    const data = {
      allInterests: allInterests,
      userinterests: findUser.interests,
      err: err,
      userid: req.session.user.id,
    };
    return res.render("user/interests.ejs", data);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.put("/interests/api", async (req, res) => {
  try {
    let arr = req.body;
    let updates = [];

    for (let i = 0; i < arr.length; i++) {
      element = await db.allInterests.findById(arr[i]);
      updates.push(element.interest);
    }
    await db.User.findByIdAndUpdate(req.session.user.id, {
      interests: updates,
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  return res.redirect("/");
});

module.exports = router;
