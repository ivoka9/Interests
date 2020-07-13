//  Outside  requirements
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const sessions = require("express-session");
const store = require("connect-mongo")(sessions);

// My requirements
const control = require("./controllers");

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  sessions({
    store: new store({
      url: process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/final",
    }),
    secret: process.env.SECRET_KEY || "random",
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
  })
);

app.use("/", control.user);
app.use("/test", control.test);
app.use("/post", control.post);

const server = app.listen(PORT, () => {
  console.log("runing server");
});
