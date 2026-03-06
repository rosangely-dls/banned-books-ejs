const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

module.exports = function () {

  passport.use(new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {

      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, { message: "Invalid email or password" });
      }

      const validPassword = await user.comparePassword(password);

      if (!validPassword) {
        return done(null, false, { message: "Invalid email or password" });
      }

      return done(null, user);

    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });

};