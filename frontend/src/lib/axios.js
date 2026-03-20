import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://expense-manager-2-1q97.onrender.com/api",
  withCredentials: true,
});
