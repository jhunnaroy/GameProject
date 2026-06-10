import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameStarted: false,

  gameEnded: false,

  currentWord: "",

  currentHint: "",

  currentDrawer: "",

  round: 1,

  totalRounds: 3,

  timeLeft: 60,

  winner: null,

  leaderboard: [],

  isLoading: false,

  error: null,
};

const gameSlice = createSlice({
  name: "game",

  initialState,

  reducers: {

    // ==========================
    // Game Status
    // ==========================
    setGameStarted: (
      state,
      action
    ) => {
      state.gameStarted =
        action.payload;
    },

    setGameEnded: (
      state,
      action
    ) => {
      state.gameEnded =
        action.payload;
    },

    // ==========================
    // Current Word
    // ==========================
    setCurrentWord: (
      state,
      action
    ) => {
      state.currentWord =
        action.payload;
    },

    // ==========================
    // Current Hint
    // ==========================
    setCurrentHint: (
      state,
      action
    ) => {
      state.currentHint =
        action.payload;
    },

    // ==========================
    // Drawer
    // ==========================
    setCurrentDrawer: (
      state,
      action
    ) => {
      state.currentDrawer =
        action.payload;
    },

    // ==========================
    // Round
    // ==========================
    setRound: (
      state,
      action
    ) => {
      state.round =
        action.payload;
    },

    setTotalRounds: (
      state,
      action
    ) => {
      state.totalRounds =
        action.payload;
    },

    nextRound: (
      state
    ) => {
      state.round += 1;
    },

    // ==========================
    // Timer
    // ==========================
    setTimeLeft: (
      state,
      action
    ) => {
      state.timeLeft =
        action.payload;
    },

    decrementTimer: (
      state
    ) => {
      if (
        state.timeLeft > 0
      ) {
        state.timeLeft -= 1;
      }
    },

    resetTimer: (
      state,
      action
    ) => {
      state.timeLeft =
        action.payload || 60;
    },

    // ==========================
    // Winner
    // ==========================
    setWinner: (
      state,
      action
    ) => {
      state.winner =
        action.payload;
    },

    // ==========================
    // Leaderboard
    // ==========================
    setLeaderboard: (
      state,
      action
    ) => {
      state.leaderboard =
        action.payload;
    },

    // ==========================
    // Loading
    // ==========================
    setLoading: (
      state,
      action
    ) => {
      state.isLoading =
        action.payload;
    },

    // ==========================
    // Error
    // ==========================
    setError: (
      state,
      action
    ) => {
      state.error =
        action.payload;
    },

    clearError: (
      state
    ) => {
      state.error = null;
    },

    // ==========================
    // Reset Game
    // ==========================
    resetGame: (
      state
    ) => {
      state.gameStarted =
        false;

      state.gameEnded =
        false;

      state.currentWord =
        "";

      state.currentHint =
        "";

      state.currentDrawer =
        "";

      state.round = 1;

      state.totalRounds = 3;

      state.timeLeft = 60;

      state.winner = null;

      state.leaderboard =
        [];

      state.isLoading =
        false;

      state.error = null;
    },
  },
});

export const {

  setGameStarted,

  setGameEnded,

  setCurrentWord,

  setCurrentHint,

  setCurrentDrawer,

  setRound,

  setTotalRounds,

  nextRound,

  setTimeLeft,

  decrementTimer,

  resetTimer,

  setWinner,

  setLeaderboard,

  setLoading,

  setError,

  clearError,

  resetGame,

} = gameSlice.actions;

export default gameSlice.reducer;