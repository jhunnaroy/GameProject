import mongoose from "mongoose";
import playerSchema from "./Player.js";

const roomSchema = new mongoose.Schema(
  {
    roomCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    hostId: {
      type: String,
      required: true,
      trim: true,
    },

    players: [playerSchema],

    currentWord: {
      type: String,
      default: "",
    },

    currentHint: {
      type: String,
      default: "",
    },

    currentDrawer: {
      type: String,
      default: "",
    },

    gameStarted: {
      type: Boolean,
      default: false,
    },

    gameEnded: {
      type: Boolean,
      default: false,
    },

    round: {
      type: Number,
      default: 1,
    },

    timeRemaining: {
      type: Number,
      default: 60,
    },

    winner: {
      type: String,
      default: "",
    },

    settings: {
      maxPlayers: {
        type: Number,
        default: 8,
        min: 2,
        max: 20,
      },

      rounds: {
        type: Number,
        default: 3,
      },

      drawTime: {
        type: Number,
        default: 60,
      },

      wordChoices: {
        type: Number,
        default: 3,
      },

      hintsEnabled: {
        type: Boolean,
        default: true,
      },
    },

    // Optional statistics
    totalGuesses: {
      type: Number,
      default: 0,
    },

    correctGuesses: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model(
  "Room",
  roomSchema
);

export default Room;