const chatHandler = (io, socket) => {

  // ==========================
  // Normal Chat Message
  // ==========================
  socket.on(
    "chat_message",
    ({
      roomCode,
      playerName,
      text,
    }) => {

      io.to(roomCode).emit(
        "chat_message",
        {
          playerName,
          text,
          timestamp:
            new Date(),
        }
      );

    }
  );

  // ==========================
  // Guess Message
  // ==========================
  socket.on(
    "guess_message",
    ({
      roomCode,
      playerName,
      guess,
    }) => {

      io.to(roomCode).emit(
        "guess_message",
        {
          playerName,
          guess,
          timestamp:
            new Date(),
        }
      );

    }
  );

  // ==========================
  // Correct Guess
  // ==========================
  socket.on(
    "correct_guess_message",
    ({
      roomCode,
      playerName,
    }) => {

      io.to(roomCode).emit(
        "correct_guess_message",
        {
          message:
            `${playerName} guessed the word!`,
        }
      );

    }
  );

  // ==========================
  // System Message
  // ==========================
  socket.on(
    "system_message",
    ({
      roomCode,
      message,
    }) => {

      io.to(roomCode).emit(
        "system_message",
        {
          message,
          timestamp:
            new Date(),
        }
      );

    }
  );

  // ==========================
  // Player Joined
  // ==========================
  socket.on(
    "player_joined_message",
    ({
      roomCode,
      playerName,
    }) => {

      io.to(roomCode).emit(
        "player_joined_message",
        {
          message:
            `${playerName} joined the room`,
        }
      );

    }
  );

  // ==========================
  // Player Left
  // ==========================
  socket.on(
    "player_left_message",
    ({
      roomCode,
      playerName,
    }) => {

      io.to(roomCode).emit(
        "player_left_message",
        {
          message:
            `${playerName} left the room`,
        }
      );

    }
  );

};

export default chatHandler;