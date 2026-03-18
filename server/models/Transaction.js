const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  text: String,
  amount: Number,
  type: String // income or expense
});

module.exports = mongoose.model("Transaction", transactionSchema);