const User = require("../models/User");

const registerShow = (req, res) => {
  res.render("register");
};

const registerDo = async (req, res) => {

  if (req.body.password != req.body.password1) {

    req.flash("error", "Passwords do not match");

    return res.render("register", {
      errors: req.flash("error")
    });

  }

  try {

    await User.create(req.body);

    req.flash("info", "Registration successful");

    res.redirect("/");

  } catch (err) {

    req.flash("error", err.message);

    return res.render("register", {
      errors: req.flash("error")
    });

  }

};

const logonShow = (req, res) => {

  if (req.user) {
    return res.redirect("/");
  }

  res.render("logon");
};



const logoff = (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.redirect("/sessions/logon");
    });
  });
};

module.exports = {
  registerShow,
  registerDo,
  logoff,
  logonShow
};