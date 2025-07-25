const express = require('express');
const auth = require('../middleware/auth');
const axios = require('axios');

const router = express.Router();

// POST /ai/generate
router.post('/generate', auth, async (req, res) => {
  const { prompt, code, css } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ message: 'Gemini API key not set' });

  // Compose a system prompt for Gemini
  const systemPrompt = `You are an expert React developer. Given a user prompt and (optionally) existing code and CSS, generate a single React component (JSX/TSX) and its CSS. Respond in JSON with keys: code, css.`;
  let userPrompt = `User prompt: ${prompt}\n`;
  if (code) userPrompt += `\nCurrent code:\n${code}`;
  if (css) userPrompt += `\nCurrent CSS:\n${css}`;
  userPrompt += '\nRespond ONLY in JSON: { "code": "...", "css": "..." }';

  try {
    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        contents: [
          { role: 'user', parts: [{ text: systemPrompt + '\n' + userPrompt }] }
        ]
      }
    );
    // Log Gemini response for debugging
    // console.log('Gemini API raw response:', JSON.stringify(geminiRes.data, null, 2));
    // Parse Gemini response
    const text = geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    let json = {};
    try {
      json = JSON.parse(text);
    } catch {
      // Try to extract JSON from markdown/code block
      const match = text.match(/\{[\s\S]*\}/);
      if (match) json = JSON.parse(match[0]);
    }
    if (!json.code || !json.css) throw new Error('Invalid LLM response');
    res.json({ code: json.code, css: json.css });
  } catch (err) {
    // Log error for debugging
    console.error('Gemini API error:', err);
    res.status(500).json({ message: 'LLM generation failed', error: err.message });
  }
});

module.exports = router; 