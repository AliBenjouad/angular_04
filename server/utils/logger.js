// File: /angular/server/utils/logger.js

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize, errors } = format;
const path = require('path');

// Define the log format which dictates how logs will appear.
const logFormat = printf(({ level, message, timestamp, stack }) => {
  // Stack is included if available, to provide error trace.
  return `${timestamp} ${level}: ${stack || message}`;
});

// Create a logger instance with configurations.
const logger = createLogger({
  format: combine(
    colorize(), // Add color to the output, useful for console readability.
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Include timestamps in logs.
    errors({ stack: true }), // Automatically capture stack traces.
    logFormat // Use custom log formatting.
  ),
  transports: [
    // Define transports which are methods for logging (console, file, etc.).
    new transports.Console(), // Log to console.
    new transports.File({ filename: path.join(__dirname, '../logs/error.log'), level: 'error' }), // Log errors to a file.
    new transports.File({ filename: path.join(__dirname, '../logs/combined.log') }) // Log all levels to a combined log file.
  ],
  exceptionHandlers: [
    // Handle uncaught exceptions with a specific transport.
    new transports.File({ filename: path.join(__dirname, '../logs/exceptions.log') })
  ]
});

module.exports = logger; // Export the logger for use in other files.
