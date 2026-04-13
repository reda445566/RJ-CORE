const { body } = require('express-validator');

exports.createCourse = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('level').isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid level'),
];

exports.createLesson = [
  body('title').notEmpty().withMessage('Title is required'),
  body('contentType').isIn(['video', 'article', 'pdf']).withMessage('Invalid content type'),
  body('order').optional().isNumeric(),
];

exports.submitQuiz = [
  body('answers').isArray({ min: 1 }).withMessage('Answers required'),
];

