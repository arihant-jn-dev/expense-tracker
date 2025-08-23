
// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const expenseRoutes = require('./routes/expense'); // Expense endpoints
const reportRoutes = require('./routes/report');   // Report endpoints
const db = require('./db'); // Sequelize instance

const app = express();

// Parse incoming JSON requests
app.use(bodyParser.json());

// Route for adding and listing expenses
app.use('/expense', expenseRoutes);   // POST /expense
app.use('/expenses', expenseRoutes);  // GET /expenses

// Route for reports (daily, monthly)
app.use('/report', reportRoutes);

// Set port from env or default to 3000
const PORT = process.env.PORT || 3000;

// Sync database and start server
db.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
