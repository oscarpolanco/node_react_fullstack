const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientIID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (profile) => {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
        } else {
          new User({
            googleId: profile.id,
          }).save();
        }
      });
    }
  )
);
