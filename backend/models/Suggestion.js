const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, enum: ['Intraday', 'Swing', 'Long-term'], default: 'Swing' },
  action: { type: String, enum: ['BUY', 'SELL', 'HOLD'], required: true },
  targetPrice: { type: Number, required: true },
  stopLoss: { type: Number, required: true },
  rationale: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Suggestion', suggestionSchema);
