const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');
const passport = require('passport');

// Add an answer to a question
router.post('/:questionId', passport.authenticate('jwt', { session: false }), answerController.addAnswer);

// Get answers for a question
router.get('/:questionId', answerController.getAnswers);

// Filter answers by status
router.get('/status/:status', answerController.filterAnswersByStatus);

// Update an answer
router.put('/:id', passport.authenticate('jwt', { session: false }), answerController.updateAnswer);

// Delete an answer
router.delete('/:id', passport.authenticate('jwt', { session: false }), answerController.deleteAnswer);

module.exports = router;
