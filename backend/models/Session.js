const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  chat: { type: Array, default: [] }, // [{role: 'user'|'ai', content: string, ...}]
  code: { type: String, default: '' }, // JSX/TSX
  css: { type: String, default: '' },
  uiState: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Session', sessionSchema); 