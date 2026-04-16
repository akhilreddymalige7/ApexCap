require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use('*',cors({
  origin: [process.env.FRONTEND_URL || 'https://apex-cap.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Seed some initial data if empty
    seedDatabase();
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));

async function seedDatabase() {
  const Suggestion = require('./models/Suggestion');
  const count = await Suggestion.countDocuments();
  if (count === 0) {
    const initialData = [
      {
        symbol: 'RELIANCE',
        name: 'Reliance Industries',
        action: 'BUY',
        targetPrice: 3200,
        stopLoss: 2850,
        rationale: 'Strong quarterly results and growth in Jio/Retail sectors.'
      },
      {
        symbol: 'TCS',
        name: 'Tata Consultancy Services',
        action: 'HOLD',
        targetPrice: 4100,
        stopLoss: 3800,
        rationale: 'Stable margins but cautious outlook on US IT spending.'
      },
      {
        symbol: 'HDFCBANK',
        name: 'HDFC Bank',
        action: 'BUY',
        targetPrice: 1750,
        stopLoss: 1450,
        rationale: 'Merger synergies beginning to reflect, attractive valuation.'
      },
      {
        symbol: 'INFY',
        name: 'Infosys Ltd',
        action: 'BUY',
        targetPrice: 1650,
        stopLoss: 1400,
        rationale: 'Robust pipeline and potential AI-driven revenue boosts.'
      },
      {
        symbol: 'ITC',
        name: 'ITC Limited',
        action: 'HOLD',
        targetPrice: 480,
        stopLoss: 400,
        rationale: 'High dividend yield; slow FMCG growth offset by hotel segment recovery.'
      },
      {
        symbol: 'ICICIBANK',
        name: 'ICICI Bank',
        action: 'BUY',
        targetPrice: 1250,
        stopLoss: 1050,
        rationale: 'Consistent credit growth and stable asset quality metrics.'
      }
    ];
    await Suggestion.insertMany(initialData);
    console.log('Seeded initial mock suggestions.');
  }

  const User = require('./models/User');
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    const bcrypt = require('bcryptjs');
    const hashedAdminPassword = await bcrypt.hash('admin123', 10);
    const hashedUserPassword = await bcrypt.hash('user123', 10);
    await User.insertMany([
      { name: 'Admin', email: 'admin@apex.com', password: hashedAdminPassword, role: 'admin' },
      { name: 'John Doe', email: 'john@user.com', password: hashedUserPassword, role: 'user', portfolio: [{symbol: 'TCS', quantity: 15, avgPrice: 3800}] }
    ]);
    console.log('Seeded initial admin and user users.');
  }
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
