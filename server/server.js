// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const express = require('express'); // Express framework
const bodyParser = require('body-parser'); // Middleware for parsing JSON bodies
const cors = require('cors'); // Middleware for enabling CORS
const passport = require('passport'); // Authentication middleware
const logger = require('./utils/logger'); // Logger utility
const connectDB = require('./config/database'); // Function to connect to the database

// Initialize Express application
const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

// Initialize Passport middleware for authentication
app.use(passport.initialize());
require('./config/passport')(passport); // Load Passport configuration

// Connect to MongoDB database
connectDB().then(r => logger.info('MongoDB connected successfully.'));

// Import routes
const users = require('./routes/users');
const questions = require('./routes/questions');
const answers = require('./routes/answers');
const comments = require('./routes/comments');

// Use routes for different API endpoints
app.use('/api/users', users);
app.use('/api/questions', questions);
app.use('/api/answers', answers);
app.use('/api/comments', comments);

// Middleware for handling internal server errors
app.use((err, req, res, next) => {
  logger.error('Internal server error:', { error: err, body: req.body, path: req.path });
  res.status(500).send({ success: false, message: 'Internal server error', error: err.message });
});

// Middleware for handling 404 errors
app.use((req, res, next) => {
  res.status(404).send({ success: false, message: 'Not Found' });
});

// Set the port for the server to listen on
const port = process.env.PORT || 5001;

// Start the server
app.listen(port, () => {
  logger.info('Server started on port ' + port);
});
