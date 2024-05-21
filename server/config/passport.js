const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const config = require('./database');
const logger = require('../utils/logger'); // Ensure logger is correctly imported

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.secret;

  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    // Make sure jwt_payload.user.id matches how you construct your JWT token
    logger.info("JWT Payload:", jwt_payload);  // Log the payload to check structure
    User.findById(jwt_payload.user.id, (err, user) => {
      if (err) {
        logger.error('Error during user lookup:', err);
        return done(err, false);
      }
      if (user) {
        logger.info('User found during authentication', { id: user._id });
        return done(null, user);
      } else {
        logger.warn('No user found with given ID', { id: jwt_payload.user.id });
        return done(null, false);
      }
    });
  }));
};
