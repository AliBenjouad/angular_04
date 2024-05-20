const mongoose = require('mongoose');
const logger = require('../utils/logger');

// Create Comment Schema
const CommentSchema = new mongoose.Schema({
  answer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: [true, 'Text is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Logging before saving the comment
CommentSchema.pre('save', function(next) {
  logger.info(`Attempting to save comment for answer ID: ${this.answer}`);
  next();
});

// Logging after saving the comment
CommentSchema.post('save', function(doc) {
  logger.info(`New comment added to answer ID: ${doc.answer}`);
});

// Logging before updating the comment
CommentSchema.pre('updateOne', function(next) {
  logger.info(`Attempting to update comment for answer ID: ${this.getUpdate().$set.answer}`);
  next();
});

// Logging after updating the comment
CommentSchema.post('updateOne', function(result) {
  logger.info('Comment updated: ', result);
});

// Logging before removing the comment
CommentSchema.pre('remove', function(next) {
  logger.info(`Attempting to remove comment for answer ID: ${this.answer}`);
  next();
});

// Logging after removing the comment
CommentSchema.post('remove', function(doc) {
  logger.info(`Comment removed from answer ID: ${doc.answer}`);
});

// Create and export the Comment model
module.exports = mongoose.model('Comment', CommentSchema);
