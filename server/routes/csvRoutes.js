const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const { Parser } = require("json2csv");

// GET: Download CSV
router.get("/download-csv", async (req, res) => {
  try {
    const transactions = await Transaction.find();

    if (!transactions.length) {
      return res.status(404).json({ message: "No transactions found" });
    }

    // Define CSV Fields
    const fields = ["type", "amount", "category", "description", "date"];
    const opts = { fields };

    // Convert JSON to CSV
    const parser = new Parser(opts);
    const csv = parser.parse(transactions);

    // Set Headers for CSV Download
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=transactions.csv");
    res.status(200).send(csv);
  } catch (error) {
    console.error("Error generating CSV:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
