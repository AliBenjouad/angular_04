const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

// User registration route
router.post('/register', userController.registerUser);

// User login route
router.post('/login', userController.loginUser);

// Example protected route to get user profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
