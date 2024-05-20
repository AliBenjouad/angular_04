const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

exports.registerUser = async (req, res) => {
  logger.info('RegisterUser endpoint called with data:', req.body);
  try {
    // Validate input fields
    if (!req.body.username || !req.body.email || !req.body.password) {
      logger.warn('Registration failed: Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if email already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      logger.warn('Registration failed: Email already exists');
      return res.status(400).json({ email: 'Email already exists' });
    }

    // Check if username already exists
    user = await User.findOne({ username: req.body.username });
    if (user) {
      logger.warn('Registration failed: Username already exists');
      return res.status(400).json({ username: 'Username already exists' });
    }

    // Create new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    user = await newUser.save();
    logger.info('User registered successfully:', user.email);
    res.json(user);
  } catch (err) {
    logger.error('Error registering user:', err.message, err.stack);
    res.status(500).send('Server Error');
  }
};

exports.loginUser = async (req, res) => {
  logger.info('LoginUser endpoint called for:', req.body.username);
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      logger.warn('Login failed: User not found');
      return res.status(404).json({ username: 'Username not found' });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      logger.warn('Login failed: Incorrect password');
      return res.status(400).json({ password: 'Password incorrect' });
    }

    const payload = {
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'root',
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        logger.info('User logged in successfully:', user.email);
        res.json({ token });
      }
    );
  } catch (err) {
    logger.error('Error in user login:', err.message, err.stack);
    res.status(500).send('Server Error');
  }
};
