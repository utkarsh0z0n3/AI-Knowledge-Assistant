import express from "express";
import { askQuestion } from "./search.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";


const router = express.Router();

router.post("/ask", authMiddleware, askQuestion);

export default router;