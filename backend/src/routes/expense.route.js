import express from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import {
  addExpense,
  deleteExpense,
  getExpenses,
  updateBudget,
  updateExpense,
} from "../controllers/expense.controllers.js";

const router = express.Router();

router.post("/addExpense", protectedRoute, addExpense);
router.get("/getExpenses", protectedRoute, getExpenses);
router.delete("/deleteExpense/:id", protectedRoute, deleteExpense);
router.patch("/updateExpense/:id", protectedRoute, updateExpense);
router.patch("/updateBudget/",protectedRoute,updateBudget);

export default router;
