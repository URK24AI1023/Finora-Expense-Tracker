const Income = require("../models/Income");

// Add Income
const addIncome = async (req, res) => {
  try {
    const income = await Income.create({
      userId: req.user.id,
      amount: req.body.amount,
      category: req.body.category,
      description: req.body.description,
      date: req.body.date,
    });

    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Income
const getIncome = async (req, res) => {
  try {
    const incomes = await Income.find({
      userId: req.user.id,
    });

    res.json(incomes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Income
const updateIncome = async (req, res) => {
  try {
    const income = await Income.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(income);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Income
const deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Income deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addIncome,
  getIncome,
  updateIncome,
  deleteIncome,
};