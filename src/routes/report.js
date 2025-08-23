
const express = require('express');
const router = express.Router();
const { Op, fn, col } = require('sequelize');
const Expense = require('../models/expense');

// GET /report/daily
// Returns total spent today
router.get('/daily', async (req, res) => {
  try {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().slice(0, 10);
    // Sum all expenses for today
    const total = await Expense.sum('amount', { where: { date: today } });
    res.json({ date: today, total: total || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /report/monthly?month=MM-YYYY
// Returns total spent in a month and breakdown by category
router.get('/monthly', async (req, res) => {
  try {
    const { month } = req.query;
    if (!month) return res.status(400).json({ error: 'month query param required (MM-YYYY)' });
    // Parse month and year
    const [mm, yyyy] = month.split('-');
    const start = new Date(`${yyyy}-${mm}-01`); // First day of month
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1); // First day of next month
    // Sum all expenses in the month
    const total = await Expense.sum('amount', {
      where: {
        date: { [Op.gte]: start, [Op.lt]: end },
      },
    });
    // Group by category and sum
    const byCategory = await Expense.findAll({
      attributes: ['category', [fn('SUM', col('amount')), 'total']],
      where: { date: { [Op.gte]: start, [Op.lt]: end } },
      group: ['category'],
    });
    res.json({ month, total: total || 0, byCategory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Export the router
module.exports = router;
