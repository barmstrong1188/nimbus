console.log('Starting up server.js...')
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Import Sequelize models
const db = require('./models');

// Test DB connection
console.log('Attempting to connect to the database...');
db.sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');

    // Start server once the DB connections has been established
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);  
  });

// Test endpoint
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Server is running!' });
});

// Authentication routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Example of a protected route
const authenticateToken = require('./middleware/auth');
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route!', user: req.user });
});

// Product routes
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);