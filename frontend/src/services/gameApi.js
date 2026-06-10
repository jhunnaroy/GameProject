import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:7000/api";

const gameApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type":
      "application/json",
  },
});

// ==========================
// Start Game
// ==========================
export const startGame =
  async (roomCode) => {

    const { data } =
      await gameApi.post(
        "/game/start",
        {
          roomCode,
        }
      );

    return data;
  };

// ==========================
// Get Random Words
// ==========================
export const getRandomWords =
  async () => {

    const { data } =
      await gameApi.get(
        "/game/random-words"
      );

    return data;
  };

// ==========================
// Choose Word
// ==========================
export const chooseWord =
  async (
    roomCode,
    selectedWord
  ) => {

    const { data } =
      await gameApi.post(
        "/game/choose-word",
        {
          roomCode,
          selectedWord,
        }
      );

    return data;
  };

// ==========================
// Check Guess
// ==========================
export const checkGuess =
  async (
    roomCode,
    guess,
    playerName,
    remainingTime
  ) => {

    const { data } =
      await gameApi.post(
        "/game/check-guess",
        {
          roomCode,
          guess,
          playerName,
          remainingTime,
        }
      );

    return data;
  };

// ==========================
// End Round
// ==========================
export const endRound =
  async (roomCode) => {

    const { data } =
      await gameApi.post(
        "/game/end-round",
        {
          roomCode,
        }
      );

    return data;
  };

// ==========================
// Next Round
// ==========================
export const nextRound =
  async (roomCode) => {

    const { data } =
      await gameApi.post(
        "/game/next-round",
        {
          roomCode,
        }
      );

    return data;
  };

// ==========================
// Reveal Hint
// ==========================
export const revealHint =
  async (
    roomCode,
    revealCount = 1
  ) => {

    const { data } =
      await gameApi.post(
        "/game/reveal-hint",
        {
          roomCode,
          revealCount,
        }
      );

    return data;
  };

// ==========================
// Get Leaderboard
// ==========================
export const getLeaderboard =
  async (roomCode) => {

    const { data } =
      await gameApi.get(
        `/game/leaderboard/${roomCode}`
      );

    return data;
  };

// ==========================
// Get Winner
// ==========================
export const getWinner =
  async (roomCode) => {

    const { data } =
      await gameApi.get(
        `/game/winner/${roomCode}`
      );

    return data;
  };

// ==========================
// Reset Round
// ==========================
export const resetRound =
  async (roomCode) => {

    const { data } =
      await gameApi.post(
        "/game/reset-round",
        {
          roomCode,
        }
      );

    return data;
  };

// ==========================
// End Game
// ==========================
export const endGame =
  async (roomCode) => {

    const { data } =
      await gameApi.post(
        "/game/end-game",
        {
          roomCode,
        }
      );

    return data;
  };

export default gameApi;