const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// ADD transaction
router.post("/add", async (req, res) => {
  try {
    const { text, amount, type } = req.body;

    const newTransaction = new Transaction({ text, amount, type });
    await newTransaction.save();

    res.json(newTransaction);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all transactions
router.get("/all", async (req, res) => {
  try {
    const data = await Transaction.find();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;