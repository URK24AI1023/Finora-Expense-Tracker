const express = require("express");
const router = express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const {
  getDashboard,
  monthlyExpenseSummary,
  categorySummary,
} = require(
  "../controllers/dashboardController"
);

// Dashboard Summary
router.get("/", protect, getDashboard);

// Monthly Expense Summary
router.get(
  "/monthly",
  protect,
  monthlyExpenseSummary
);

// Category Summary
router.get(
  "/category",
  protect,
  categorySummary
);

module.exports = router;