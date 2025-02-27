console.log('Starting up server.js...')
require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Import Sequelize models
const db = require('./models');

// Test DB connection
console.log('Attempting to connect to the database...');
db.sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);  
  });

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

// Test endpoint
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Server is running!' });
});