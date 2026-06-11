import Room from "../models/Room.js";
import { generateRoomCode } from "../utils/generateRoomCode.js";


// ================================
// Create Room Service
// ================================
export const createRoomService = async ({
  hostName,
  settings,
}) => {

  const roomCode =
    await generateRoomCode();

  const room = await Room.create({
    roomCode,

    hostId: hostName,

    players: [
      {
        socketId: "",
        name: hostName,
        score: 0,
        isHost: true,
        isDrawer: true,
      },
    ],

    settings: {
      maxPlayers:
        settings?.maxPlayers || 8,

      rounds:
        settings?.rounds || 3,

      drawTime:
        settings?.drawTime || 60,
    },
  });

  return room;
};


// ================================
// Join Room Service
// ================================
export const joinRoomService = async ({
  roomCode,
  playerName,
}) => {

  console.log("Room Code:", roomCode);
  console.log("Player Name:", playerName);

  const room = await Room.findOne({
    roomCode,
  });

  console.log("Room Found:", room ? "YES" : "NO");

  if (!room) {
    throw new Error("Room not found");
  }

  room.players.push({
    name: playerName,
    score: 0,
    isDrawer: false,
  });

  console.log(
    "Players After Push:",
    room.players.length
  );

  await room.save();

  console.log("Room Saved");

  return room;
};

//==========================
// Get Single Room
// ================================
export const getRoomService = async (
  roomCode
) => {

  const room = await Room.findOne({
    roomCode,
  });

  if (!room) {
    throw new Error("Room not found");
  }

  return room;
};


// ================================
// Get All Rooms
// ================================
export const getAllRoomsService =
  async () => {

    const rooms =
      await Room.find()
        .select("-currentWord")
        .sort({
          createdAt: -1,
        });

    return rooms;
  };


// ================================
// Delete Room
// ================================
export const deleteRoomService =
  async (roomCode) => {

    const room =
      await Room.findOne({
        roomCode,
      });

    if (!room) {
      throw new Error(
        "Room not found"
      );
    }

    await Room.deleteOne({
      roomCode,
    });

    return true;
  };


// ================================
// Remove Player
// ================================
export const removePlayerService =
  async (
    roomCode,
    socketId
  ) => {

    const room =
      await Room.findOne({
        roomCode,
      });

    if (!room) {
      return null;
    }

    room.players =
      room.players.filter(
        (player) =>
          player.socketId !==
          socketId
      );

    if (
      room.players.length === 0
    ) {
      await Room.deleteOne({
        roomCode,
      });

      return null;
    }

    await room.save();

    return room;
  };


// ================================
// Update Player Socket
// ================================
export const updatePlayerSocketService =
  async (
    roomCode,
    playerName,
    socketId
  ) => {

    const room =
      await Room.findOne({
        roomCode,
      });

    if (!room) {
      throw new Error(
        "Room not found"
      );
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

    player.socketId =
      socketId;

    await room.save();

    return room;
  };


// ================================
// Get Room Players
// ================================
export const getPlayersService =
  async (roomCode) => {

    const room =
      await Room.findOne({
        roomCode,
      });

    if (!room) {
      throw new Error(
        "Room not found"
      );
    }

    return room.players;
  };