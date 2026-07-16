const Expense = require("../models/Expense");

// Add Expense
const addExpense = async (req, res) => {
  try {
    const expense = await Expense.create({
      userId: req.user.id,
      amount: req.body.amount,
      category: req.body.category,
      description: req.body.description,
      date: req.body.date,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Expenses
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      userId: req.user.id,
    });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Expense
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(expense);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Expense
const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Expense deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};