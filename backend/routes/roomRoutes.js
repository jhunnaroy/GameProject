import express from "express";

import {
  createRoom,
  joinRoom,
  getRoom,
  getAllRooms,
  deleteRoom,
} from "../controllers/roomController.js";

const router = express.Router();

router.post("/create", createRoom);

router.post("/join", joinRoom);

router.get("/", getAllRooms);

router.get("/:roomCode", getRoom);

router.delete("/:roomCode", deleteRoom);

export default router;