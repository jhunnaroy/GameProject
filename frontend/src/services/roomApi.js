import axios from "axios";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:7000/api";

const roomApi = axios.create({
  baseURL: API,
  headers: {
    "Content-Type":
      "application/json",
  },
});

// ============================
// Create Room
// ============================
export const createRoom =
  async (roomData) => {

    const response =
      await roomApi.post(
        "/rooms/create",
        roomData
      );

    return response.data;
  };

// ============================
// Join Room
// ============================
export const joinRoom =
  async (roomData) => {

    const response =
      await roomApi.post(
        "/rooms/join",
        roomData
      );

    return response.data;
  };

// ============================
// Get Room Details
// ============================
export const getRoom =
  async (roomCode) => {

    const response =
      await roomApi.get(
        `/rooms/${roomCode}`
      );

    return response.data;
  };

// ============================
// Leave Room
// ============================
export const leaveRoom =
  async (
    roomCode,
    playerName
  ) => {

    const response =
      await roomApi.post(
        "/rooms/leave",
        {
          roomCode,
          playerName,
        }
      );

    return response.data;
  };

// ============================
// Update Room Settings
// ============================
export const updateRoomSettings =
  async (
    roomCode,
    settings
  ) => {

    const response =
      await roomApi.put(
        `/rooms/${roomCode}/settings`,
        settings
      );

    return response.data;
  };

// ============================
// Delete Room
// ============================
export const deleteRoom =
  async (roomCode) => {

    const response =
      await roomApi.delete(
        `/rooms/${roomCode}`
      );

    return response.data;
  };

export default roomApi;