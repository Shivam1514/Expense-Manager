import express from "express";
import { handleChat } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/message", handleChat);

export default router;
