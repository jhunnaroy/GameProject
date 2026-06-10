import { useEffect, useState } from "react";

const Timer = ({
  initialTime = 60,
  onTimeUp,
}) => {
  const [timeLeft, setTimeLeft] =
    useState(initialTime);

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () =>
      clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const percentage =
    (timeLeft / initialTime) * 100;

  return (
    <div className="bg-slate-800 rounded-xl p-4">

      <div className="flex justify-between items-center mb-3">

        <h2 className="text-white font-bold text-lg">
          Timer
        </h2>

        <span
          className={`font-bold text-xl ${
            timeLeft <= 10
              ? "text-red-500"
              : "text-green-400"
          }`}
        >
          ⏱ {timeLeft}s
        </span>

      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">

        <div
          className={`h-full transition-all duration-1000 ${
            timeLeft <= 10
              ? "bg-red-500"
              : timeLeft <= 20
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
};

export default Timer;