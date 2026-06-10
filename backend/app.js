import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import roomRoutes from "./routes/roomRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";

dotenv.config();

const app = express();

// ============================
// Middlewares
// ============================
app.use(
  cors({
    origin:  process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ============================
// Health Check Route
// ============================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Skribbl Clone API Running 🚀",
  });
});

// ============================
// Routes
// ============================
app.use("/api/rooms", roomRoutes);
app.use("/api/game", gameRoutes);

// ============================
// 404 Handler
// ============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;