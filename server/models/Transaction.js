const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    type: { type: String, required: true }, // 'income' or 'expense'
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String },
});

module.exports = mongoose.model('Transaction', transactionSchema);
