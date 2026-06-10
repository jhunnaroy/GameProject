import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_SERVER_URL ;

let socket = null;

// ============================
// Connect Socket
// ============================
export const connectSocket = () => {

  if (!socket) {

    socket = io(
      SOCKET_URL,
      {
        transports: [
          "websocket",
        ],
      }
    );

    socket.on(
      "connect",
      () => {
        console.log(
          "✅ Connected:",
          socket.id
        );
      }
    );

    socket.on(
      "disconnect",
      () => {
        console.log(
          "❌ Disconnected"
        );
      }
    );
  }

  return socket;
};

// ============================
// Get Socket Instance
// ============================
export const getSocket =
  () => socket;

// ============================
// Disconnect Socket
// ============================
export const disconnectSocket =
  () => {

    if (socket) {

      socket.disconnect();

      socket = null;

    }
  };

// ============================
// Join Room
// ============================
export const joinRoomSocket =
  (data) => {

    socket?.emit(
      "join_room",
      data
    );
  };

// ============================
// Leave Room
// ============================
export const leaveRoomSocket =
  (data) => {

    socket?.emit(
      "leave_room",
      data
    );
  };

// ============================
// Start Game
// ============================
export const startGameSocket =
  (data) => {

    socket?.emit(
      "start_game",
      data
    );
  };

// ============================
// Choose Word
// ============================
export const chooseWordSocket =
  (data) => {

    socket?.emit(
      "choose_word",
      data
    );
  };

// ============================
// Send Chat Message
// ============================
export const sendMessageSocket =
  (data) => {

    socket?.emit(
      "chat_message",
      data
    );
  };

// ============================
// Send Guess
// ============================
export const sendGuessSocket =
  (data) => {

    socket?.emit(
      "guess_word",
      data
    );
  };

// ============================
// Drawing Event
// ============================
export const drawSocket =
  (data) => {

    socket?.emit(
      "drawing",
      data
    );
  };

// ============================
// Clear Canvas
// ============================
export const clearCanvasSocket =
  (roomCode) => {

    socket?.emit(
      "clear_canvas",
      {
        roomCode,
      }
    );
  };

// ============================
// End Round
// ============================
export const endRoundSocket =
  (data) => {

    socket?.emit(
      "end_round",
      data
    );
  };

// ============================
// Next Round
// ============================
export const nextRoundSocket =
  (data) => {

    socket?.emit(
      "next_round",
      data
    );
  };

// ============================
// Generic Listener
// ============================
export const listen =
  (
    event,
    callback
  ) => {

    socket?.on(
      event,
      callback
    );
  };

// ============================
// Remove Listener
// ============================
export const removeListener =
  (
    event,
    callback
  ) => {

    socket?.off(
      event,
      callback
    );
  };

export default {
  connectSocket,
  getSocket,
  disconnectSocket,

  joinRoomSocket,
  leaveRoomSocket,

  startGameSocket,
  chooseWordSocket,

  sendMessageSocket,
  sendGuessSocket,

  drawSocket,
  clearCanvasSocket,

  endRoundSocket,
  nextRoundSocket,

  listen,
  removeListener,
};