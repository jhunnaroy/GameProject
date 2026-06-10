import { useEffect, useState } from "react";

const WordSelection = ({
  words = [],
  onSelectWord,
  selectionTime = 15,
}) => {
  const [timeLeft, setTimeLeft] =
    useState(selectionTime);

  useEffect(() => {
    setTimeLeft(selectionTime);
  }, [selectionTime]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSelect = (word) => {
    onSelectWord?.(word);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">

      <div className="bg-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl p-5 md:p-8">

        {/* Header */}
        <div className="text-center mb-6">

          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Choose a Word
          </h2>

          <p className="text-gray-400 mt-2">
            Select one word to draw
          </p>

        </div>

        {/* Timer */}
        <div className="mb-6">

          <div className="flex justify-between mb-2">

            <span className="text-gray-300">
              Time Remaining
            </span>

            <span
              className={`font-bold ${
                timeLeft <= 5
                  ? "text-red-500"
                  : "text-green-400"
              }`}
            >
              {timeLeft}s
            </span>

          </div>

          <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">

            <div
              className={`h-full transition-all duration-1000 ${
                timeLeft <= 5
                  ? "bg-red-500"
                  : "bg-green-500"
              }`}
              style={{
                width: `${
                  (timeLeft /
                    selectionTime) *
                  100
                }%`,
              }}
            />

          </div>

        </div>

        {/* Word Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

          {words.map((word, index) => (
            <button
              key={index}
              onClick={() =>
                handleSelect(word)
              }
              className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all duration-200 text-white font-semibold py-4 px-4 rounded-xl shadow-lg"
            >
              {word}
            </button>
          ))}

        </div>

        {/* Footer */}
        <div className="mt-6 text-center">

          <p className="text-sm text-gray-400">
            If time runs out, a random word
            will be selected automatically.
          </p>

        </div>

      </div>

    </div>
  );
};

export default WordSelection;