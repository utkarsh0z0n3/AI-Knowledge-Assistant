import "./config/env.js";
import express from "express";
import cors from "cors";
import sequelize from "./infra/db.js";
import User from "./modules/auth/user.model.js";
import Document from "./modules/document/document.model.js";
import Chunk from "./modules/ingestion/chunk.model.js";
import Embedding from "./modules/ingestion/embedding.model.js";
import Chat from "./modules/chat/chat.model.js";
import authRoutes from "./modules/auth/auth.routes.js";
import { authMiddleware } from "./modules/auth/auth.middleware.js";
import documentRoutes from "./modules/document/document.routes.js";
import searchRoutes from "./modules/search/search.routes.js";
import chatRoutes from "./modules/chat/chat.routes.js";

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
});

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/documents", documentRoutes);
app.use("/search", searchRoutes);
app.use("/chat", chatRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "backend running 🚀" });
});

app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: `Hello ${req.user.id}, you have access!` });
});

app.get("/", (req, res) => {
  res.send("Backend alive");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});

const init = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected ✅");

    await sequelize.sync();
    console.log("Tables synced ✅");
  } catch (err) {
    console.error("DB init failed:", err);
  }
};

init();
