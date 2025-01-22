const express = require('express');
const Budget = require('../models/Budget');
const router = express.Router();

// Get the budget
router.get('/', async (req, res) => {
    try {
        const budget = await Budget.findOne();
        res.json(budget);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Set or update the total budget

router.post('/', async (req, res) => {
  try {
      let { totalBudget } = req.body;
      const budget = await UpdateBudget(Number(totalBudget));

      res.json(budget);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

/**
 * 
 * @param {Number} totalBudget
 * @returns {Budget} 
 * 
 */
async function UpdateBudget(totalBudget)
{
    let budget = await Budget.findOne();

    if (budget) {
        budget.totalBudget += totalBudget;
        budget.currentBudget += totalBudget; // Adjust current budget
        await budget.save();
    } else {
        budget = new Budget({ totalBudget, currentBudget: totalBudget });
        await budget.save();
    }
    return budget;
}


module.exports = router;

