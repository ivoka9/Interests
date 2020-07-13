// External Moduels

const expres = require("express");
const router = expres.Router();

router.get("/", (req, res) => {
  return res.render("test.ejs");
});

module.exports = router;
