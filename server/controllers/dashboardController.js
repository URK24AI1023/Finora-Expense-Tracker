const Income = require("../models/Income");
const Expense = require("../models/Expense");
const mongoose = require("mongoose");

// Dashboard Summary
const getDashboard = async (req, res) => {
  try {
    const incomes = await Income.find({
      userId: req.user.id,
    });

    const expenses = await Expense.find({
      userId: req.user.id,
    });

    const totalIncome = incomes.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const totalExpense = expenses.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const balance = totalIncome - totalExpense;

    res.json({
      totalIncome,
      totalExpense,
      balance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Monthly Expense Summary
const monthlyExpenseSummary = async (
  req,
  res
) => {
  try {
    const result = await Expense.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(
            req.user.id
          ),
        },
      },
      {
        $group: {
          _id: {
            month: {
              $month: "$date",
            },
          },
          total: {
            $sum: "$amount",
          },
        },
      },
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Category Summary
const categorySummary = async (
  req,
  res
) => {
  try {
    const result = await Expense.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(
            req.user.id
          ),
        },
      },
      {
        $group: {
          _id: "$category",
          total: {
            $sum: "$amount",
          },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
  monthlyExpenseSummary,
  categorySummary,
};