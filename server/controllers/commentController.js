// Importing required modules and utilities
const Comment = require('../models/Comment'); // Importing Comment model
const Answer = require('../models/Answer'); // Importing Answer model
const logger = require('../utils/logger'); // Importing logger utility

// Function to add a comment to an answer
exports.addComment = async (req, res) => {
  // Logging information about adding a comment to an answer
  logger.info('Adding comment to answer ID ' + req.params.answerId);
  try {
    // Finding the answer by its ID
    const answer = await Answer.findById(req.params.answerId);
    if (!answer) {
      // Handling the case where the answer is not found
      logger.warn('Answer not found with ID: ' + req.params.answerId);
      return res.status(404).json({ message: 'Answer not found' });
    }

    // Creating a new comment object
    const newComment = new Comment({
      text: req.body.text,
      answer: req.params.answerId,
      user: req.user.id
    });

    // Saving the new comment
    const comment = await newComment.save();
    // Logging success message after adding the comment
    logger.info(`Comment added successfully to answer ID ${req.params.answerId}`);
    // Sending the added comment as response
    res.json(comment);
  } catch (err) {
    // Handling errors that occur during comment addition
    logger.error('Error adding comment: ' + err.message);
    res.status(500).send('Server Error');
  }
};

// Function to get all comments for an answer
exports.getComments = async (req, res) => {
  // Logging information about retrieving comments for an answer
  logger.info('Retrieving comments for answer ID ' + req.params.answerId);
  try {
    // Finding comments for the specified answer and populating user details
    const comments = await Comment.find({ answer: req.params.answerId }).populate('user', 'name email');
    if (!comments) {
      // Handling the case where no comments are found for the answer
      logger.warn(`No comments found for answer ID: ${req.params.answerId}`);
      return res.status(404).json({ nocomments: 'No comments found for this answer' });
    }
    // Logging the number of retrieved comments
    logger.info(`Retrieved ${comments.length} comments for answer ID: ${req.params.answerId}`);
    // Sending retrieved comments as response
    res.json(comments);
  } catch (err) {
    // Handling errors that occur during comment retrieval
    logger.error('Error retrieving comments: ' + err.message);
    res.status(500).send('Server Error');
  }
};

// Function to update a comment
exports.updateComment = async (req, res) => {
  // Logging information about updating a comment
  logger.info('Updating comment ID ' + req.params.id);
  try {
    // Finding the comment by its ID
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      // Handling the case where the comment is not found
      logger.warn('Comment not found with ID: ' + req.params.id);
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Checking if the user updating the comment is the same who created it
    if (comment.user.toString() !== req.user.id) {
      // Handling unauthorized access to update the comment
      logger.warn(`User ${req.user.id} unauthorized to update comment ID: ${req.params.id}`);
      return res.status(401).json({ notauthorized: 'User not authorized' });
    }

    // Updating comment text with request body data
    comment.text = req.body.text || comment.text;

    // Saving the updated comment
    const updatedComment = await comment.save();
    // Logging success message after updating the comment
    logger.info(`Comment ID: ${req.params.id} updated by user ID: ${req.user.id}`);
    // Sending the updated comment as response
    res.json(updatedComment);
  } catch (err) {
    // Handling errors that occur during comment update
    logger.error('Error updating comment: ' + err.message);
    res.status(500).send('Server Error');
  }
};

// Function to delete a comment
exports.deleteComment = async (req, res) => {
  // Logging information about deleting a comment
  logger.info('Deleting comment ID ' + req.params.id);
  try {
    // Finding the comment by its ID
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      // Handling the case where the comment is not found
      logger.warn('Comment not found with ID: ' + req.params.id);
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Checking if the user deleting the comment is the same who created it
    if (comment.user.toString() !== req.user.id) {
      // Handling unauthorized access to delete the comment
      logger.warn(`User ${req.user.id} unauthorized to delete comment ID: ${req.params.id}`);
      return res.status(401).json({ notauthorized: 'User not authorized' });
    }

    // Removing the comment from the database
    await comment.remove();
    // Logging success message after deleting the comment
    logger.info(`Comment ID: ${req.params.id} deleted by user ID: ${req.user.id}`);
    // Sending success response after deleting the comment
    res.json({ success: true });
  } catch (err) {
    // Handling errors that occur during comment deletion
    logger.error('Error deleting comment: ' + err.message);
    res.status(500).send('Server Error');
  }
};
