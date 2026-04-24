import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5500/api" : "https://expense-manager-65f5.onrender.com/api",
  withCredentials: true,
});
