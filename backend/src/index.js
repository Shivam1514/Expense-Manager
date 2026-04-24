import express, { json } from "express";
import dotenv from "dotenv";
import authRoutes from "../src/routes/auth.route.js";
import expenseRoutes from "../src/routes/expense.route.js";
import chatRoutes from "../src/routes/chat.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
const app = express();

dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin:["http://localhost:5173","https://expense-manager-sigma-seven.vercel.app",] ,
    credentials: true,
  })
); 

const __dirname = path.resolve();

app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("API is running successfully.");
});


app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on Port number:", PORT);
});
