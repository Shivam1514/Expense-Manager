import express, { json } from "express";
import dotenv from "dotenv";
import authRoutes from "../src/routes/auth.route.js";
import expenseRoutes from "../src/routes/expense.route.js";
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
    origin: "http://localhost:5173",
    credentials: true,
  })
); 

const __dirname = path.resolve();

app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);

if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../frontend/dist");

  app.use(express.static(distPath));

  app.use((req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}


app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on Port number:", PORT);
});
