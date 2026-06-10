import Room from "../models/Room.js";

import {
  updatePlayerSocketService,
  removePlayerService,
} from "../services/roomService.js";

const roomHandler = (io, socket) => {

  // =========================
  // Join Room
  // =========================
  socket.on(
    "join_room",
    async ({
      roomCode,
      playerName,
    }) => {

      try {

        socket.join(roomCode);

        await updatePlayerSocketService(
          roomCode,
          playerName,
          socket.id
        );

        const room =
          await Room.findOne({
            roomCode,
          });

        io.to(roomCode).emit(
          "player_joined",
          {
            players:
              room.players,
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

  // =========================
  // Leave Room
  // =========================
  socket.on(
    "leave_room",
    async ({
      roomCode,
    }) => {

      try {

        socket.leave(roomCode);

        const updatedRoom =
          await removePlayerService(
            roomCode,
            socket.id
          );

        if (updatedRoom) {

          io.to(roomCode).emit(
            "player_left",
            {
              players:
                updatedRoom.players,
            }
          );
        }

      } catch (error) {

        socket.emit(
          "error_message",
          error.message
        );

      }
    }
  );

  // =========================
  // Get Room Players
  // =========================
  socket.on(
    "get_players",
    async ({
      roomCode,
    }) => {

      try {

        const room =
          await Room.findOne({
            roomCode,
          });

        if (!room) {
          return socket.emit(
            "error_message",
            "Room not found"
          );
        }

        socket.emit(
          "room_players",
          room.players
        );

      } catch (error) {

        socket.emit(
          "error_message",
          error.message
        );

      }
    }
  );

  // =========================
  // Disconnect
  // =========================
  socket.on(
    "disconnect",
    async () => {

      try {

        const rooms =
          await Room.find();

        for (
          const room of rooms
        ) {

          const player =
            room.players.find(
              (p) =>
                p.socketId ===
                socket.id
            );

          if (player) {

            const updatedRoom =
              await removePlayerService(
                room.roomCode,
                socket.id
              );

            if (
              updatedRoom
            ) {

              io.to(
                room.roomCode
              ).emit(
                "player_left",
                {
                  players:
                    updatedRoom.players,
                }
              );
            }

            break;
          }
        }

        console.log(
          `Disconnected: ${socket.id}`
        );

      } catch (error) {

        console.log(
          error.message
        );

      }
    }
  );

};

export default roomHandler;