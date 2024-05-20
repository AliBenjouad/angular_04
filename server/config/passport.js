const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User'); // Import the User model
const config = require('./database'); // Import the database configuration

module.exports = function(passport) {
  // Options for the JWT strategy
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.secret;

  // Define the JWT strategy
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    // Find the user specified in the token
    User.findById(jwt_payload._id, (err, user) => {
      if (err) {
        // If there is an error, pass it to the done function
        return done(err, false);
      }
      if (user) {
        // If the user is found, pass the user object to the done function
        return done(null, user);
      } else {
        // If the user is not found, pass false to the done function
        return done(null, false);
      }
    });
  }));
};
