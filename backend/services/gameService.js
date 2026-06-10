import Room from "../models/Room.js";

import { getRandomWords } from "../utils/getRandomWords.js";

import {
  calculateScore,
  calculateDrawerScore,
} from "../utils/scoreCalculator.js";

import {
  generateHint,
} from "../utils/hintGenerator.js";


// ====================================
// Get Random Words
// ====================================
export const getRandomWordsService =
async () => {

  return getRandomWords(3);

};


// ====================================
// Start Game
// ====================================
export const startGameService =
async (roomCode) => {

  const room = await Room.findOne({
    roomCode,
  });

  if (!room) {
    throw new Error("Room not found");
  }

  room.gameStarted = true;

  room.round = 1;

  room.currentDrawer =
    room.players[0]?.name || "";

  room.players.forEach(
    (player, index) => {

      player.isDrawer =
        index === 0;

      player.guessedCorrectly =
        false;

    }
  );

  await room.save();

  return room;
};


// ====================================
// Choose Word
// ====================================
export const chooseWordService =
async (
  roomCode,
  selectedWord
) => {

  const room = await Room.findOne({
    roomCode,
  });

  if (!room) {
    throw new Error("Room not found");
  }

  room.currentWord =
    selectedWord;

  room.currentHint =
    generateHint(
      selectedWord,
      0
    );

  await room.save();

  return room;
};


// ====================================
// Correct Guess
// ====================================
export const handleCorrectGuessService =
async (
  roomCode,
  playerName,
  remainingTime
) => {

  const room = await Room.findOne({
    roomCode,
  });

  if (!room) {
    throw new Error("Room not found");
  }

  const player =
    room.players.find(
      (p) =>
        p.name === playerName
    );

  if (!player) {
    throw new Error(
      "Player not found"
    );
  }

  if (
    player.guessedCorrectly
  ) {

    return {
      room,
      points: 0,
    };

  }

  const points =
    calculateScore(
      remainingTime,
      room.settings.drawTime
    );

  player.score += points;

  player.guessedCorrectly =
    true;

  const drawer =
    room.players.find(
      (p) => p.isDrawer
    );

  if (
    drawer &&
    drawer.name !== playerName
  ) {

    drawer.score +=
      calculateDrawerScore(
        room.players.length
      );
  }

  await room.save();

  return {
    room,
    points,
  };
};


// ====================================
// End Round
// ====================================
export const endRoundService =
async (roomCode) => {

  const room = await Room.findOne({
    roomCode,
  });

  if (!room) {
    throw new Error(
      "Room not found"
    );
  }

  room.players.forEach(
    (player) => {

      player.guessedCorrectly =
        false;

    }
  );

  await room.save();

  return room;
};


// ====================================
// Select Next Drawer
// ====================================
export const selectNextDrawer =
(room) => {

  const currentIndex =
    room.players.findIndex(
      (player) =>
        player.name ===
        room.currentDrawer
    );

  const nextIndex =
    (
      currentIndex + 1
    ) %
    room.players.length;

  room.players.forEach(
    (player) => {

      player.isDrawer =
        false;

    }
  );

  room.players[
    nextIndex
  ].isDrawer = true;

  room.currentDrawer =
    room.players[nextIndex]
      .name;

  return room;
};


// ====================================
// Next Round
// ====================================
export const nextRoundService =
async (roomCode) => {

  const room = await Room.findOne({
    roomCode,
  });

  if (!room) {
    throw new Error(
      "Room not found"
    );
  }

  room.currentWord = "";

  room.currentHint = "";

  selectNextDrawer(
    room
  );

  room.round += 1;

  room.players.forEach(
    (player) => {

      player.guessedCorrectly =
        false;

    }
  );

  await room.save();

  return room;
};


// ====================================
// Reveal Hint
// ====================================
export const revealHintService =
(
  word,
  revealCount = 1
) => {

  return generateHint(
    word,
    revealCount
  );

};


// ====================================
// Leaderboard
// ====================================
export const getLeaderboardService =
async (roomCode) => {

  const room = await Room.findOne({
    roomCode,
  });

  if (!room) {
    throw new Error(
      "Room not found"
    );
  }

  return [
    ...room.players,
  ].sort(
    (a, b) =>
      b.score - a.score
  );
};


// ====================================
// Winner
// ====================================
export const getWinnerService =
async (roomCode) => {

  const leaderboard =
    await getLeaderboardService(
      roomCode
    );

  return leaderboard[0];
};


// ====================================
// Check Guess
// ====================================
export const checkGuessService =
async (
  roomCode,
  guess
) => {

  const room = await Room.findOne({
    roomCode,
  });

  if (!room) {
    throw new Error(
      "Room not found"
    );
  }

  return (
    guess
      .trim()
      .toLowerCase() ===
    room.currentWord
      .trim()
      .toLowerCase()
  );
};


// ====================================
// Reset Round
// ====================================
export const resetRoundService =
async (roomCode) => {

  const room = await Room.findOne({
    roomCode,
  });

  if (!room) {
    throw new Error(
      "Room not found"
    );
  }

  room.currentWord = "";
  room.currentHint = "";

  room.players.forEach(
    (player) => {

      player.guessedCorrectly =
        false;

    }
  );

  await room.save();

  return room;
};


// ====================================
// Game Finished?
// ====================================
export const isGameFinishedService =
async (roomCode) => {

  const room = await Room.findOne({
    roomCode,
  });

  if (!room) {
    throw new Error(
      "Room not found"
    );
  }

  return (
    room.round >
    room.settings.rounds
  );
};