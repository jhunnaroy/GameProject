import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
   socketId: {
  type: String,
  default: "",
},

    name: {
      type: String,
      required: true,
      trim: true,
    },

    score: {
      type: Number,
      default: 0,
    },

    isHost: {
      type: Boolean,
      default: false,
    },

    isDrawer: {
      type: Boolean,
      default: false,
    },

    guessedCorrectly: {
      type: Boolean,
      default: false,
    },

    isConnected: {
      type: Boolean,
      default: true,
    },

    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default playerSchema;