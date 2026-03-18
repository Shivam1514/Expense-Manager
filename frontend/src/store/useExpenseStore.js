import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useExpenseStore = create((set) => ({
  expenses: [],
  addingExpense: false,
  gettingExpenses: false,
  isDeletingExpense: false,
  isEditingExpense: false,
  isUpdatingBudget: false,

  addExpense: async (data) => {
    set({ addingExpense: true });
    try {
      const res = await axiosInstance.post("/expense/addExpense", data);
      const expense=res.data.expense;
      console.log(expense)

      set((state) => ({
        expenses: [res.data, ...state.expenses],
      }));
      return expense;
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ addingExpense: false });
    }
  },

  getExpenses: async () => {
    set({ gettingExpenses: true });
    try {
      const res = await axiosInstance.get("/expense/getExpenses");
      set({ expenses: res.data.expenses });
    } catch (error) {
    } finally {
      set({ gettingExpenses: false });
    }
  },

  deleteExpense: async (expenseId) => {
    set({ isDeletingExpense: true });
    try {
      await axiosInstance.delete(`/expense/deleteExpense/${expenseId}`);
      set((state) => ({
        expenses: state.expenses.filter((expense) => expense._id != expenseId),
      }));
      toast.success("Expense Deleted");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ isDeletingExpense: false });
    }
  },

  editExpense: async (expenseId, data) => {
    set({ isEditingExpense: true });
    try {
      console.log("clicked")
      const res = await axiosInstance.patch(
        `/expense/updateExpense/${expenseId}`,
        {
          ...data,
          amount: Number(data.amount),
          date: new Date(data.date).toISOString(),
        }
      );
      const updatedExpense = res.data;

      set((state) => ({
        expenses: state.expenses.map((exp) =>
          exp._id === expenseId ? updatedExpense : exp
        ),
      }));
      toast.success("Updated");
    } catch (error) {
      toast.error(error.response?.data?.message);
      
    } finally {
      set({ isEditingExpense: false });
    }
  },

  updateBudget: async ({ budget }) => {
    set({ isUpdatingBudget: true });
    try {
      const res = await axiosInstance.patch("/expense/updateBudget", {
        budget,
      });

      useAuthStore.getState().setBudget(budget);
      toast.success("Budget Updated");
      useAuthStore.getState().setBudget(budget);
    } catch (error) {
      console.log(error.message);
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isUpdatingBudget: false });
    }
  },
}));
