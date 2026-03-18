import React, { memo } from "react";
import { Pencil, Trash, Loader2 } from "lucide-react";
import { CATEGORY_BADGES } from "../constants";
const ExpenseList = ({
  expense,
  deletingId,
  isDeleting,
  setDeletingId,
  handleEditExpense,
  handleDelete,
}) => {
  return (
    <li
      key={expense.id}
      className="flex flex-col md:flex-row justify-between p-4 bg-base-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      {expense._id === deletingId ? (
        <div className="w-full flex flex-row justify-between gap-4 p-4 bg-red-100 border border-red-300 rounded-lg shadow-md">
          <p className="text-red-700 font-semibold text-center">
            Are you sure you want to delete this expense?
          </p>
          <div className="flex justify-center gap-4">
            <button
              autoFocus
              disabled={isDeleting}
              className={`btn btn-error btn-sm transition-transform
                ${
                  isDeleting
                    ? "bg-error text-white opacity-80 cursor-not-allowed"
                    : "hover:scale-105"
                }
              `}
              onClick={() => handleDelete(deletingId)}
            >
              {isDeleting ? (
                <Loader2 className="animate-spin text-white" />
              ) : (
                "Yes"
              )}
            </button>
            <button
              className="btn btn-sm hover:scale-105 transition-transform"
              onClick={() => setDeletingId(null)}
            >
              No
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-1 md:gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`badge badge-sm ${
                  CATEGORY_BADGES[expense.category] || "badge-outline"
                }`}
              >
                {expense.category}
              </span>
              <p className="font-semibold text-lg">{expense.title}</p>
            </div>
            {expense.note && (
              <p className="text-sm text-gray-500 italic">{expense.note}</p>
            )}
            <p className="text-sm text-gray-400">
              {new Date(expense.date).toLocaleDateString()}
            </p>
          </div>

          <div className="mt-2 md:mt-0 flex items-center gap-3 justify-between">
            <div>
              <span className="font-bold text-xl text-primary">
                ₹{expense?.amount?.toLocaleString("en-IN")}
              </span>
            </div>
            <div>
              <button
                className="btn btn-ghost btn-sm"
                title="Edit Expense"
                onClick={() => handleEditExpense(expense._id)}
              >
                <Pencil size={16} />
              </button>

              <button
                className="btn btn-error btn-sm"
                title="Delete Expense"
                disabled={deletingId === expense._id}
                onClick={() => setDeletingId(expense._id)}
              >
                {deletingId === expense._id ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <Trash size={16} />
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default memo(ExpenseList);
