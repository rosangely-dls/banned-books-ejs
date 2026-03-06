const express = require("express");
const router = express.Router();

function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash("error", "Please log in first.");
  res.redirect("/sessions/logon");
}

router.get("/", ensureAuth, (req, res) => {
  res.send("The secret word is: BANNED");
});

module.exports = router;