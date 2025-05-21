const Transaction = require("../models/Transaction");

exports.createTransaction = async (req, res) => {
  const { title, amount, type, category, date } = req.body;

  try {
    const transaction = await Transaction.create({
      user: req.user._id,
      title,
      amount,
      type,
      category,
      date
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Failed to create transaction", error: error.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transactions", error: error.message });
  }
};

exports.updateTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Failed to update transaction", error: error.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findOneAndDelete({ _id: id, user: req.user._id });

    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete transaction", error: error.message });
  }
};
