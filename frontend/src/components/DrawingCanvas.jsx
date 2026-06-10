import { useEffect, useRef, useState } from "react";

const DrawingCanvas = ({
  socket,
  roomCode,
  canDraw = true,
}) => {
  const canvasRef = useRef(null);

  const [drawing, setDrawing] =
    useState(false);

  const [color, setColor] =
    useState("#000000");

  const [brushSize, setBrushSize] =
    useState(4);

  useEffect(() => {
    const canvas =
      canvasRef.current;

    const ctx =
      canvas.getContext("2d");

    canvas.width =
      canvas.offsetWidth;

    canvas.height =
      canvas.offsetHeight;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const getPosition = (e) => {
    const canvas =
      canvasRef.current;

    const rect =
      canvas.getBoundingClientRect();

    if (
      e.touches &&
      e.touches.length > 0
    ) {
      return {
        x:
          e.touches[0]
            .clientX - rect.left,
        y:
          e.touches[0]
            .clientY - rect.top,
      };
    }

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e) => {
    if (!canDraw) return;

    const ctx =
      canvasRef.current.getContext(
        "2d"
      );

    const pos =
      getPosition(e);

    ctx.beginPath();

    ctx.moveTo(
      pos.x,
      pos.y
    );

    setDrawing(true);
  };

  const draw = (e) => {
    if (
      !drawing ||
      !canDraw
    )
      return;

    const canvas =
      canvasRef.current;

    const ctx =
      canvas.getContext("2d");

    const pos =
      getPosition(e);

    ctx.strokeStyle =
      color;

    ctx.lineWidth =
      brushSize;

    ctx.lineTo(
      pos.x,
      pos.y
    );

    ctx.stroke();

    socket?.emit(
      "draw",
      {
        roomCode,
        x: pos.x,
        y: pos.y,
        color,
        brushSize,
      }
    );
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const clearCanvas = () => {
    const canvas =
      canvasRef.current;

    const ctx =
      canvas.getContext("2d");

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    socket?.emit(
      "clear_canvas",
      roomCode
    );
  };

  return (
    <div className="bg-slate-800 rounded-xl p-4">

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 mb-4 items-center">

        <input
          type="color"
          value={color}
          onChange={(e) =>
            setColor(
              e.target.value
            )
          }
          className="w-12 h-12 border-none"
        />

        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={(e) =>
            setBrushSize(
              Number(
                e.target.value
              )
            )
          }
        />

        <span className="text-white">
          {brushSize}px
        </span>

        <button
          onClick={clearCanvas}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
        >
          Clear
        </button>

      </div>

      {/* Canvas */}
      <div className="w-full h-[500px] bg-white rounded-xl overflow-hidden">

        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          onMouseDown={
            startDrawing
          }
          onMouseMove={draw}
          onMouseUp={
            stopDrawing
          }
          onMouseLeave={
            stopDrawing
          }
          onTouchStart={
            startDrawing
          }
          onTouchMove={draw}
          onTouchEnd={
            stopDrawing
          }
        />

      </div>

    </div>
  );
};

export default DrawingCanvas;