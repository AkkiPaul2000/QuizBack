const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const authMiddleware = require('../utils/authMiddleware');

// Create Quiz (protected route)
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { title, type, questions } = req.body;
    const createdBy = req.user.userId; // From authMiddleware

    // Basic validation (you can add more as needed)
    if (!title || !type || !questions || questions.length === 0) {
      return res.status(400).json({ error: 'Invalid quiz data' });
    }

    const quiz = new Quiz({ title, type, createdBy, questions });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all quizzes created by the logged-in user (protected route)
router.get('/my-quizzes', authMiddleware, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ createdBy: req.user.userId });
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single quiz by ID (public route, increments impressions)
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Increment impressions
    quiz.impressions++;
    await quiz.save();

    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Edit Quiz (protected route, with restrictions)
router.put('/edit/:id', authMiddleware, async (req, res) => {
  // ... (Implementation will be added in a later part)
});

// Delete Quiz (protected route)
router.delete('/delete/:id', authMiddleware, async (req, res) => {
  // ... (Implementation will be added in a later part)
});

// Get Quiz Analytics (protected route)
router.get('/analytics/:id', authMiddleware, async (req, res) => {
  // ... (Implementation will be added in a later part)
});

module.exports = router;