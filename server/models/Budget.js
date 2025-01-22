const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    totalBudget: { type: Number, required: true },
    currentBudget: { type: Number, required: true }, // Tracks remaining budget
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Budget', budgetSchema);
