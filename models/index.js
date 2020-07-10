const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/final";

// Mongoose connection
mongoose
  .connect(process.env.MONGODB_URL || url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("mongo DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = {
  User: require("./User"),
  allInterests: require("./Interests"),
};
