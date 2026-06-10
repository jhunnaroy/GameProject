import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";

import app from "./app.js";
import connectDB from "./config/db.js";

import socketManager from "./socket/socketManager.js";

dotenv.config();

// ==========================
// Database Connection
// ==========================
connectDB();

// ==========================
// Create HTTP Server
// ==========================
const server = http.createServer(app);

// ==========================
// Socket.IO Setup
// ==========================
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

// ==========================
// Socket Manager
// ==========================
socketManager(io);

// ==========================
// Start Server
// ==========================
const PORT =
  process.env.PORT || 7000;

server.listen(PORT, () => {

  console.log(
    `🚀 Server running on port http://localhost:${PORT}`
  );

});