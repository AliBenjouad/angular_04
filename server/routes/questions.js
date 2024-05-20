const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const passport = require('passport');

// Create a new question
router.post('/', passport.authenticate('jwt', { session: false }), questionController.createQuestion);

// Get all questions
router.get('/', questionController.getQuestions);

// Get recent questions
router.get('/recent', questionController.getRecentQuestions);

// Get a question by ID
router.get('/:id', questionController.getQuestionById);

// Search questions by title
router.get('/search/:title', questionController.searchQuestions);

// Filter questions by status
router.get('/status/:status', questionController.filterQuestionsByStatus);

module.exports = router;
