const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const db = require('./db/database');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

// Initialize database
db.init();

// API Routes
app.use('/api/signals', require('./routes/signals'));
app.use('/api/indicators', require('./routes/indicators'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/trends', require('./routes/trends'));
app.use('/api/sources', require('./routes/sources'));

// Serve React build
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log('📊 Signal Tracker System initialized');
});
