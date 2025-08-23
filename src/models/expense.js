
// Import Sequelize and DB connection
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

// Define Expense model (table: Expenses)
const Expense = sequelize.define('Expense', {
  amount: {
    type: DataTypes.FLOAT,    // Expense amount
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,   // Expense category (e.g., Food, Travel)
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY, // Date of expense (YYYY-MM-DD)
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,   // Optional note
    allowNull: true,
  },
});

// Export the Expense model
module.exports = Expense;
