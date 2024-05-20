const mongoose = require('mongoose');
const logger = require('../utils/logger');

// Create Answer Schema
const AnswerSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
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
  },
  upvotes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  rating: {
    type: Number,
    default: 0
  },
  approvalStatus: {
    type: Boolean,
    default: false
  }
});

// Logging before saving the answer
AnswerSchema.pre('save', function(next) {
  logger.info(`Attempting to save answer for question ID: ${this.question}`);
  next();
});

// Logging after saving the answer
AnswerSchema.post('save', function(doc) {
  logger.info(`New answer added to question ID: ${doc.question}`);
});

// Logging before updating the answer
AnswerSchema.pre('updateOne', function(next) {
  logger.info(`Attempting to update answer for question ID: ${this.getUpdate().$set.question}`);
  next();
});

// Logging after updating the answer
AnswerSchema.post('updateOne', function(result) {
  logger.info('Answer updated: ', result);
});

// Logging before removing the answer
AnswerSchema.pre('remove', function(next) {
  logger.info(`Attempting to remove answer for question ID: ${this.question}`);
  next();
});

// Logging after removing the answer
AnswerSchema.post('remove', function(doc) {
  logger.info(`Answer removed from question ID: ${doc.question}`);
});

// Create and export the Answer model
module.exports = mongoose.model('Answer', AnswerSchema);
