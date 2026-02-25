import express from "express";
import Document from "./document.model.js";
import { uploadDocument } from "./document.controller.js";
import { authMiddleware, requireAdmin } from "../auth/auth.middleware.js";
import { upload } from "../../shared/upload.middleware.js";

const router = express.Router();


router.post("/upload",
    authMiddleware,
    requireAdmin,
    upload.single("file"),
    uploadDocument
);

export default router;