// passport-config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Adjust the path accordingly

// Local Strategy for username and password authentication
passport.use(new LocalStrategy({
  usernameField: 'email', // Adjust if using a different field for username
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return done(null, false, { message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Invalid email or password' });
    }
  } catch (error) {
    return done(error);
  }
}));

// JWT Strategy for token authentication
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'sb0272245137', // Change this to a strong secret
};

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error);
  }
}));

module.exports = passport;
