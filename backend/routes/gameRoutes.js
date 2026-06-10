import express from "express";

import {
  getRandomWords,
  startGame,
  endRound,
  nextRound,
  getLeaderboard,
} from "../controllers/gameController.js";

const router = express.Router();

router.get("/words", getRandomWords);

router.post("/start", startGame);

router.post("/end-round", endRound);

router.post("/next-round", nextRound);

router.get(
  "/leaderboard/:roomCode",
  getLeaderboard
);

export default router;