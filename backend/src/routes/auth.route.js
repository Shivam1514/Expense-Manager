import express from "express";
import {
  check,
  login,
  logout,
  signup,
} from "../controllers/auth.controllers.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", protectedRoute, check);

export default router;
