import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useExpenseStore } from "./useExpenseStore";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: false,
  isLoggingIn: false,
  isSigningUp: false,
  isLoggingOut:false,
  budget:0,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      set({budget:res.data.budget})
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Sign up Successfull");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Sign in Successfull");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  setBudget: (budget) => set({ budget }),
  getBudget:async()=>{
    try{
      const res=await axiosInstance.get("/auth/check");
      set({budget:res.data.budget})
    }catch(error){
      toast.error(error.response.data.message);
    }},


  logout: async () => {
    set({isLoggingOut:true})
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      set({budget:0})
      toast.success("Logout Success");
    } catch (error) {
      console.log(error);
    } finally {
      set({isLoggingOut:false})
      useExpenseStore.setState({
        expenses: [],
        gettingExpenses: false,
        isEditingExpense: false,
      });
    }
  },
}));
