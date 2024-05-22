// Importing required modules and utilities
const Question = require('../models/Question'); // Importing Question model
const logger = require('../utils/logger'); // Importing logger utility
const { validationResult } = require('express-validator'); // Importing validationResult from express-validator

// Function to create a new question
exports.createQuestion = async (req, res) => {
  // Validating the request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Logging validation errors
    logger.warn('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  // Logging information about creating a new question
  logger.info('Creating new question');
  try {
    // Creating a new question object
    const newQuestion = new Question({
      title: req.body.title,
      body: req.body.body,
      user: req.user.id
    });

    // Saving the new question to the database
    const question = await newQuestion.save();
    // Logging success message after creating the question
    logger.info('Question created successfully');
    // Sending the created question as response
    res.json(question);
  } catch (err) {
    // Handling errors that occur during question creation
    logger.error('Error creating question:', err);
    res.status(500).send('Server Error');
  }
};

// Function to get all questions
exports.getQuestions = async (req, res) => {
  // Logging information about retrieving all questions
  logger.info('Retrieving all questions');
  try {
    // Finding all questions, sorting by creation date, and populating user details
    const questions = await Question.find().sort({ createdAt: -1 }).populate('user', 'name email');
    // Logging success message after retrieving questions
    logger.info('Questions retrieved successfully');
    // Sending retrieved questions as response
    res.json(questions);
  } catch (err) {
    // Handling errors that occur during question retrieval
    logger.error('Error retrieving questions:', err);
    res.status(500).send('Server Error');
  }
};

// Function to retrieve recent questions
exports.getRecentQuestions = async (req, res) => {
  // Logging information about retrieving recent questions
  logger.info('Retrieving recent questions');
  try {
    // Finding recent questions, sorting by creation date, limiting to 10, and populating user details
    const recentQuestions = await Question.find().sort({ createdAt: -1 }).limit(10).populate('user', 'name email');
    // Logging success message after retrieving recent questions
    logger.info('Recent questions retrieved successfully:', recentQuestions);
    // Sending retrieved recent questions as response
    res.json(recentQuestions);
  } catch (err) {
    // Handling errors that occur during recent question retrieval
    logger.error('Error retrieving recent questions: ' + err.message);
    res.status(500).send('Server Error');
  }
};

// Function to retrieve a single question by ID
exports.getQuestionById = async (req, res) => {
  // Logging information about retrieving a question by ID
  logger.info(`Retrieving question with ID: ${req.params.id}`);
  try {
    // Finding the question by its ID and populating user details
    const question = await Question.findById(req.params.id).populate('user', 'name email');
    if (!question) {
      // Handling the case where the question is not found
      logger.warn(`No question found with ID: ${req.params.id}`);
      return res.status(404).json({ noquestion: 'No question found with that ID' });
    }
    // Logging success message after retrieving the question
    logger.info(`Question retrieved with ID: ${req.params.id}`);
    // Sending the retrieved question as response
    res.json(question);
  } catch (err) {
    // Handling errors that occur during question retrieval by ID
    logger.error('Error retrieving question: ' + err.message);
    res.status(500).send('Server Error');
  }
};

// Function to search questions by title
exports.searchQuestions = async (req, res) => {
  // Logging information about searching questions by title
  logger.info(`Searching questions with title: ${req.params.title}`);
  try {
    // Creating a case insensitive regex for title search
    const titleRegex = new RegExp(req.params.title, 'i');
    // Finding questions that match the title and populating user details
    const questions = await Question.find({ title: titleRegex }).populate('user', 'name email');
    if (questions.length === 0) {
      // Handling the case where no questions are found matching the title
      logger.warn(`No questions found with title matching: ${req.params.title}`);
      return res.status(404).json({ noquestions: 'No questions found with that title' });
    }
    // Logging success message after finding matching questions
    logger.info(`Questions found matching title: ${req.params.title}`);
    // Sending the matching questions as response
    res.json(questions);
  } catch (err) {
    // Handling errors that occur during question search
    logger.error('Error searching questions: ' + err.message);
    res.status(500).send('Server Error');
  }
};

// Function to filter questions by status
exports.filterQuestionsByStatus = async (req, res) => {
  // Logging information about filtering questions by status
  logger.info(`Filtering questions by status: ${req.params.status}`);
  try {
    // Finding questions that match the specified status and populating user details
    const questions = await Question.find({ status: req.params.status }).populate('user', 'name email');
    if (questions.length === 0) {
      // Handling the case where no questions are found matching the status
      logger.warn(`No ${req.params.status} questions found`);
      return res.status(404).json({ noquestions: `No ${req.params.status} questions found` });
    }
    // Logging success message after filtering questions by status
    logger.info(`Retrieved ${questions.length} ${req.params.status} questions`);
    // Sending the filtered questions as response
    res.json(questions);
  } catch (err) {
    // Handling errors that occur during question filtering by status
    logger.error('Error filtering questions: ' + err.message);
    res.status(500).send('Server Error');
  }
};
