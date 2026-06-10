import {
  useRef,
  useState,
  useEffect,
} from "react";

const useCanvas = () => {
  const canvasRef = useRef(null);

  const contextRef = useRef(null);

  const [isDrawing, setIsDrawing] =
    useState(false);

  const [color, setColor] =
    useState("#000000");

  const [brushSize, setBrushSize] =
    useState(5);

  const [tool, setTool] =
    useState("brush");

  // Initialize Canvas
  useEffect(() => {
    const canvas =
      canvasRef.current;

    if (!canvas) return;

    const context =
      canvas.getContext("2d");

    canvas.width =
      canvas.offsetWidth;

    canvas.height =
      canvas.offsetHeight;

    context.lineCap = "round";
    context.strokeStyle =
      color;
    context.lineWidth =
      brushSize;

    contextRef.current =
      context;
  }, []);

  // Update Brush
  useEffect(() => {
    if (!contextRef.current)
      return;

    contextRef.current.strokeStyle =
      tool === "eraser"
        ? "#ffffff"
        : color;

    contextRef.current.lineWidth =
      brushSize;
  }, [
    color,
    brushSize,
    tool,
  ]);

  // Mouse Position
  const getPosition = (
    event
  ) => {
    const canvas =
      canvasRef.current;

    const rect =
      canvas.getBoundingClientRect();

    return {
      x:
        event.clientX -
        rect.left,
      y:
        event.clientY -
        rect.top,
    };
  };

  // Touch Position
  const getTouchPosition =
    (event) => {
      const canvas =
        canvasRef.current;

      const rect =
        canvas.getBoundingClientRect();

      return {
        x:
          event.touches[0]
            .clientX -
          rect.left,
        y:
          event.touches[0]
            .clientY -
          rect.top,
      };
    };

  // Start Drawing
  const startDrawing = (
    event
  ) => {
    const {
      x,
      y,
    } = getPosition(event);

    contextRef.current.beginPath();

    contextRef.current.moveTo(
      x,
      y
    );

    setIsDrawing(true);
  };

  // Draw
  const draw = (event) => {
    if (!isDrawing) return;

    const {
      x,
      y,
    } = getPosition(event);

    contextRef.current.lineTo(
      x,
      y
    );

    contextRef.current.stroke();
  };

  // Stop Drawing
  const stopDrawing = () => {
    contextRef.current.closePath();

    setIsDrawing(false);
  };

  // Mobile Start
  const startTouchDrawing =
    (event) => {
      event.preventDefault();

      const {
        x,
        y,
      } = getTouchPosition(
        event
      );

      contextRef.current.beginPath();

      contextRef.current.moveTo(
        x,
        y
      );

      setIsDrawing(true);
    };

  // Mobile Draw
  const touchDraw = (
    event
  ) => {
    event.preventDefault();

    if (!isDrawing) return;

    const {
      x,
      y,
    } = getTouchPosition(
      event
    );

    contextRef.current.lineTo(
      x,
      y
    );

    contextRef.current.stroke();
  };

  // Clear Canvas
  const clearCanvas = () => {
    const canvas =
      canvasRef.current;

    contextRef.current.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );
  };

  return {
    canvasRef,

    color,
    setColor,

    brushSize,
    setBrushSize,

    tool,
    setTool,

    clearCanvas,

    startDrawing,
    draw,
    stopDrawing,

    startTouchDrawing,
    touchDraw,
  };
};

export default useCanvas;