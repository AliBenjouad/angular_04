const mongoose = require('mongoose');
const logger = require('../utils/logger');

// Create Question Schema
const QuestionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  body: {
    type: String,
    required: [true, 'Body is required']
  },
  status: {
    type: String,
    enum: ['answered', 'unanswered'],
    default: 'unanswered'
  },
  rating: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Logging before saving the question
QuestionSchema.pre('save', function(next) {
  logger.info(`Attempting to save question: ${this.title}`);
  next();
});

// Logging after saving the question
QuestionSchema.post('save', function(doc) {
  logger.info(`New question posted: ${doc.title}`);
});

// Logging before updating the question
QuestionSchema.pre('updateOne', function(next) {
  logger.info(`Attempting to update question: ${this.getUpdate().$set.title}`);
  next();
});

// Logging after updating the question
QuestionSchema.post('updateOne', function(result) {
  logger.info('Question updated: ', result);
});

// Logging before removing the question
QuestionSchema.pre('remove', function(next) {
  logger.info(`Attempting to remove question: ${this.title}`);
  next();
});

// Logging after removing the question
QuestionSchema.post('remove', function(doc) {
  logger.info(`Question removed: ${doc.title}`);
});

// Create and export the Question model
module.exports = mongoose.model('Question', QuestionSchema);
