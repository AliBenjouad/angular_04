const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('./config/database'); // Import database configuration

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON requests
app.use(passport.initialize()); // Initialize passport
require('./config/passport')(passport); // Passport configuration

// Connect to database
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('Connected to database ' + config.database))
  .catch(err => logger.error('Database connection error:', err));

// Define routes
const users = require('./routes/users');
const questions = require('./routes/questions');
const answers = require('./routes/answers');
const comments = require('./routes/comments');

app.use('/api/users', users);
app.use('/api/questions', questions);
app.use('/api/answers', answers);
app.use('/api/comments', comments);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send({ success: false, message: 'Something broke!', error: err.message });
});

// Start server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  logger.info('Server started on port ' + port);
});
