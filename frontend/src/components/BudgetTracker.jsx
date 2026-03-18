import React, { useState } from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const getMonthYear = (date) =>
  new Date(date).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

const BudgetTracker = () => {
  const { expenses, updateBudget, isUpdatingBudget } = useExpenseStore();
  const {  getBudget, budget } = useAuthStore();

  const [givenBudget, setGivenBudget] = useState("");

  const groupedExpenses = expenses.reduce((groups, expense) => {
    const key = getMonthYear(expense.date);
    if (!groups[key]) groups[key] = [];
    groups[key].push(expense);
    return groups;
  }, {});

  useEffect(() => {
    getBudget();
  }, [budget]);

  const currentMonth = getMonthYear(new Date());
  const finalExpenses = groupedExpenses[currentMonth] || [];

  const totalExpense = finalExpenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  const percentageUsed = Math.min(
    Math.round((totalExpense / budget) * 100),
    100
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateBudget({ budget: Number(givenBudget) });
    setGivenBudget("");
  };

  return (
    <div className="card bg-base-200 p-6 shadow-md space-y-4 mb-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">{currentMonth}</p>
        <span className="badge badge-outline">
          Budget: ₹{Number(budget).toLocaleString("en-IN")}
        </span>
      </div>

      {/* Total Expense */}
      <p className="text-3xl font-bold text-primary text-center">
        ₹{totalExpense.toLocaleString("en-IN")}
      </p>

      {/* Progress */}
      <div>
        <progress
          className={`progress w-full ${
            percentageUsed >= 100
              ? "progress-error"
              : percentageUsed >= 80
              ? "progress-warning"
              : "progress-success"
          }`}
          value={percentageUsed}
          max="100"
        />
        <p className="text-sm text-gray-500 mt-1 text-center">
          {percentageUsed}% of budget used
        </p>
      </div>

      {/* Empty State */}
      {finalExpenses.length === 0 && (
        <p className="text-sm text-gray-500 text-center">
          No expenses recorded this month
        </p>
      )}

      {/* Update Budget */}
      <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
        <input
          type="number"
          className="input input-bordered w-full"
          value={givenBudget}
          onChange={(e) => setGivenBudget(e.target.value)}
          placeholder="Set monthly budget"
        />
        <button
          disabled={isUpdatingBudget}
          className="btn btn-primary"
          type="submit"
        >
          {isUpdatingBudget ? <Loader2 className="animate-spin" /> : "Update"}
        </button>
      </form>
    </div>
  );
};

export default BudgetTracker;
