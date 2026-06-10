const drawingHandler = (io, socket) => {

  // ==========================
  // Draw Start
  // ==========================
  socket.on(
    "draw_start",
    ({ roomCode, data }) => {

      socket
        .to(roomCode)
        .emit(
          "draw_start",
          data
        );
    }
  );

  // ==========================
  // Draw Move
  // ==========================
  socket.on(
    "draw_move",
    ({ roomCode, data }) => {

      socket
        .to(roomCode)
        .emit(
          "draw_move",
          data
        );
    }
  );

  // ==========================
  // Draw End
  // ==========================
  socket.on(
    "draw_end",
    ({ roomCode }) => {

      socket
        .to(roomCode)
        .emit(
          "draw_end"
        );
    }
  );

  // ==========================
  // Clear Canvas
  // ==========================
  socket.on(
    "clear_canvas",
    ({ roomCode }) => {

      io.to(roomCode).emit(
        "clear_canvas"
      );
    }
  );

  // ==========================
  // Undo Last Stroke
  // ==========================
  socket.on(
    "undo_stroke",
    ({ roomCode }) => {

      io.to(roomCode).emit(
        "undo_stroke"
      );
    }
  );

  // ==========================
  // Change Brush Color
  // ==========================
  socket.on(
    "change_color",
    ({
      roomCode,
      color,
    }) => {

      socket
        .to(roomCode)
        .emit(
          "change_color",
          color
        );
    }
  );

  // ==========================
  // Change Brush Size
  // ==========================
  socket.on(
    "change_brush_size",
    ({
      roomCode,
      size,
    }) => {

      socket
        .to(roomCode)
        .emit(
          "change_brush_size",
          size
        );
    }
  );

};

export default drawingHandler;