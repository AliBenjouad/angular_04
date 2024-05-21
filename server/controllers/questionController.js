const Question = require('../models/Question');
const logger = require('../utils/logger');
const { validationResult } = require('express-validator');

exports.createQuestion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  logger.info('Creating new question');
  try {
    const newQuestion = new Question({
      title: req.body.title,
      body: req.body.body,
      user: req.user.id
    });

    const question = await newQuestion.save();
    logger.info('Question created successfully');
    res.json(question);
  } catch (err) {
    logger.error('Error creating question:', err);
    res.status(500).send('Server Error');
  }
};

exports.getQuestions = async (req, res) => {
  logger.info('Retrieving all questions');
  try {
    const questions = await Question.find().sort({ createdAt: -1 }).populate('user', 'name email');
    logger.info('Questions retrieved successfully');
    res.json(questions);
  } catch (err) {
    logger.error('Error retrieving questions:', err);
    res.status(500).send('Server Error');
  }
};

// Function to retrieve recent questions
exports.getRecentQuestions = async (req, res) => {
  logger.info('Retrieving recent questions');
  try {
    const recentQuestions = await Question.find().sort({ createdAt: -1 }).limit(10).populate('user', 'name email');
    logger.info('Recent questions retrieved successfully:', recentQuestions);
    res.json(recentQuestions);
  } catch (err) {
    logger.error('Error retrieving recent questions: ' + err.message);
    res.status(500).send('Server Error');
  }
};

// Function to retrieve a single question by ID
exports.getQuestionById = async (req, res) => {
  logger.info(`Retrieving question with ID: ${req.params.id}`);
  try {
    const question = await Question.findById(req.params.id).populate('user', 'name email');
    if (!question) {
      logger.warn(`No question found with ID: ${req.params.id}`);
      return res.status(404).json({ noquestion: 'No question found with that ID' });
    }
    logger.info(`Question retrieved with ID: ${req.params.id}`);
    res.json(question);
  } catch (err) {
    logger.error('Error retrieving question: ' + err.message);
    res.status(500).send('Server Error');
  }
};

// Function to search questions by title
exports.searchQuestions = async (req, res) => {
  logger.info(`Searching questions with title: ${req.params.title}`);
  try {
    const titleRegex = new RegExp(req.params.title, 'i'); // Case insensitive regex
    const questions = await Question.find({ title: titleRegex }).populate('user', 'name email');
    if (questions.length === 0) {
      logger.warn(`No questions found with title matching: ${req.params.title}`);
      return res.status(404).json({ noquestions: 'No questions found with that title' });
    }
    logger.info(`Questions found matching title: ${req.params.title}`);
    res.json(questions);
  } catch (err) {
    logger.error('Error searching questions: ' + err.message);
    res.status(500).send('Server Error');
  }
};

// Function to filter questions by status
exports.filterQuestionsByStatus = async (req, res) => {
  logger.info(`Filtering questions by status: ${req.params.status}`);
  try {
    const questions = await Question.find({ status: req.params.status }).populate('user', 'name email');
    if (questions.length === 0) {
      logger.warn(`No ${req.params.status} questions found`);
      return res.status(404).json({ noquestions: `No ${req.params.status} questions found` });
    }
    logger.info(`Retrieved ${questions.length} ${req.params.status} questions`);
    res.json(questions);
  } catch (err) {
    logger.error('Error filtering questions: ' + err.message);
    res.status(500).send('Server Error');
  }
};
