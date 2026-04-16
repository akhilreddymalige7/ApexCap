const express = require('express');
const router = express.Router();
const Suggestion = require('../models/Suggestion');

// Get all suggestions
router.get('/suggestions', async (req, res) => {
  try {
    const suggestions = await Suggestion.find().sort({ createdAt: -1 });
    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a suggestion
router.post('/suggestions', async (req, res) => {
  const suggestion = new Suggestion({
    symbol: req.body.symbol,
    name: req.body.name,
    category: req.body.category || 'Swing',
    action: req.body.action,
    targetPrice: req.body.targetPrice,
    stopLoss: req.body.stopLoss,
    rationale: req.body.rationale
  });

  try {
    const newSuggestion = await suggestion.save();
    res.status(201).json(newSuggestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get market overview (mock data)
router.get('/market', (req, res) => {
  res.json({
    nifty50: { value: 22500, change: '+1.2%' },
    sensex: { value: 74000, change: '+1.1%' },
    bankNifty: { value: 48000, change: '+0.8%' },
  });
});

module.exports = router;
