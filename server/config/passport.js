// Import required modules
const JwtStrategy = require('passport-jwt').Strategy; // Importing JwtStrategy from 'passport-jwt' library
const ExtractJwt = require('passport-jwt').ExtractJwt; // Importing ExtractJwt from 'passport-jwt' library
const mongoose = require('mongoose'); // Importing mongoose for MongoDB interactions
const User = mongoose.model('User'); // Importing User model from mongoose
require('dotenv').config(); // Importing and configuring dotenv to load environment variables

// Options object for configuring JWT strategy
const opts = {};

// Extracting JWT token from Authorization header with Bearer scheme
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

// Setting the secret key used to sign JWT tokens
opts.secretOrKey = process.env.JWT_SECRET;

// Exporting a function to configure Passport with JWT strategy
module.exports = (passport) => {
  // Configuring Passport to use JWT strategy
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    // Finding user by ID extracted from JWT payload
    User.findById(jwt_payload.id)
      .then(user => {
        // If user found, pass the user to the next middleware
        if (user) {
          return done(null, user);
        }
        // If user not found, pass false to indicate authentication failure
        return done(null, false);
      })
      // Catching any errors that occur during user lookup
      .catch(err => console.error(err));
  }));
};
