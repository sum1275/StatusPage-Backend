const { body, param, validationResult } = require('express-validator');

const VALID_SUBTITLES = [
    'Operational',
    'Partial outage',
    'Degraded performance',
    'Major outage',
    'Under maintenance',
    'Resolved'
];

// Validation middleware for addIssue
const validateAddIssue = [
    // Title validation
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .trim()
        .isLength({ min: 3, max: 300 })
        .withMessage('Title must be between 3 and 300 characters'),

    // Description validation
    body('description')
        .notEmpty()
        .withMessage('Description is required')
        .trim()
        .isLength({ min: 10, max: 10000 })
        .withMessage('Description must be between 10 and 10000 characters'),

    // Application validation
    body('application')
        .notEmpty()
        .withMessage('Application is required')
        .trim()
        .isLength({ min: 2, max: 200 })
        .withMessage('Application name must be between 2 and 200 characters'),

    // Subtitle validation
    body('subtitle')
        .notEmpty()
        .withMessage('Subtitle is required')
        .isIn(VALID_SUBTITLES)
        .withMessage('Subtitle must be one of: ' + VALID_SUBTITLES.join(', ')),

    // UserId validation (optional)
    body('userId')
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage('UserId must be at least 3 characters'),

    // Completed validation (optional boolean)
    body('completed')
        .optional()
        .isBoolean()
        .withMessage('Completed must be a boolean value'),

    // Validation result middleware
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        next();
    }
];

// Validation middleware for addStatusToIssue
const validateAddStatus = [
    param('issueId').notEmpty().withMessage('Issue ID is required'),
    body('subtitle')
        .notEmpty()
        .withMessage('Subtitle is required')
        .isIn(VALID_SUBTITLES)
        .withMessage('Subtitle must be one of: ' + VALID_SUBTITLES.join(', ')),
    body('description').notEmpty().withMessage('Description is required'),
    // ... error handling middleware
];
module.exports={validateAddIssue,validateAddStatus}