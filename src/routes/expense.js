
const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');

// POST /expense
// Add a new expense entry
router.post('/', async (req, res) => {
  try {
    // Extract fields from request body
    const { amount, category, date, note } = req.body;
    // Create and save new expense
    const expense = await Expense.create({ amount, category, date, note });
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /expenses
// List all expenses, sorted by date (newest first)
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.findAll({ order: [['date', 'DESC']] });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Export the router
module.exports = router;
