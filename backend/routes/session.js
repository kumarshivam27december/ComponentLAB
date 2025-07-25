const express = require('express');
const Session = require('../models/Session');
const auth = require('../middleware/auth');

const router = express.Router();

// List all sessions for user
router.get('/', auth, async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.userId }).sort({ updatedAt: -1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch sessions', error: err.message });
  }
});

// Create new session
router.post('/', auth, async (req, res) => {
  try {
    const session = await Session.create({ user: req.user.userId });
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create session', error: err.message });
  }
});

// Get a session by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.id, user: req.user.userId });
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch session', error: err.message });
  }
});

// Update a session (auto-save)
router.put('/:id', auth, async (req, res) => {
  try {
    const { chat, code, css, uiState } = req.body;
    const session = await Session.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { chat, code, css, uiState, updatedAt: Date.now() },
      { new: true }
    );
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update session', error: err.message });
  }
});

module.exports = router; 