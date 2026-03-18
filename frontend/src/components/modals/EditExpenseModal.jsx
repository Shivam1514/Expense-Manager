import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useExpenseStore } from "../../store/useExpenseStore";

const EditExpenseModal = ({ expenseId, setEditingId }) => {
  const { expenses, editExpense, isEditingExpense } = useExpenseStore();
  const expense = expenses.find((expense) => expense._id === expenseId);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    note: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setEditingId(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [setEditingId]);

  useEffect(() => {
    if (expense) {
      setFormData({
        title: expense.title,
        amount: expense.amount,
        note: expense.note,
        category: expense.category,
        date: expense.date?.split("T")[0], // YYYY-MM-DD
      });
    }
  }, [expense]);

  async function handleSubmit(e) {
    e.preventDefault();
    await editExpense(expenseId, {
      ...formData,
      amount: Number(formData.amount),
    });
    setEditingId(null);
  }
  return (
    <div className={`modal modal-open`}>
      <div
        className="modal-backdrop backdrop-blur-sm bg-black/40"
        onClick={() => setEditingId(null)}
      />
      <div className="modal-box">
        <form onSubmit={handleSubmit} className="card-body gap-4">
          <h2 className="text-2xl font-bold text-center text-primary">
            Edit Expense
          </h2>

          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Amount"
            className="input input-bordered w-full"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Note"
            className="input input-bordered w-full"
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          />

          <select
            className="select select-bordered w-full"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Health & Fitness">Health & Fitness</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="date"
            className="input input-bordered w-full"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />

          <div className="modal-action">
            <button
              type="submit"
              className="btn btn-primary "
              disabled={isEditingExpense}
            >
              {isEditingExpense ? <Loader2 className="animate-spin" /> : "Save"}
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setEditingId(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseModal;
