const express = require("express");
const router = express.Router();

const ensureAuth = require("../middleware/auth");

// GET secret word page
router.get("/", ensureAuth, (req, res) => {
  if (!req.session.secretWord) {
    req.session.secretWord = "Express";
  }

  res.render("secretWord", {
    secretWord: req.session.secretWord,
  });
});

// POST update secret word
router.post("/", ensureAuth, (req, res) => {
  const { secretWord } = req.body;

  if (secretWord.startsWith("P")) {
    req.flash("error", "Secret words starting with P are not allowed!");
    return res.redirect("/secretWord");
  }

  req.session.secretWord = secretWord;

  req.flash("info", "Secret word updated!");
  res.redirect("/secretWord");
});

module.exports = router;
