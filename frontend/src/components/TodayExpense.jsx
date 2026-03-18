import React, { useState } from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import ExpenseList from "./ExpenseList";
import EditExpenseModal from "./modals/EditExpenseModal";

const getMonthYear = (date) =>
  new Date(date).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

const TodayExpense = () => {
  const { expenses, deleteExpense } = useExpenseStore();
  const [deletingId, setDeletingId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const groupedExpenses = expenses.reduce((groups, expense) => {
    const key = getMonthYear(expense.date);
    if (!groups[key]) groups[key] = [];
    groups[key].push(expense);
    return groups;
  }, {});

  const currentMonth = getMonthYear(new Date());
  const finalExpenses = groupedExpenses[currentMonth] || [];
  const todayExpense =
    finalExpenses.filter(
      (expense) =>
        new Date(expense.date).toLocaleDateString() ===
        new Date().toLocaleDateString()
    ) || [];
  const sortedTodayExpenses = [...todayExpense].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const totalExpense = todayExpense.reduce(
    (amount, expense) => amount + Number(expense.amount),
    0
  );
  async function handleDelete(expenseId) {
    setIsDeleting(true);
    await deleteExpense(expenseId);
    setIsDeleting(false);
    setDeletingId(null);
  }

  async function handleEditExpense(expenseId) {
    setEditingId(expenseId);
  }

  return (
    <div className="bg-base-200 p-5 rounded-lg shadow-md space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-3 mb-3">
        {/* Left */}
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold text-primary">Today's Expenses</h3>
          <span className="badge badge-outline text-xs">
            {new Date().toLocaleDateString()}
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 bg-base-100 px-4 py-2 rounded-full shadow-sm">
          <span className="text-sm text-gray-500">Total :</span>
          <span className="text-lg font-bold text-primary">
            ₹{totalExpense.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {sortedTodayExpenses.map((expense) => (
        <ExpenseList
          key={expense._id}
          expense={expense}
          deletingId={deletingId}
          isDeleting={isDeleting}
          setIsDeleting={setIsDeleting}
          setDeletingId={setDeletingId}
          handleDelete={handleDelete}
          handleEditExpense={handleEditExpense}
        />
      ))}

      {todayExpense.length === 0 && (
        <p className="text-gray-500 text-sm italic text-center">
          No expenses recorded today
        </p>
      )}

      {editingId && (
        <EditExpenseModal expenseId={editingId} setEditingId={setEditingId} />
      )}
    </div>
  );
};

export default TodayExpense;
