import express from "express";
import { getMyHistory } from "./chat.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";

const router = express.Router();

router.get("/history", authMiddleware, getMyHistory);

export default router;