const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getQuestions, submitTest } = require('../controllers/testController');
const router = express.Router();

// Ensure these routes are correct and implemented in your backend server
router.get('/questions', authMiddleware, getQuestions);
router.post('/submit', authMiddleware, submitTest);

module.exports = router;
