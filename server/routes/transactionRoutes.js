const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();
const Budget = require('../models/Budget');

// Add a new transaction and update budget
router.post('/', async (req, res) => {
    try {
        const transaction = new Transaction(req.body);
        const savedTransaction = await transaction.save();

        // Update the budget
        const budget = await Budget.findOne();
        if (!budget) return res.status(400).json({ error: 'No budget set' });
        const amount = parseFloat(req.body.amount);

        if (req.body.type === 'income') {
            budget.currentBudget += amount;
        } else if (req.body.type === 'expense') {
            budget.currentBudget -= amount;
        }
        await budget.save();

        res.json(savedTransaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Get Transactions with Pagination
router.get("/", async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Default to page 1
      const limit = parseInt(req.query.limit) || 10; // Default to 10 transactions per page
      const skip = (page - 1) * limit;
  
      // Fetch transactions with pagination
      const transactions = await Transaction.find().sort({ date: -1 }).skip(skip).limit(limit);
      const totalCount = await Transaction.countDocuments();

  
      res.json({
        totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        transactions,
        
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch transactions" });
    }
  });

// Add a new transaction
router.post('/', async (req, res) => {
    try {
        const transaction = new Transaction(req.body);
        const savedTransaction = await transaction.save();
        res.json(savedTransaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Line graph data
router.get("/graph-data", async (req, res) => {
    try {
      // Fetch all transactions and group by month and year
      const transactions = await Transaction.find();
  
      const groupedData = transactions.reduce((acc, transaction) => {
        const date = new Date(transaction.date);
        const monthYear = `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`;
  
        if (!acc[monthYear]) {
          acc[monthYear] = { income: 0, expense: 0 };
        }
  
        if (transaction.type === "income") {
          acc[monthYear].income += transaction.amount;
        } else if (transaction.type === "expense") {
          acc[monthYear].expense += transaction.amount;
        }
  
        return acc;
      }, {});
  
      // Convert grouped data to a sorted array for graph
      const sortedData = Object.entries(groupedData)
        .sort(([a], [b]) => new Date(a) - new Date(b))
        .map(([monthYear, values]) => ({
          monthYear,
          income: values.income,
          expense: values.expense,
        }));
  
      res.status(200).json(sortedData);
    } catch (error) {
      console.error("Error fetching graph data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });





// Update a transaction
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { date, description, category, type, amount } = req.body;
  
    try {
      // Validate input
      if (!date || !description || !category || !type || !amount) {
        return res.status(400).json({ error: "All fields are required." });
      }
  
      // Fetch the existing transaction
      const existingTransaction = await Transaction.findById(id);
      if (!existingTransaction) {
        return res.status(404).json({ error: "Transaction not found." });
      }
  
      // Fetch the current budget
      const budget = await Budget.findOne();
      if (!budget) {
        return res.status(500).json({ error: "Budget not found." });
      }
  
      // Adjust the current budget based on the changes
      if (existingTransaction.type === "income") {
        // If previous type was income, decrease the budget by the old amount
        budget.currentBudget -= existingTransaction.amount;
      } else if (existingTransaction.type === "expense") {
        // If previous type was expense, increase the budget by the old amount
        budget.currentBudget += existingTransaction.amount;
      }
  
      if (type === "income") {
        // If new type is income, increase the budget by the new amount
        budget.currentBudget += amount;
      } else if (type === "expense") {
        // If new type is expense, decrease the budget by the new amount
        budget.currentBudget -= amount;
      }
  
      // Save the updated budget
      await budget.save();
  
      // Update the transaction
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        id,
        { date, description, category, type, amount },
        { new: true }
      );
  
      res.status(200).json({ updatedTransaction, currentBudget: budget.currentBudget });
    } catch (error) {
      console.error("Error updating transaction:", error);
      res.status(500).json({ error: "Internal Server Error." });
    }
  });






// Delete a transaction and update budget
router.delete('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ error: 'Transaction not found' });

        // Update the budget
        const budget = await Budget.findOne();
        if (!budget) return res.status(400).json({ error: 'No budget set' });

        if (transaction.type === 'income') {
            budget.currentBudget -= transaction.amount;
        } else if (transaction.type === 'expense') {
            budget.currentBudget += transaction.amount;
        }
        await budget.save();

        // Delete the transaction
        await Transaction.findByIdAndDelete(req.params.id);
        res.json({ message: 'Transaction deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
