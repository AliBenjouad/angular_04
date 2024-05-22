// Importing required modules and utilities
const bcrypt = require('bcryptjs'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For creating JSON Web Tokens
const User = require('../models/User'); // Importing User model
const logger = require('../utils/logger'); // Importing logger utility

// Function to register a new user
exports.registerUser = async (req, res) => {
  logger.info('RegisterUser endpoint called with data:', req.body); // Logging the request data
  try {
    // Validate input fields
    if (!req.body.username || !req.body.email || !req.body.password || !req.body.role) {
      logger.warn('Registration failed: Missing required fields'); // Logging a warning if any field is missing
      return res.status(400).json({ error: 'Missing required fields' }); // Returning an error response
    }

    // Check if email already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      logger.warn('Registration failed: Email already exists'); // Logging a warning if email is already registered
      return res.status(400).json({ email: 'Email already exists' }); // Returning an error response
    }

    // Check if username already exists
    user = await User.findOne({ username: req.body.username });
    if (user) {
      logger.warn('Registration failed: Username already exists'); // Logging a warning if username is already taken
      return res.status(400).json({ username: 'Username already exists' }); // Returning an error response
    }

    // Create new user object
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      role: req.body.role
    });

    // Hash password before saving
    const salt = await bcrypt.genSalt(10); // Generating a salt for hashing
    newUser.password = await bcrypt.hash(newUser.password, salt); // Hashing the password

    // Saving the new user to the database
    user = await newUser.save();
    logger.info('User registered successfully:', user.email); // Logging success message
    res.json(user); // Returning the registered user as response
  } catch (err) {
    logger.error('Error registering user:', err.message, err.stack); // Logging error message
    res.status(500).send('Server Error'); // Returning a server error response
  }
};

// Function to log in a user
exports.loginUser = async (req, res) => {
  logger.info('LoginUser endpoint called for:', req.body.username); // Logging the username
  try {
    // Finding the user by username
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      logger.warn('Login failed: User not found'); // Logging a warning if user is not found
      return res.status(404).json({ username: 'Username not found' }); // Returning an error response
    }

    // Comparing the provided password with the hashed password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      logger.warn('Login failed: Incorrect password'); // Logging a warning if password is incorrect
      return res.status(400).json({ password: 'Password incorrect' }); // Returning an error response
    }

    // Creating a payload for the JWT
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        role: user.role // Including the user role in the payload
      }
    };

    // Signing the JWT
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'root', // Using secret from environment variables or a default value
      { expiresIn: 3600 }, // Setting token expiration time
      (err, token) => {
        if (err) throw err;
        logger.info('User logged in successfully:', user.email); // Logging success message
        res.json({ token }); // Returning the token as response
      }
    );
  } catch (err) {
    logger.error('Error in user login:', err.message, err.stack); // Logging error message
    res.status(500).send('Server Error'); // Returning a server error response
  }
};
