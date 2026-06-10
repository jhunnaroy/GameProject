// ============================
// API URL
// ============================
export const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:7000/api";

// ============================
// Socket URL
// ============================
export const SOCKET_URL =
  import.meta.env.VITE_SERVER_URL ||
  "http://localhost:7000";

// ============================
// Game Settings
// ============================
export const DEFAULT_DRAW_TIME = 60;

export const DEFAULT_ROUNDS = 3;

export const DEFAULT_WORD_CHOICES = 3;

export const DEFAULT_MAX_PLAYERS = 8;

// ============================
// Timer
// ============================
export const ROUND_START_DELAY = 3000;

export const WORD_SELECTION_TIME = 15;

// ============================
// Canvas
// ============================
export const DEFAULT_BRUSH_SIZE = 5;

export const MAX_BRUSH_SIZE = 20;

export const MIN_BRUSH_SIZE = 1;

// ============================
// Colors
// ============================
export const DEFAULT_COLOR =
  "#000000";

// ============================
// Socket Events
// ============================
export const SOCKET_EVENTS = {

  JOIN_ROOM:
    "join_room",

  LEAVE_ROOM:
    "leave_room",

  PLAYER_JOINED:
    "player_joined",

  PLAYER_LEFT:
    "player_left",

  START_GAME:
    "start_game",

  CHOOSE_WORD:
    "choose_word",

  DRAW:
    "drawing",

  CLEAR_CANVAS:
    "clear_canvas",

  CHAT_MESSAGE:
    "chat_message",

  GUESS_WORD:
    "guess_word",

  CORRECT_GUESS:
    "correct_guess",

  NEXT_ROUND:
    "next_round",

  END_GAME:
    "end_game",

  ROOM_UPDATED:
    "room_updated",

};