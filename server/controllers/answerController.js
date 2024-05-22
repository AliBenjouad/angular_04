// Importing required modules and utilities
const Answer = require('../models/Answer'); // Importing Answer model
const Question = require('../models/Question'); // Importing Question model
const logger = require('../utils/logger'); // Importing logger utility

// Function to add an answer to a question
exports.addAnswer = async (req, res) => {
  // Logging information about adding an answer to a question
  logger.info('Adding answer to question ID ' + req.params.questionId);
  try {
    // Finding the question by its ID
    const question = await Question.findById(req.params.questionId);
    if (!question) {
      // Handling the case where the question is not found
      logger.warn('Question not found with ID: ' + req.params.questionId);
      return res.status(404).json({ message: 'Question not found' });
    }

    // Creating a new answer object
    const newAnswer = new Answer({
      text: req.body.text,
      question: req.params.questionId,
      user: req.user.id
    });

    // Saving the new answer
    const answer = await newAnswer.save();
    // Logging success message after adding the answer
    logger.info(`Answer added successfully to question ID ${req.params.questionId}`);
    // Sending the added answer as response
    res.json(answer);
  } catch (err) {
    // Handling errors that occur during answer addition
    logger.error('Error adding answer: ' + err.message);
    res.status(500).send('Server Error');
  }
};

// Function to get answers for a question
exports.getAnswers = async (req, res) => {
  // Logging information about retrieving answers for a question
  logger.info('Retrieving answers for question ID ' + req.params.questionId);
  try {
    // Finding answers for the specified question and populating user details
    const answers = await Answer.find({ question: req.params.questionId }).populate('user', 'name email');
    if (!answers) {
      // Handling the case where no answers are found for the question
      logger.warn(`No answers found for question ID: ${req.params.questionId}`);
      return res.status(404).json({ noanswers: 'No answers found for this question' });
    }
    // Logging the number of retrieved answers
    logger.info(`Retrieved ${answers.length} answers for question ID: ${req.params.questionId}`);
    // Sending retrieved answers as response
    res.json(answers);
  } catch (err) {
    // Handling errors that occur during answer retrieval
    logger.error('Error retrieving answers: ' + err.message);
    res.status(500).send('Server Error');
  }
};

// Function to filter answers by approval status
exports.filterAnswersByStatus = async (req, res) => {
  // Determining the approval status based on request parameters
  const approvalStatus = req.params.status === 'approved';
  // Logging information about filtering answers by status
  logger.info(`Filtering answers by status: ${approvalStatus}`);
  try {
    // Finding answers based on the specified approval status and populating user details
    const answers = await Answer.find({ approvalStatus }).populate('user', 'name email');
    if (!answers) {
      // Handling the case where no answers are found for the specified status
      logger.warn(`No ${req.params.status} answers found`);
      return res.status(404).json({ noanswers: `No ${req.params.status} answers found` });
    }
    // Logging the number of retrieved answers
    logger.info(`Retrieved ${answers.length} ${req.params.status} answers`);
    // Sending retrieved answers as response
    res.json(answers);
  } catch (err) {
    // Handling errors that occur during answer filtering
    logger.error('Error filtering answers: ' + err.message);
    res.status(500).send('Server Error');
  }
};

// Function to update an answer
exports.updateAnswer = async (req, res) => {
  // Logging information about updating an answer
  logger.info('Updating answer ID ' + req.params.id);
  try {
    // Finding the answer by its ID
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      // Handling the case where the answer is not found
      logger.warn('Answer not found with ID: ' + req.params.id);
      return res.status(404).json({ message: 'Answer not found' });
    }

    // Checking if the user updating the answer is the same who created it
    if (answer.user.toString() !== req.user.id) {
      // Handling unauthorized access to update the answer
      logger.warn(`User ${req.user.id} unauthorized to update answer ID: ${req.params.id}`);
      return res.status(401).json({ notauthorized: 'User not authorized' });
    }

    // Updating answer properties with request body data
    answer.text = req.body.text || answer.text;
    answer.rating = req.body.rating !== undefined ? req.body.rating : answer.rating;
    answer.approvalStatus = req.body.approvalStatus !== undefined ? req.body.approvalStatus : answer.approvalStatus;

    // Saving the updated answer
    const updatedAnswer = await answer.save();
    // Logging success message after updating the answer
    logger.info(`Answer ID: ${req.params.id} updated by user ID: ${req.user.id}`);
    // Sending the updated answer as response
    res.json(updatedAnswer);
  } catch (err) {
    // Handling errors that occur during answer update
    logger.error('Error updating answer: ' + err.message);
    res.status(500).send('Server Error');
  }
};

// Function to delete an answer
exports.deleteAnswer = async (req, res) => {
  // Logging information about deleting an answer
  logger.info('Deleting answer ID ' + req.params.id);
  try {
    // Finding the answer by its ID
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      // Handling the case where the answer is not found
      logger.warn('Answer not found with ID: ' + req.params.id);
      return res.status(404).json({ message: 'Answer not found' });
    }

    // Checking if the user deleting the answer is the same who created it
    if (answer.user.toString() !== req.user.id) {
      // Handling unauthorized access to delete the answer
      logger.warn(`User ${req.user.id} unauthorized to delete answer ID: ${req.params.id}`);
      return res.status(401).json({ notauthorized: 'User not authorized' });
    }

    // Removing the answer from the database
    await answer.remove();
    // Logging success message after deleting the answer
    logger.info(`Answer ID: ${req.params.id} deleted by user ID: ${req.user.id}`);
    // Sending success response after deleting the answer
    res.json({ success: true });
  } catch (err) {
    // Handling errors that occur during answer deletion
    logger.error('Error deleting answer: ' + err.message);
    res.status(500).send('Server Error');
  }
};
