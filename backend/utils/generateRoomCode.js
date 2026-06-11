import Room from "../models/Room.js";

const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export const generateRoomCode =
async (length = 6) => {

  let roomCode;
  let exists = true;

  while (exists) {

    roomCode = "";

    for (
      let i = 0;
      i < length;
      i++
    ) {

      roomCode +=
        CHARACTERS[
          Math.floor(
            Math.random() *
            CHARACTERS.length
          )
        ];
    }

    const room =
      await Room.findOne({
        roomCode,
      });

    exists = !!room;
  }

  return roomCode;
};

import wordCategories from "./words.js";

console.log("wordCategories:", wordCategories);

export const getRandomWords = (count = 3) => {
  const allWords =
    Object.values(wordCategories).flat();

  console.log("allWords:", allWords);

  const shuffled =
    allWords.sort(
      () => Math.random() - 0.5
    );

  return shuffled.slice(0, count);
};