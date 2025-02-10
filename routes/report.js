/**
 * @module routes/report
 * @description Express router handling expense report generation
 */

const express = require('express');
const router = express.Router();
const Cost = require('../models/cost');
const User = require('../models/user');

/* Define valid expense categories */
const allowedCategories = ['food', 'health', 'housing', 'sport', 'education', 'other'];

/**
 * GET /report
 * @description Generates a monthly expense report grouped by categories
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.id - User ID to generate report for
 * @param {string} req.query.year - Year of the report (YYYY)
 * @param {string} req.query.month - Month of the report (1-12)
 */
router.get('/', async (req, res) => {
  const { id, year, month } = req.query;

  /* Validate required parameters */
  if (!id) {
    return res.status(400).json({ 
      error: 'Missing user ID',
      message: 'Please provide a user ID to retrieve the report'
    });
  }

  if (!year) {
    return res.status(400).json({ 
      error: 'Missing year',
      message: 'The "year" parameter is required.'
    });
  }

  if (isNaN(year) || year < 1900 || year > 2100) {
    return res.status(400).json({ 
      error: 'Invalid year format',
      message: 'Year should be a number between 1900 and 2100.'
    });
  }

  if (!month) {
    return res.status(400).json({ 
      error: 'Missing month',
      message: 'The "month" parameter is required.'
    });
  }

  if (isNaN(month) || month < 1 || month > 12) {
    return res.status(400).json({ 
      error: 'Invalid month format',
      message: 'Month should be a number between 1 and 12.'
    });
  }

  try {
    /* Verify user exists */
    const user = await User.findOne({ id: id });
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'No user exists with the provided ID'
      });
    }

    /* Retrieve expenses for the specified period */
    const costs = await Cost.find({
      userid: id,
      $expr: {
        $and: [
          { $eq: [{ $year: "$date" }, parseInt(year)] },
          { $eq: [{ $month: "$date" }, parseInt(month)] }
        ]
      }
    }).sort('date');

    /* Initialize data structure for all categories */
    const costsByCategory = {};
    allowedCategories.forEach(category => {
      costsByCategory[category] = [];
    });

    /* Group expenses by category */
    costs.forEach(cost => {
      costsByCategory[cost.category].push({
        sum: cost.sum,
        description: cost.description,
        day: cost.date.getDate()
      });
    });

    /* Format response object */
    const response = {
      userid: id,
      year: parseInt(year),
      month: parseInt(month),
      costs: costsByCategory
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ 
      error: 'Server error',
      message: 'An error occurred while retrieving the monthly report',
      details: error.message 
    });
  }
});

module.exports = router;
