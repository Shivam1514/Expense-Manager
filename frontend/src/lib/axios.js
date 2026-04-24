import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5500/api" : "https://expense-manager-2-1q97.onrender.com/api",
  withCredentials: true,
});
