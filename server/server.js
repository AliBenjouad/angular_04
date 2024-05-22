require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const logger = require('./utils/logger');
const connectDB = require('./config/database');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);

connectDB().then(r => logger.info('MongoDB connected successfully.'));

const users = require('./routes/users');
const questions = require('./routes/questions');
const answers = require('./routes/answers');
const comments = require('./routes/comments');

app.use('/api/users', users);
app.use('/api/questions', questions);
app.use('/api/answers', answers);
app.use('/api/comments', comments);

// Improved error handling with detailed logging
app.use((err, req, res, next) => {
  logger.error('Internal server error:', { error: err, body: req.body, path: req.path });
  res.status(500).send({ success: false, message: 'Internal server error', error: err.message });
});

app.use((req, res, next) => {
  res.status(404).send({ success: false, message: 'Not Found' });
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  logger.info('Server started on port ' + port);
});
