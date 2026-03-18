import { EXPENSE_CATEGORIES } from "../constants/expenseCategories.js";
import Expense from "../models/expense.model.js";
import User from "../models/user.model.js";

export const addExpense = async (req, res) => {
  const userId = req.user._id;
  const { title, amount, note, category, date } = req.body;
  try {
    if (!title || title.trim().length == 0)
      return res.status(400).json({ message: "Title is required" });
    if (!amount || Number(amount) <= 0)
      return res.status(400).json({ message: "Invalid Amount" });

    if (category && !EXPENSE_CATEGORIES.includes(category.trim()))
      return res.status(400).json({ message: "Invalid Category" });

    const expenseDate = date ? new Date(date).toISOString() : new Date().toISOString();

    const expense = await Expense.create({
      userId,
      title: title.trim(),
      amount: Number(amount),
      note: note?.trim(),
      category: category ? category.trim() : "Other",
      date: expenseDate,
    });

    await expense.save();

    return res.status(201).json({ expense });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getExpenses = async (req, res) => {
  const userId = req.user._id;
  try {
    const expenses = await Expense.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json({ expenses });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteExpense = async (req, res) => {
  const userId = req.user._id;
  const expenseId = req.params.id;

  try {
    const expense = await Expense.findOneAndDelete({ _id: expenseId, userId });
    if (!expense) return res.status(404).json({ message: "No Expense found" });

    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const userId = req.user._id;
    const expenseId = req.params.id;
    const { title, amount, note, category, date } = req.body;

    // Build update object dynamically
    const updateData = {};

    if (title && title.trim().length > 0) {
      updateData.title = title.trim();
    }

    if (amount && Number(amount) > 0) {
      updateData.amount = Number(amount);
    }

    if (note && note.trim().length > 0) {
      updateData.note = note?.trim();
    }

    if (category) {
      if (!EXPENSE_CATEGORIES.includes(category.trim())) {
        return res.status(400).json({ message: "Invalid category" });
      }
      updateData.category = category.trim();
    }

    if (date) {
      updateData.date = date;
    }

    // Prevent empty update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: expenseId, userId }, // 🔐 ownership check
      updateData,
      { new: true } // return updated doc
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.status(200).json(updatedExpense);
  } catch (error) {
    console.error("Update Expense Error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateBudget = async (req, res) => {
  try {
    const userId = req.user._id;
    const { budget } = req.body;

    if (!budget || Number(budget) <= 0) {
      return res.status(404).json({ message: "Budget must be more than 0" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { budget: Number(budget) },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({message: "Budget updated successfully"});
  } catch (error) {
    console.error("Update Expense Error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
