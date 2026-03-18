import mongoose from "mongoose";
import { EXPENSE_CATEGORIES } from "../constants/expenseCategories.js";

const expenseSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  note: {
    type: String,
  },
  category: {
    type: String,
    required: true,
    enum: EXPENSE_CATEGORIES,
  },
  date: {
    type: String,
    required:true
  },
});

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
