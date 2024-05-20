const Answer = require('../models/Answer');
const Question = require('../models/Question');
const logger = require('../utils/logger');

// Function to add an answer to a question
exports.addAnswer = async (req, res) => {
  logger.info('Adding answer to question ID ' + req.params.questionId);
  try {
    const question = await Question.findById(req.params.questionId);
    if (!question) {
      logger.warn('Question not found with ID: ' + req.params.questionId);
      return res.status(404).json({ message: 'Question not found' });
    }

    const newAnswer = new Answer({
      text: req.body.text,
      question: req.params.questionId,
      user: req.user.id
    });

    const answer = await newAnswer.save();
    logger.info(`Answer added successfully to question ID ${req.params.questionId}`);
    res.json(answer);
  } catch (err) {
    logger.error('Error adding answer: ' + err.message);
    res.status(500).send('Server Error');
  }
};

// Function to get comments (assuming this is actually to get answers for a question)
exports.getAnswers = async (req, res) => {
  logger.info('Retrieving answers for question ID ' + req.params.questionId);
  try {
    const answers = await Answer.find({ question: req.params.questionId }).populate('user', 'name email');
    if (!answers) {
      logger.warn(`No answers found for question ID: ${req.params.questionId}`);
      return res.status(404).json({ noanswers: 'No answers found for this question' });
    }
    logger.info(`Retrieved ${answers.length} answers for question ID: ${req.params.questionId}`);
    res.json(answers);
  } catch (err) {
    logger.error('Error retrieving answers: ' + err.message);
    res.status(500).send('Server Error');
  }
};

// Function to filter answers by status (approved/unapproved)
exports.filterAnswersByStatus = async (req, res) => {
  const approvalStatus = req.params.status === 'approved';
  logger.info(`Filtering answers by status: ${approvalStatus}`);
  try {
    const answers = await Answer.find({ approvalStatus }).populate('user', 'name email');
    if (!answers) {
      logger.warn(`No ${req.params.status} answers found`);
      return res.status(404).json({ noanswers: `No ${req.params.status} answers found` });
    }
    logger.info(`Retrieved ${answers.length} ${req.params.status} answers`);
    res.json(answers);
  } catch (err) {
    logger.error('Error filtering answers: ' + err.message);
    res.status(500).send('Server Error');
  }
};

// Function to update an answer
exports.updateAnswer = async (req, res) => {
  logger.info('Updating answer ID ' + req.params.id);
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      logger.warn('Answer not found with ID: ' + req.params.id);
      return res.status(404).json({ message: 'Answer not found' });
    }

    // Check if the user updating the answer is the same who created it
    if (answer.user.toString() !== req.user.id) {
      logger.warn(`User ${req.user.id} unauthorized to update answer ID: ${req.params.id}`);
      return res.status(401).json({ notauthorized: 'User not authorized' });
    }

    answer.text = req.body.text || answer.text;
    answer.rating = req.body.rating !== undefined ? req.body.rating : answer.rating;
    answer.approvalStatus = req.body.approvalStatus !== undefined ? req.body.approvalStatus : answer.approvalStatus;

    const updatedAnswer = await answer.save();
    logger.info(`Answer ID: ${req.params.id} updated by user ID: ${req.user.id}`);
    res.json(updatedAnswer);
  } catch (err) {
    logger.error('Error updating answer: ' + err.message);
    res.status(500).send('Server Error');
  }
};

// Function to delete an answer
exports.deleteAnswer = async (req, res) => {
  logger.info('Deleting answer ID ' + req.params.id);
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      logger.warn('Answer not found with ID: ' + req.params.id);
      return res.status(404).json({ message: 'Answer not found' });
    }

    // Check if the user deleting the answer is the same who created it
    if (answer.user.toString() !== req.user.id) {
      logger.warn(`User ${req.user.id} unauthorized to delete answer ID: ${req.params.id}`);
      return res.status(401).json({ notauthorized: 'User not authorized' });
    }

    await answer.remove();
    logger.info(`Answer ID: ${req.params.id} deleted by user ID: ${req.user.id}`);
    res.json({ success: true });
  } catch (err) {
    logger.error('Error deleting answer: ' + err.message);
    res.status(500).send('Server Error');
  }
};
