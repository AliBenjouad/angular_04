const Comment = require('../models/Comment');
const Answer = require('../models/Answer');
const logger = require('../utils/logger');

// Function to add a comment to an answer
exports.addComment = async (req, res) => {
  logger.info('Adding comment to answer ID ' + req.params.answerId);
  try {
    const answer = await Answer.findById(req.params.answerId);
    if (!answer) {
      logger.warn('Answer not found with ID: ' + req.params.answerId);
      return res.status(404).json({ message: 'Answer not found' });
    }

    const newComment = new Comment({
      text: req.body.text,
      answer: req.params.answerId,
      user: req.user.id
    });

    const comment = await newComment.save();
    logger.info(`Comment added successfully to answer ID ${req.params.answerId}`);
    res.json(comment);
  } catch (err) {
    logger.error('Error adding comment: ' + err.message);
    res.status(500).send('Server Error');
  }
};

// Function to get all comments for an answer
exports.getComments = async (req, res) => {
  logger.info('Retrieving comments for answer ID ' + req.params.answerId);
  try {
    const comments = await Comment.find({ answer: req.params.answerId }).populate('user', 'name email');
    if (!comments) {
      logger.warn(`No comments found for answer ID: ${req.params.answerId}`);
      return res.status(404).json({ nocomments: 'No comments found for this answer' });
    }
    logger.info(`Retrieved ${comments.length} comments for answer ID: ${req.params.answerId}`);
    res.json(comments);
  } catch (err) {
    logger.error('Error retrieving comments: ' + err.message);
    res.status(500).send('Server Error');
  }
};

// Function to update a comment
exports.updateComment = async (req, res) => {
  logger.info('Updating comment ID ' + req.params.id);
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      logger.warn('Comment not found with ID: ' + req.params.id);
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if the user updating the comment is the same who created it
    if (comment.user.toString() !== req.user.id) {
      logger.warn(`User ${req.user.id} unauthorized to update comment ID: ${req.params.id}`);
      return res.status(401).json({ notauthorized: 'User not authorized' });
    }

    comment.text = req.body.text || comment.text;

    const updatedComment = await comment.save();
    logger.info(`Comment ID: ${req.params.id} updated by user ID: ${req.user.id}`);
    res.json(updatedComment);
  } catch (err) {
    logger.error('Error updating comment: ' + err.message);
    res.status(500).send('Server Error');
  }
};

// Function to delete a comment
exports.deleteComment = async (req, res) => {
  logger.info('Deleting comment ID ' + req.params.id);
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      logger.warn('Comment not found with ID: ' + req.params.id);
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if the user deleting the comment is the same who created it
    if (comment.user.toString() !== req.user.id) {
      logger.warn(`User ${req.user.id} unauthorized to delete comment ID: ${req.params.id}`);
      return res.status(401).json({ notauthorized: 'User not authorized' });
    }

    await comment.remove();
    logger.info(`Comment ID: ${req.params.id} deleted by user ID: ${req.user.id}`);
    res.json({ success: true });
  } catch (err) {
    logger.error('Error deleting comment: ' + err.message);
    res.status(500).send('Server Error');
  }
};
