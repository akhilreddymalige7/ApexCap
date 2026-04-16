const mongoose = require('mongoose');
require('dotenv').config();
const Suggestion = require('./models/Suggestion');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to DB. Seeding heavily...');

    const moreData = [
      {
        symbol: 'TATAMOTORS', name: 'Tata Motors', action: 'BUY', targetPrice: 1100, stopLoss: 950, rationale: 'EV volume growth and strong JLR demand globally.'
      },
      {
        symbol: 'SBI', name: 'State Bank of India', action: 'BUY', targetPrice: 850, stopLoss: 720, rationale: 'Improving asset quality and high credit adoption.'
      },
      {
        symbol: 'WIPRO', name: 'Wipro Limited', action: 'HOLD', targetPrice: 520, stopLoss: 450, rationale: 'Restructuring underway, wait for clear margin improvements.'
      },
      {
        symbol: 'HINDUNILVR', name: 'Hindustan Unilever', action: 'SELL', targetPrice: 2200, stopLoss: 2500, rationale: 'Rural demand remains subdued, margin pressure expected.'
      },
      {
        symbol: 'LT', name: 'Larsen & Toubro', action: 'BUY', targetPrice: 3800, stopLoss: 3400, rationale: 'Record order book execution and infra push.'
      },
      {
        symbol: 'MARUTI', name: 'Maruti Suzuki', action: 'HOLD', targetPrice: 13000, stopLoss: 11500, rationale: 'Market share stabilizing but high valuations.'
      },
      {
        symbol: 'BAJFINANCE', name: 'Bajaj Finance', action: 'BUY', targetPrice: 7500, stopLoss: 6800, rationale: 'AUM growth continues to surprise positively.'
      },
      {
        symbol: 'ASIANPAINT', name: 'Asian Paints', action: 'SELL', targetPrice: 2600, stopLoss: 2950, rationale: 'Intense competition from new entrants affecting volume.'
      }
    ];

    await Suggestion.insertMany(moreData);
    console.log('Seeded 8 new stocks!');
    process.exit(0);
  })
  .catch(console.error);
