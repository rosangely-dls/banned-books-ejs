const User = require("../models/User");

const registerShow = (req, res) => {
  res.render("register");
};

const registerDo = async (req, res, next) => {
  try {

    if (req.body.password !== req.body.password1) {
      req.flash("error", "Passwords do not match");
      return res.render("register");
    }

    await User.create(req.body);

    req.flash("info", "Registration successful. Please log in.");
    res.redirect("/sessions/logon");

  } catch (err) {

    // Duplicate email error
    if (err.code === 11000) {
      req.flash("error", "Email already exists");
      return res.render("register");
    }

    // Mongoose validation errors
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(e => e.message);
      messages.forEach(msg => req.flash("error", msg));
      return res.render("register");
    }

    next(err);
  }
};

const logonShow = (req, res) => {

  if (req.user) {
    return res.redirect("/");
  }

  res.render("logon");
};

const logoff = (req, res) => {

  req.session.destroy(() => {
    res.redirect("/");
  });

};

module.exports = {
  registerShow,
  registerDo,
  logoff,
  logonShow
};