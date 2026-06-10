import useTimer from "../hooks/useTimer";

const GameRoom = () => {

  const {
    timeLeft,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useTimer(
    60,
    () => {
      console.log(
        "Round Ended"
      );
    }
  );

  return (
    <div>

      <h1>
        Time Left:
        {timeLeft}s
      </h1>

      <button
        onClick={startTimer}
      >
        Start
      </button>

      <button
        onClick={pauseTimer}
      >
        Pause
      </button>

      <button
        onClick={resetTimer}
      >
        Reset
      </button>

    </div>
  );
};

export default GameRoom;