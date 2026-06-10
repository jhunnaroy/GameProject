import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomCode: "",

  host: "",

  players: [],

  settings: {
    maxPlayers: 8,
    rounds: 3,
    drawTime: 60,
    wordChoices: 3,
    hintsEnabled: true,
  },

  isLoading: false,

  error: null,
};

const roomSlice = createSlice({
  name: "room",

  initialState,

  reducers: {

    // ==========================
    // Set Entire Room
    // ==========================
    setRoom: (
      state,
      action
    ) => {

      state.roomCode =
        action.payload.roomCode;

      state.host =
        action.payload.host;

      state.players =
        action.payload.players;

      state.settings =
        action.payload.settings;
    },

    // ==========================
    // Room Code
    // ==========================
    setRoomCode: (
      state,
      action
    ) => {

      state.roomCode =
        action.payload;
    },

    // ==========================
    // Host
    // ==========================
    setHost: (
      state,
      action
    ) => {

      state.host =
        action.payload;
    },

    // ==========================
    // Players
    // ==========================
    setPlayers: (
      state,
      action
    ) => {

      state.players =
        action.payload;
    },

    addPlayer: (
      state,
      action
    ) => {

      state.players.push(
        action.payload
      );
    },

    removePlayer: (
      state,
      action
    ) => {

      state.players =
        state.players.filter(
          (player) =>
            player.name !==
            action.payload
        );
    },

    // ==========================
    // Settings
    // ==========================
    setSettings: (
      state,
      action
    ) => {

      state.settings = {
        ...state.settings,
        ...action.payload,
      };
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
    // Reset Room
    // ==========================
    resetRoom: (
      state
    ) => {

      state.roomCode = "";
      state.host = "";
      state.players = [];

      state.settings = {
        maxPlayers: 8,
        rounds: 3,
        drawTime: 60,
        wordChoices: 3,
        hintsEnabled: true,
      };

      state.isLoading =
        false;

      state.error = null;
    },
  },
});

export const {

  setRoom,

  setRoomCode,

  setHost,

  setPlayers,

  addPlayer,

  removePlayer,

  setSettings,

  setLoading,

  setError,

  clearError,

  resetRoom,

} = roomSlice.actions;

export default roomSlice.reducer;