const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const passport = require('passport');

// Add a comment to an answer
router.post('/:answerId', passport.authenticate('jwt', { session: false }), commentController.addComment);

// Get comments for an answer
router.get('/:answerId', commentController.getComments);

// Update a comment
router.put('/:id', passport.authenticate('jwt', { session: false }), commentController.updateComment);

// Delete a comment
router.delete('/:id', passport.authenticate('jwt', { session: false }), commentController.deleteComment);

module.exports = router;
