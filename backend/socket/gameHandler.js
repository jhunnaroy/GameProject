import Room from "../models/Room.js";

import {
  chooseWordService,
  checkGuessService,
  handleCorrectGuessService,
  getLeaderboardService,
  nextRoundService,
  getWinnerService,
  getRandomWordsService,
  startGameService,
} from "../services/gameService.js";

const gameHandler = (io, socket) => {

  // ==========================
  // Start Game
  // ==========================
socket.on("start_game", async ({ roomCode }) => {
  try {
    console.log("START GAME RECEIVED:", roomCode);

    const room = await startGameService(roomCode);

    console.log("Drawer:", room.currentDrawer);

    // Send game started event
    io.to(roomCode).emit(
      "game_started",
      room
    );

    const words =
      await getRandomWordsService();

    console.log(
      "WORDS SENT:",
      words
    );

    io.to(roomCode).emit(
      "word_options",
      words
    );

    console.log(
      "WORD_OPTIONS EMITTED"
    );

  } catch (error) {
    console.log(
      "START GAME ERROR:",
      error
    );
  }
});

// ==========================
  // Choose Word
  // ==========================
  socket.on(
    "choose_word",
    async ({
      roomCode,
      word,
    }) => {

      try {

        const room =
          await chooseWordService(
            roomCode,
            word
          );

       io.to(roomCode).emit(
  "word_selected",
  {
    drawer:
      room.currentDrawer,

    word,

    hint:
      "_ ".repeat(
        word.length
      ),
  }
);

      } catch (error) {

        socket.emit(
          "error_message",
          error.message
        );

      }
    }
  );

  // ==========================
  // Guess Word
  // ==========================
  socket.on(
    "guess",
    async ({
      roomCode,
      playerName,
      guess,
      remainingTime,
    }) => {

      try {

        const isCorrect =
          await checkGuessService(
            roomCode,
            guess
          );

        if (!isCorrect) {

          io.to(roomCode).emit(
            "guess_wrong",
            {
              playerName,
              guess,
            }
          );

          return;
        }

        const result =
          await handleCorrectGuessService(
            roomCode,
            playerName,
            remainingTime
          );

        io.to(roomCode).emit(
          "correct_guess",
          {
            playerName,
            points:
              result.points,
          }
        );

        const leaderboard =
          await getLeaderboardService(
            roomCode
          );

        io.to(roomCode).emit(
          "leaderboard_update",
          leaderboard
        );

      } catch (error) {

        socket.emit(
          "error_message",
          error.message
        );

      }
    }
  );

  // ==========================
  // End Round
  // ==========================
  socket.on(
    "end_round",
    async ({
      roomCode,
    }) => {

      try {

        const room =
          await Room.findOne({
            roomCode,
          });

        io.to(roomCode).emit(
          "round_ended",
          {
            word:
              room.currentWord,
          }
        );

      } catch (error) {

        socket.emit(
          "error_message",
          error.message
        );

      }
    }
  );

  // ==========================
  // Next Round
  // ==========================
  socket.on(
    "next_round",
    async ({
      roomCode,
    }) => {

      try {

        const room =
          await nextRoundService(
            roomCode
          );

        io.to(roomCode).emit(
          "round_started",
          room
        );

        const words =
          await getRandomWordsService();

        io.to(roomCode).emit(
          "word_options",
          words
        );

      } catch (error) {

        socket.emit(
          "error_message",
          error.message
        );

      }
    }
  );

  // ==========================
  // Leaderboard
  // ==========================
  socket.on(
    "get_leaderboard",
    async ({
      roomCode,
    }) => {

      try {

        const leaderboard =
          await getLeaderboardService(
            roomCode
          );

        socket.emit(
          "leaderboard_update",
          leaderboard
        );

      } catch (error) {

        socket.emit(
          "error_message",
          error.message
        );

      }
    }
  );

  // ==========================
  // Game Over
  // ==========================
  socket.on(
    "game_over",
    async ({
      roomCode,
    }) => {

      try {

        const winner =
          await getWinnerService(
            roomCode
          );

        io.to(roomCode).emit(
          "game_over",
          winner
        );

      } catch (error) {

        socket.emit(
          "error_message",
          error.message
        );

      }
    }
  );

};

export default gameHandler;