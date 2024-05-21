const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const questionController = require('../controllers/questionController');
const passport = require('passport');

router.post('/', 
  passport.authenticate('jwt', { session: false }),
  [check('title', 'Title is required').not().isEmpty(), check('body', 'Body is required').not().isEmpty()],
  questionController.createQuestion
);

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
