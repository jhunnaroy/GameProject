import roomHandler from "./roomHandler.js";
import gameHandler from "./gameHandler.js";
import drawingHandler from "./drawingHandler.js";
import chatHandler from "./chatHandler.js";

const socketManager = (io) => {

  io.on(
    "connection",
    (socket) => {

      console.log(
        `Connected: ${socket.id}`
      );

      roomHandler(
        io,
        socket
      );

      gameHandler(
        io,
        socket
      );

      drawingHandler(
        io,
        socket
      );

      chatHandler(
        io,
        socket
      );

    }
  );

};

export default socketManager;