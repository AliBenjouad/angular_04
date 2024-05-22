const mongoose = require('mongoose');
const logger = require('../utils/logger'); // Import custom logger for logging database operations.
require('dotenv').config(); // Load environment variables from .env file

// Importing the models
require('../models/User'); // Ensure the models are loaded and registered with Mongoose
require('../models/Question');
require('../models/Answer');
require('../models/Comment');

// Async function to establish a connection to MongoDB.
const connectDB = async () => {
  try {
    // Use the MongoDB connection string from environment variables
    const dbURI = process.env.MONGODB_URI;

    // Attempt to connect to the MongoDB database without deprecated options.
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Log a success message if the connection is successful.
    logger.info('MongoDB connected successfully.');
  } catch (err) {
    // Log an error if the connection fails.
    logger.error('MongoDB connection error: ' + err.message);
    process.exit(1); // Exit the process with failure in case of connection error.
  }
};

module.exports = connectDB; // Export the function to be used in the server.js file.
