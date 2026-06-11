import {
  createRoomService,
  joinRoomService,
  getRoomService,
  deleteRoomService,
} from "../services/roomService.js";


// Create Room
// Create Room
export const createRoom = async (req, res) => {
  try {
    const { hostName, settings } = req.body;

    if (!hostName) {
      return res.status(400).json({
        success: false,
        message: "Host name is required",
      });
    }

    console.log("HOST NAME:", hostName);

    const room = await createRoomService({
      hostName,
      settings,
    });

    console.log("ROOM CREATED:", room.roomCode);
    console.log("ROOM DATA:", room);

    res.status(201).json({
      success: true,
      room,
    });

  } catch (error) {

    console.log("CREATE ROOM ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Join Room
export const joinRoom = async (req, res) => {
  try {
    const { roomCode, playerName } = req.body;

    if (!roomCode || !playerName) {
      return res.status(400).json({
        success: false,
        message: "Room code and player name are required",
      });
    }

    const room = await joinRoomService({
      roomCode,
      playerName,
    });

    res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// Get Single Room
export const getRoom = async (req, res) => {
  try {
    const { roomCode } = req.params;

    const room = await getRoomService(roomCode);

    res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};


// Delete Room
export const deleteRoom = async (req, res) => {
  try {
    const { roomCode } = req.params;

    await deleteRoomService(roomCode);

    res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};


// Get All Rooms
export const getAllRooms =
  async (req, res) => {

    try {

      const rooms =
        await getAllRoomsService();

      res.status(200).json({
        success: true,
        count: rooms.length,
        rooms,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  };